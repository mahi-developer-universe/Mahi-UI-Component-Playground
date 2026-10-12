#!/usr/bin/env node

/**
 * Mahi UI CLI Generator
 * Usage:
 *   npx mahi-ui list
 *   npx mahi-ui add <component> [--out <dir>]
 */

const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '..', 'src', 'components', 'ui');

const args = process.argv.slice(2);
const command = args[0] || 'help';

function getAvailableComponents() {
  if (!fs.existsSync(COMPONENTS_DIR)) return [];
  return fs.readdirSync(COMPONENTS_DIR)
    .filter(f => f.endsWith('.tsx') && f !== 'index.ts' && f !== 'ProjectCard.tsx' && f !== 'ResourceCard.tsx')
    .map(f => f.replace('.tsx', ''));
}

switch (command) {
  case 'list': {
    const list = getAvailableComponents();
    console.log('\n📦 Available Mahi UI Components (' + list.length + '):\n');
    list.forEach(c => console.log('  • ' + c));
    console.log('\nUsage: node bin/mahi-ui.js add <component-name>\n');
    break;
  }

  case 'add': {
    const componentName = args[1];
    if (!componentName) {
      console.error('\n❌ Error: Please specify a component name.\nExample: node bin/mahi-ui.js add Button\n');
      process.exit(1);
    }

    const available = getAvailableComponents();
    const matched = available.find(c => c.toLowerCase() === componentName.toLowerCase());

    if (!matched) {
      console.error(`\n❌ Error: Component "${componentName}" not found.`);
      console.log('Run "node bin/mahi-ui.js list" to see available components.\n');
      process.exit(1);
    }

    const srcFile = path.join(COMPONENTS_DIR, `${matched}.tsx`);
    const outDirIndex = args.indexOf('--out');
    const targetDir = outDirIndex !== -1 && args[outDirIndex + 1] ? path.resolve(args[outDirIndex + 1]) : process.cwd();
    const destFile = path.join(targetDir, `${matched}.tsx`);

    try {
      const content = fs.readFileSync(srcFile, 'utf8');
      fs.writeFileSync(destFile, content, 'utf8');
      console.log(`\n✨ Successfully added ${matched} to: ${destFile}\n`);
    } catch (err) {
      console.error('\n❌ Failed to write component file:', err.message);
      process.exit(1);
    }
    break;
  }

  case 'help':
  default: {
    console.log(`
Mahi UI CLI - Component Installer

Commands:
  list              List all available UI components
  add <component>   Install a component into your local project
  help              Show this help menu

Options:
  --out <dir>       Target directory to save the component (default: current directory)

Examples:
  node bin/mahi-ui.js list
  node bin/mahi-ui.js add Button
  node bin/mahi-ui.js add Modal --out src/components/ui
`);
    break;
  }
}
