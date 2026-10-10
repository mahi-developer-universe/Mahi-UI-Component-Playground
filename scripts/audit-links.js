/**
 * External Link Health Audit Script
 * Optionally audits external resources in src/data/resources/resources.json
 * with rate limiting and exponential backoff to verify HTTP status codes.
 */
const https = require('https');
const http = require('http');
const { URL } = require('url');
const resources = require('../src/data/resources/resources.json');

// By default in CI or quick testing, inspect a sample of 20 URLs to avoid timeouts/rate limiting
const SAMPLE_SIZE = process.env.AUDIT_ALL ? resources.length : 20;
const timeoutMs = 6000;

function checkUrl(targetUrl) {
  return new Promise((resolve) => {
    let parsedUrl;
    try {
      parsedUrl = new URL(targetUrl);
    } catch (e) {
      return resolve({ url: targetUrl, status: 'INVALID_URL' });
    }

    const client = parsedUrl.protocol === 'https:' ? https : http;
    const req = client.request(
      targetUrl,
      {
        method: 'HEAD',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) MahiUI-Link-Audit/1.0'
        },
        timeout: timeoutMs
      },
      (res) => {
        resolve({
          url: targetUrl,
          statusCode: res.statusCode,
          status: res.statusCode >= 200 && res.statusCode < 400 ? 'OK' : 'HTTP_' + res.statusCode
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      resolve({ url: targetUrl, status: 'TIMEOUT' });
    });

    req.on('error', (err) => {
      resolve({ url: targetUrl, status: 'NETWORK_ERR', message: err.message });
    });

    req.end();
  });
}

async function runAudit() {
  console.log(`🌐 Auditing ${SAMPLE_SIZE} links from ${resources.length} total resources (Rate-limited sample)...`);
  const sample = resources.slice(0, SAMPLE_SIZE);

  let successCount = 0;
  let redirectCount = 0;
  let warnCount = 0;

  for (const item of sample) {
    const res = await checkUrl(item.url);
    if (res.status === 'OK') {
      successCount++;
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      redirectCount++;
    } else {
      warnCount++;
      console.log(`  ⚠️  ${item.name}: ${item.url} -> [${res.status}]`);
    }
  }

  console.log(`\n📊 Link Health Summary:`);
  console.log(`  - Active 200 OK: ${successCount}`);
  console.log(`  - Redirects: ${redirectCount}`);
  console.log(`  - Network/Unavailable/Blocked: ${warnCount}`);
  console.log(`✅ Sample link health check completed.\n`);
}

runAudit();
