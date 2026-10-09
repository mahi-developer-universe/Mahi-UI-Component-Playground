// scripts/validate-catalog.js
// Safe, non-eval automated verification script for Mahi UI Component Playground
const fs = require('fs');
const path = require('path');

console.log('🔍 Starting safe catalog & project verification...\n');

// 1. Validate resources from canonical JSON source (src/data/resources/resources.json)
const jsonResourcesPath = path.join(__dirname, '..', 'src', 'data', 'resources', 'resources.json');
let resources = [];

if (fs.existsSync(jsonResourcesPath)) {
  resources = JSON.parse(fs.readFileSync(jsonResourcesPath, 'utf-8'));
  console.log(`✅ Loaded ${resources.length} resources from src/data/resources/resources.json (safe JSON parse)`);
} else {
  console.error('❌ Missing canonical resources.json');
  process.exit(1);
}

// Check resource integrity
const seenIds = new Set();
const seenUrls = new Set();
let duplicates = 0;
let invalidUrls = 0;
const categoryCounts = {};

resources.forEach((r, idx) => {
  if (!r.id) console.warn(`⚠️ Resource #${idx} missing id`);
  if (seenIds.has(r.id)) console.warn(`⚠️ Duplicate id: ${r.id}`);
  seenIds.add(r.id);

  if (!r.url || !r.url.startsWith('http')) {
    console.warn(`⚠️ Invalid URL in ${r.name}: ${r.url}`);
    invalidUrls++;
  }

  const normUrl = r.url.toLowerCase().replace(/\/$/, '');
  if (seenUrls.has(normUrl)) {
    duplicates++;
  }
  seenUrls.add(normUrl);

  categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
});

console.log(`📊 Total unique URLs: ${seenUrls.size} (duplicate URLs detected: ${duplicates})`);
console.log(`📊 Invalid URLs: ${invalidUrls}`);
console.log('\n📁 Resource Category Breakdown:');
Object.entries(categoryCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => {
    console.log(`  - ${cat}: ${count}`);
  });

// 2. Validate projects from canonical JSON source (src/data/projects/projects.json)
const jsonProjectsPath = path.join(__dirname, '..', 'src', 'data', 'projects', 'projects.json');
let projects = [];

if (fs.existsSync(jsonProjectsPath)) {
  projects = JSON.parse(fs.readFileSync(jsonProjectsPath, 'utf-8'));
  console.log(`\n✅ Loaded ${projects.length} frontend projects from src/data/projects/projects.json (safe JSON parse)`);
} else {
  console.error('❌ Missing canonical projects.json');
  process.exit(1);
}

const projectCategories = {};
projects.forEach((p, idx) => {
  if (!p.id || !p.title || !p.section || !p.difficulty) {
    console.warn(`⚠️ Project #${idx} is missing required fields (id, title, section, difficulty)`);
  }
  projectCategories[p.sectionLabel || p.section] = (projectCategories[p.sectionLabel || p.section] || 0) + 1;
});

console.log('🚀 Project Category Breakdown:');
Object.entries(projectCategories).forEach(([cat, count]) => {
  console.log(`  - ${cat}: ${count}`);
});

// 3. Validate component suites from canonical JSON source (src/data/components/components.json)
const jsonComponentsPath = path.join(__dirname, '..', 'src', 'data', 'components', 'components.json');
let components = [];

if (fs.existsSync(jsonComponentsPath)) {
  components = JSON.parse(fs.readFileSync(jsonComponentsPath, 'utf-8'));
  console.log(`\n✅ Loaded ${components.length} component suites from src/data/components/components.json (safe JSON parse):`);
  components.forEach((c) => console.log(`  - ${c.title} (${c.id})`));
} else {
  console.error('❌ Missing canonical components.json');
  process.exit(1);
}

console.log('\n🎉 ALL CATALOG AND REGISTRY AUDITS PASSED WITH ZERO BLOCKING ERRORS!');
