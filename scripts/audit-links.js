/**
 * Comprehensive External Link Health & Availability Auditor
 * Supports batching, concurrency limits, redirect following, status reports,
 * and JSON artifact generation for CI/CD scheduled workflows.
 */
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const resourcesPath = path.join(__dirname, '..', 'src', 'data', 'resources', 'resources.json');
const resources = JSON.parse(fs.readFileSync(resourcesPath, 'utf8'));

// Command line parameters
const args = process.argv.slice(2);
const auditAll = args.includes('--all') || process.env.AUDIT_ALL === 'true';
const maxConcurrency = 5;
const timeoutMs = 8000;
const sampleLimit = auditAll ? resources.length : 25;

function checkUrlWithRedirect(targetUrl, maxRedirects = 3) {
  return new Promise((resolve) => {
    let currentUrl = targetUrl;
    let redirectsCount = 0;

    function attempt(urlToTry) {
      let parsedUrl;
      try {
        parsedUrl = new URL(urlToTry);
      } catch (e) {
        return resolve({ url: targetUrl, finalUrl: urlToTry, status: 'INVALID_URL', statusCode: 0 });
      }

      const client = parsedUrl.protocol === 'https:' ? https : http;
      const req = client.request(
        urlToTry,
        {
          method: 'GET', // Many CDN/WAF services block HEAD requests
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 MahiUI-Auditor/2.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
          },
          timeout: timeoutMs
        },
        (res) => {
          const code = res.statusCode || 0;

          // Follow 301, 302, 307, 308 redirects
          if (code >= 300 && code < 400 && res.headers.location && redirectsCount < maxRedirects) {
            redirectsCount++;
            let nextLoc = res.headers.location;
            if (!nextLoc.startsWith('http')) {
              nextLoc = new URL(nextLoc, urlToTry).toString();
            }
            res.resume();
            return attempt(nextLoc);
          }

          // Read small chunk and abort to preserve bandwidth
          res.resume();

          const isSuccess = (code >= 200 && code < 400) || code === 403; // Note: 403 often means Cloudflare bot protection, not a dead site
          resolve({
            url: targetUrl,
            finalUrl: urlToTry,
            statusCode: code,
            redirects: redirectsCount,
            status: isSuccess ? 'ACTIVE' : `HTTP_${code}`
          });
        }
      );

      req.on('timeout', () => {
        req.destroy();
        resolve({ url: targetUrl, finalUrl: urlToTry, status: 'TIMEOUT', statusCode: 0 });
      });

      req.on('error', (err) => {
        resolve({ url: targetUrl, finalUrl: urlToTry, status: 'NETWORK_ERR', message: err.message, statusCode: 0 });
      });

      req.end();
    }

    attempt(currentUrl);
  });
}

// Pool worker for concurrency
async function pool(items, concurrency, fn) {
  const results = [];
  const executing = [];

  for (const item of items) {
    const p = Promise.resolve().then(() => fn(item));
    results.push(p);

    if (concurrency <= items.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= concurrency) {
        await Promise.race(executing);
      }
    }
  }

  return Promise.all(results);
}

async function runAudit() {
  console.log(`\n🌐 ==========================================`);
  console.log(`🌐 Mahi UI External Link Health & Quality Audit`);
  console.log(`🌐 Total Resources in Catalog: ${resources.length}`);
  console.log(`🌐 Inspecting: ${sampleLimit} links (Concurrency: ${maxConcurrency})`);
  console.log(`🌐 ==========================================\n`);

  const targets = resources.slice(0, sampleLimit);
  const startTime = Date.now();

  const auditResults = await pool(targets, maxConcurrency, async (resItem) => {
    const check = await checkUrlWithRedirect(resItem.url);
    const flag = check.status === 'ACTIVE' ? '✅' : '⚠️ ';
    process.stdout.write(`${flag} [${check.status}] ${resItem.name} (${resItem.url})\n`);
    return {
      id: resItem.id,
      name: resItem.name,
      originalUrl: resItem.url,
      finalUrl: check.finalUrl,
      status: check.status,
      statusCode: check.statusCode,
      redirects: check.redirects || 0
    };
  });

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  const activeCount = auditResults.filter((r) => r.status === 'ACTIVE').length;
  const warned = auditResults.filter((r) => r.status !== 'ACTIVE');

  console.log(`\n📊 Audit Summary (Finished in ${durationSec}s):`);
  console.log(`  - Verified Active: ${activeCount} / ${sampleLimit}`);
  console.log(`  - Blocked / Timeout / Check Needed: ${warned.length}`);

  // Write report artifact
  const reportPath = path.join(__dirname, '..', 'link-audit-report.json');
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        auditedAt: new Date().toISOString(),
        totalResources: resources.length,
        auditedCount: sampleLimit,
        activeCount,
        warningCount: warned.length,
        results: auditResults
      },
      null,
      2
    )
  );

  console.log(`\n📄 Report written to: ${reportPath}`);
  console.log(`🎉 External link health audit finished successfully.\n`);
}

runAudit().catch((err) => {
  console.error('Fatal audit failure:', err);
  process.exit(1);
});
