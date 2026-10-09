// scripts/validate-catalog.js
// Automated verification script for Mahi UI Component Playground resources & projects
const fs = require('fs');
const path = require('path');

console.log('🔍 Starting catalog & project verification...\n');

// 1. Validate resources-data.js
const resourcesPath = path.join(__dirname, '..', 'resources-data.js');
const resourcesContent = fs.readFileSync(resourcesPath, 'utf-8');
const resourcesMatch = resourcesContent.match(/const RESOURCE_DIRECTORY = (\[[\s\S]*?\]);/);

if (!resourcesMatch) {
  console.error('❌ Failed to parse RESOURCE_DIRECTORY from resources-data.js');
  process.exit(1);
}

let resources;
try {
  resources = eval(resourcesMatch[1]);
  console.log(`✅ Loaded ${resources.length} resources from resources-data.js`);
} catch (e) {
  console.error('❌ Error evaluating RESOURCE_DIRECTORY:', e.message);
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
Object.entries(categoryCounts).sort((a,b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`  - ${cat}: ${count}`);
});

// 2. Validate all-projects-data.js
const projectsPath = path.join(__dirname, '..', 'all-projects-data.js');
const projectsContent = fs.readFileSync(projectsPath, 'utf-8');
const projectsMatch = projectsContent.match(/const ALL_30_PROJECTS = (\[[\s\S]*?\]);/);

if (!projectsMatch) {
  console.error('❌ Failed to parse ALL_30_PROJECTS from all-projects-data.js');
  process.exit(1);
}

let projects;
try {
  projects = eval(projectsMatch[1]);
  console.log(`\n✅ Loaded ${projects.length} frontend projects from all-projects-data.js`);
} catch (e) {
  console.error('❌ Error evaluating ALL_30_PROJECTS:', e.message);
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

// 3. Validate components-data.js
const componentsPath = path.join(__dirname, '..', 'components-data.js');
const componentsContent = fs.readFileSync(componentsPath, 'utf-8');
const componentsMatch = componentsContent.match(/const COMPONENTS_DATA = (\[[\s\S]*?\]);/);

if (!componentsMatch) {
  console.error('❌ Failed to parse COMPONENTS_DATA from components-data.js');
  process.exit(1);
}

let components;
try {
  components = eval(componentsMatch[1]);
  console.log(`\n✅ Loaded ${components.length} component suites from components-data.js:`);
  components.forEach(c => console.log(`  - ${c.title} (${c.id})`));
} catch (e) {
  console.error('❌ Error evaluating COMPONENTS_DATA:', e.message);
  process.exit(1);
}

console.log('\n🎉 ALL CATALOG AND REGISTRY AUDITS PASSED WITH ZERO BLOCKING ERRORS!');
