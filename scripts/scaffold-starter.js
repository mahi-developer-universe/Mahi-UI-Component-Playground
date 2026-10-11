#!/usr/bin/env node

/**
 * Mahi UI Starter Project Scaffolding CLI Generator
 * 
 * Generates an independent starter project manifest with selected components,
 * design tokens, and package dependencies for Vite or Next.js.
 */

const fs = require('fs');
const path = require('path');

function generateStarterManifest(options = {}) {
  const framework = options.framework || 'nextjs';
  const theme = options.theme || 'dark';
  const components = options.components || ['Button', 'Card', 'Badge', 'Input'];

  const starterConfig = {
    name: 'mahi-ui-starter-app',
    version: '1.0.0',
    framework,
    theme,
    selectedComponents: components,
    scripts: framework === 'nextjs' 
      ? { dev: 'next dev', build: 'next build', start: 'next start' }
      : { dev: 'vite', build: 'vite build', preview: 'vite preview' },
    dependencies: {
      react: '^19.3.0',
      'react-dom': '^19.3.0',
      ...(framework === 'nextjs' ? { next: '^16.4.0' } : { vite: '^5.0.0' })
    },
    styles: {
      baseTokens: `src/styles/tokens.css`,
      themeActive: theme
    }
  };

  return starterConfig;
}

if (require.main === module) {
  const manifest = generateStarterManifest();
  console.log('🚀 Mahi UI Starter Project Manifest Generated:\n');
  console.log(JSON.stringify(manifest, null, 2));
}

module.exports = { generateStarterManifest };
