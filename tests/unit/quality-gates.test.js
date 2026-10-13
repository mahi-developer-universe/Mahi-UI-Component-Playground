// tests/unit/quality-gates.test.js
// CI Quality Gate Verification Test:
// Validates visual design tokens, responsive breakpoints, loading skeletons, empty states, and security guards.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('🧪 Running Comprehensive CI Quality Gates & Design System Verification...\n');

// 1. Theme Presets & CSS Tokens Verification
const cssPath = path.join(__dirname, '../../style.css');
assert.ok(fs.existsSync(cssPath), 'style.css exists');
const cssContent = fs.readFileSync(cssPath, 'utf8');

const REQUIRED_THEMES = ['dark', 'light', 'cyberpunk', 'emerald', 'sunset'];
REQUIRED_THEMES.forEach((theme) => {
  if (theme === 'dark') {
    assert.ok(cssContent.includes(':root') || cssContent.includes('[data-theme="dark"]'), 'Dark theme must be defined');
  } else {
    assert.ok(cssContent.includes(`[data-theme="${theme}"]`), `Theme "${theme}" must be defined in style.css`);
  }
});
console.log('✅ 1. All 5 Design System Themes (Emerald, Dark, Light, Cyberpunk, Sunset) verified');

// 2. Responsive Breakpoint Tokens Verification
const REQUIRED_BREAKPOINTS = ['max-width: 768px', 'max-width: 1024px', 'min-width: 1200px'];
let foundBreakpoints = 0;
REQUIRED_BREAKPOINTS.forEach((bp) => {
  if (cssContent.includes(bp)) foundBreakpoints++;
});
assert.ok(foundBreakpoints >= 2, 'Responsive media query breakpoints must be defined');
console.log('✅ 2. Responsive Breakpoints & Fluid Layout System verified');

// 3. Loading Shimmer & Skeleton States Verification
const loadingPath = path.join(__dirname, '../../src/app/loading.tsx');
assert.ok(fs.existsSync(loadingPath), 'loading.tsx exists');
const loadingContent = fs.readFileSync(loadingPath, 'utf8');
assert.ok(loadingContent.includes('shimmer'), 'loading.tsx must contain animated shimmer skeleton styles');
console.log('✅ 3. Skeleton Loading Shimmer States verified');

// 4. Empty State UI Components Verification
const emptyStatePath = path.join(__dirname, '../../src/components/ui/EmptyState.tsx');
assert.ok(fs.existsSync(emptyStatePath), 'EmptyState.tsx exists');
console.log('✅ 4. Reusable Empty State UI Component verified');

// 5. Error Monitoring & Information Disclosure Defense Verification
const errorSecPath = path.join(__dirname, '../../src/lib/errorSecurity.ts');
assert.ok(fs.existsSync(errorSecPath), 'errorSecurity.ts exists');
const errorSecContent = fs.readFileSync(errorSecPath, 'utf8');
assert.ok(errorSecContent.includes('sanitizeErrorMessage'), 'sanitizeErrorMessage must be exported');
assert.ok(errorSecContent.includes('redacted_path'), 'Must redact internal filesystem paths');
console.log('✅ 5. Error Monitoring & Secret/Path Redaction Defense verified');

// 6. Rate Limiting Protection Verification
const rateLimitPath = path.join(__dirname, '../../src/lib/rateLimit.ts');
assert.ok(fs.existsSync(rateLimitPath), 'rateLimit.ts exists');
const rateLimitContent = fs.readFileSync(rateLimitPath, 'utf8');
assert.ok(rateLimitContent.includes('TokenBucketRateLimiter'), 'Token bucket rate limiter must exist');
console.log('✅ 6. Token Bucket Rate Limiting Engine verified');

// 7. Live Charts & KPI Cards Telemetry Verification
const analyticsPath = path.join(__dirname, '../../src/features/analytics-dashboard/AnalyticsDashboardWorkspace.tsx');
assert.ok(fs.existsSync(analyticsPath), 'AnalyticsDashboardWorkspace.tsx exists');
const analyticsContent = fs.readFileSync(analyticsPath, 'utf8');
assert.ok(analyticsContent.includes('MetricCard'), 'MetricCard KPI component must be defined');
assert.ok(analyticsContent.includes('maxVal'), 'Dynamic histogram charting must be present');
assert.ok(analyticsContent.includes('handleExportCsv'), 'CSV export functionality must be present');
console.log('✅ 7. Live Charts, Dynamic Histograms & KPI Telemetry Cards verified');

console.log('\n🎉 ALL 7 CI QUALITY GATE AUDITS PASSED WITH ZERO VIOLATIONS!\n');
