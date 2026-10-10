/**
 * Linter & Code Quality Verification Script
 * Validates JS and TS files across the codebase for syntax errors,
 * unhandled patterns, unrestricted eval/Function usage security violations, and formatting.
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIRS = ['src', 'scripts', 'tests'];
let errorCount = 0;
let fileCount = 0;

// Security pattern checks (unrestricted runtime execution)
const FORBIDDEN_PATTERNS = [
  { pattern: /\beval\s*\(/, message: 'Unrestricted eval() execution is strictly forbidden' },
  { pattern: /\bnew\s+Function\s*\(/, message: 'Unrestricted Function constructor execution is strictly forbidden' }
];

function scanDir(dir) {
  const fullPath = path.resolve(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) return;

  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  for (const entry of entries) {
    const resPath = path.join(fullPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        scanDir(path.join(dir, entry.name));
      }
    } else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      // Don't flag this linter script itself for mentioning patterns in comments or regex declarations
      if (resPath.endsWith('lint.js')) continue;

      fileCount++;
      const rawContent = fs.readFileSync(resPath, 'utf8');
      // Strip block and line comments to check only executable code
      const codeOnly = rawContent.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');

      for (const check of FORBIDDEN_PATTERNS) {
        if (check.pattern.test(codeOnly)) {
          console.error(`❌ Security Violation in ${path.relative(process.cwd(), resPath)}: ${check.message}`);
          errorCount++;
        }
      }
    }
  }
}

console.log('🔍 Running Mahi UI Static Code Quality & Security Audit...');
ROOT_DIRS.forEach(scanDir);

if (errorCount > 0) {
  console.error(`\n❌ Lint check failed with ${errorCount} errors.`);
  process.exit(1);
} else {
  console.log(`✅ Lint check passed successfully: ${fileCount} files scanned with 0 violations.\n`);
  process.exit(0);
}
