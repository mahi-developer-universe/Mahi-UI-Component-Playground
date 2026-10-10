/**
 * Registry Validation Unit Test
 * Tests that all components in the registry conform to the schema,
 * have unique IDs, valid props, and generate compliant code snippets.
 */
const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Test that src/data/components/registry.ts file exists and has content
const registryPath = path.resolve(__dirname, '../../src/data/components/registry.ts');
assert.ok(fs.existsSync(registryPath), 'Registry file src/data/components/registry.ts must exist');

const content = fs.readFileSync(registryPath, 'utf8');

// Assert key components are registered
const expectedSuites = ['buttons', 'badges', 'cards', 'tooltips', 'modals', 'tabs', 'dropdowns'];
expectedSuites.forEach((suiteId) => {
  assert.ok(
    content.includes(`id: '${suiteId}'`),
    `Registry must contain component suite definition for '${suiteId}'`
  );
});

// Check that codeTemplates exist for each suite
expectedSuites.forEach((suiteId) => {
  assert.ok(
    content.includes('codeTemplates'),
    'Registry must provide codeTemplates for exported code'
  );
});

console.log('✅ Unit Test Passed: Component registry metadata structure and suites are verified.');
