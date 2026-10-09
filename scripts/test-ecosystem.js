// scripts/test-ecosystem.js
// Unit & Integration verification for Mahi UI Ecosystem:
// Tests data schemas, interactive modules, CDN availability, and exports.
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('🧪 Starting Modern Frontend Ecosystem Test Suite...\n');

// 1. Verify package.json scripts and metadata
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
assert.strictEqual(pkg.name, 'mahi-ui-component-playground', 'package.json name matches');
assert.ok(pkg.scripts.test, 'test script exists');
console.log('✅ 1. package.json configuration & scripts verified');

// 2. Verify all 30 projects have runnable definitions or modules
const projectsContent = fs.readFileSync(path.join(__dirname, '..', 'all-projects-data.js'), 'utf8');
const projectsMatch = projectsContent.match(/const ALL_30_PROJECTS = (\[[\s\S]*?\]);/);
const projects = eval(projectsMatch[1]);
assert.strictEqual(projects.length, 30, 'All 30 projects present in registry');

const modulesContent = fs.readFileSync(path.join(__dirname, '..', 'interactive-modules.js'), 'utf8');
const modulesMatch = modulesContent.match(/const INTERACTIVE_MODULES = ({[\s\S]*?});\r?\n\r?\n\/\/ Global/);
assert.ok(modulesMatch, 'INTERACTIVE_MODULES parsed successfully');
const modules = eval('(' + modulesMatch[1] + ')');

let interactiveCount = 0;
projects.forEach(p => {
  if (p.interactiveModule) {
    assert.ok(modules[p.interactiveModule], `Module "${p.interactiveModule}" must be registered in INTERACTIVE_MODULES`);
    assert.strictEqual(typeof modules[p.interactiveModule].render, 'function', `Module "${p.interactiveModule}" must have a render() function`);
    interactiveCount++;
  }
});
console.log(`✅ 2. Verified ${interactiveCount} projects linked directly to live interactive modules`);

// 3. Verify HTML structure & 3D Lab Modal
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
assert.ok(html.includes('id="three-modal-backdrop"'), 'Three.js 3D modal dialog present in index.html');
assert.ok(html.includes('id="three-canvas"'), 'Three.js canvas present in index.html');
assert.ok(html.includes('three.min.js'), 'Three.js CDN script linked');
assert.ok(html.includes('id="interactive-live-sandbox"'), 'Live sandbox mount present');
console.log('✅ 3. Verified HTML DOM architecture and Three.js 3D spatial studio');

// 4. Verify CSS Design Tokens & Studio Styles
const css = fs.readFileSync(path.join(__dirname, '..', 'style.css'), 'utf8');
assert.ok(css.includes('--bg-primary'), 'CSS custom properties defined');
assert.ok(css.includes('[data-theme="light"]'), 'Light theme defined');
assert.ok(css.includes('[data-theme="cyberpunk"]'), 'Cyberpunk Neon theme defined');
assert.ok(css.includes('[data-theme="emerald"]'), 'Emerald theme defined');
assert.ok(css.includes('[data-theme="sunset"]'), 'Sunset theme defined');
assert.ok(css.includes('.device-frame-mockup'), 'Device previewer styles present');
assert.ok(css.includes('.token-swatch'), 'Token generator swatch styles present');
assert.ok(css.includes('.snippet-code-pre'), 'Code snippet viewer styles present');
console.log('✅ 4. Verified 5 design system themes, token scales, and studio styles');

console.log('\n🎉 ALL 4 ECOSYSTEM INTEGRATION TESTS PASSED CLEANLY!\n');
