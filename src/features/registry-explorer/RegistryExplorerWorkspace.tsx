'use client';

import React, { useState, useMemo } from 'react';
import { Search, Copy, Check, ExternalLink, Terminal, Package, Layers, Sparkles, Code2 } from 'lucide-react';
import { copyToClipboard } from '@/lib/clipboard';

interface RegistryItem {
  id: string;
  name: string;
  description: string;
  framework: 'react' | 'vue' | 'svelte' | 'multi';
  category: 'primitives' | 'blocks' | 'styling' | 'animation' | 'icons';
  cliCommand: string;
  npmPackage: string;
  docsUrl: string;
  githubStars: string;
  tags: string[];
}

const REGISTRIES: RegistryItem[] = [
  {
    id: 'shadcn-ui',
    name: 'shadcn/ui',
    description: 'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
    framework: 'react',
    category: 'blocks',
    cliCommand: 'npx shadcn@latest init',
    npmPackage: '@radix-ui/react-slot class-variance-authority',
    docsUrl: 'https://ui.shadcn.com',
    githubStars: '78.5k',
    tags: ['radix-ui', 'tailwind', 'copy-paste', 'typescript'],
  },
  {
    id: 'radix-primitives',
    name: 'Radix Primitives',
    description: 'An open-source UI component library for building high-quality, accessible design systems and web apps.',
    framework: 'react',
    category: 'primitives',
    cliCommand: 'npm i @radix-ui/react-dialog @radix-ui/react-dropdown-menu',
    npmPackage: '@radix-ui/react-dialog',
    docsUrl: 'https://www.radix-ui.com/primitives',
    githubStars: '15.2k',
    tags: ['headless', 'accessibility', 'wai-aria', 'unрахed'],
  },
  {
    id: 'cult-ui',
    name: 'Cult UI',
    description: 'Curated components that bring motion, craft, and distinct visual personality to modern landing pages and products.',
    framework: 'react',
    category: 'animation',
    cliCommand: 'npx cult-ui@latest add text-reveal',
    npmPackage: 'framer-motion lucide-react',
    docsUrl: 'https://cult-ui.com',
    githubStars: '4.8k',
    tags: ['framer-motion', 'micro-interactions', 'craft', 'visual'],
  },
  {
    id: 'magic-ui',
    name: 'Magic UI',
    description: '20+ free and open-source animated components built with React, Typescript, Tailwind CSS, and Framer Motion.',
    framework: 'react',
    category: 'animation',
    cliCommand: 'npx magicui-cli@latest add retro-grid',
    npmPackage: 'magic-ui framer-motion',
    docsUrl: 'https://magicui.design',
    githubStars: '12.4k',
    tags: ['animations', 'bento-grid', 'landing-pages', 'canvas'],
  },
  {
    id: 'shadcn-vue',
    name: 'shadcn-vue',
    description: 'Vue port of shadcn/ui. Accessible and customizable components that you can copy and paste into your Vue and Nuxt apps.',
    framework: 'vue',
    category: 'blocks',
    cliCommand: 'npx shadcn-vue@latest init',
    npmPackage: 'radix-vue tailwindcss-animate',
    docsUrl: 'https://www.shadcn-vue.com',
    githubStars: '6.9k',
    tags: ['vue', 'nuxt', 'radix-vue', 'tailwind'],
  },
  {
    id: 'shadcn-svelte',
    name: 'shadcn-svelte',
    description: 'Port of shadcn/ui for Svelte and SvelteKit. Accessible and customizable components written in TypeScript.',
    framework: 'svelte',
    category: 'blocks',
    cliCommand: 'npx shadcn-svelte@latest init',
    npmPackage: 'bits-ui tailwind-variants',
    docsUrl: 'https://next.shadcn-svelte.com',
    githubStars: '5.1k',
    tags: ['svelte', 'sveltekit', 'bits-ui', 'runes'],
  },
  {
    id: 'lucide-icons',
    name: 'Lucide Icons',
    description: 'Beautiful & consistent icon toolkit made by the community. An open-source fork of Feather Icons with 1,400+ vectors.',
    framework: 'multi',
    category: 'icons',
    cliCommand: 'npm install lucide-react lucide-vue-next lucide-svelte',
    npmPackage: 'lucide-react',
    docsUrl: 'https://lucide.dev',
    githubStars: '16.7k',
    tags: ['icons', 'svg', 'feather', 'tree-shakeable'],
  },
  {
    id: 'tailwind-css',
    name: 'Tailwind CSS v4',
    description: 'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
    framework: 'multi',
    category: 'styling',
    cliCommand: 'npm install tailwindcss @tailwindcss/postcss',
    npmPackage: 'tailwindcss',
    docsUrl: 'https://tailwindcss.com',
    githubStars: '82.1k',
    tags: ['utility-first', 'design-tokens', 'postcss', 'lightningcss'],
  },
];

export const RegistryExplorerWorkspace: React.FC = () => {
  const [search, setSearch] = useState('');
  const [frameworkFilter, setFrameworkFilter] = useState<'all' | 'react' | 'vue' | 'svelte' | 'multi'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredRegistries = useMemo(() => {
    return REGISTRIES.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchFramework = frameworkFilter === 'all' || item.framework === frameworkFilter || item.framework === 'multi';

      return matchSearch && matchFramework;
    });
  }, [search, frameworkFilter]);

  const handleCopyCli = async (item: RegistryItem) => {
    await copyToClipboard(item.cliCommand);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'var(--card-bg, #090d16)', padding: '16px 24px', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary, #fff)' }}>
            Component Registry Explorer
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted, #94a3b8)' }}>
            Curated directory of verified modern UI component registries, primitives, and ecosystem CLI tools.
          </p>
        </div>

        {/* Framework Pill Filters */}
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
          {(['all', 'react', 'vue', 'svelte'] as const).map((fw) => (
            <button
              key={fw}
              onClick={() => setFrameworkFilter(fw)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                background: frameworkFilter === fw ? 'var(--primary-color, #10b981)' : 'transparent',
                color: frameworkFilter === fw ? '#000' : '#cbd5e1',
                fontWeight: '600',
                fontSize: '12px',
                textTransform: 'capitalize',
                cursor: 'pointer',
              }}
            >
              {fw}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative' }}>
        <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search registries by name, tags (e.g. radix, motion, tailwind), or features..."
          style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '10px', background: 'var(--card-bg, #090d16)', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', color: '#fff', fontSize: '14px', outline: 'none' }}
        />
      </div>

      {/* Registry Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {filteredRegistries.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'var(--card-bg, #090d16)',
              borderRadius: '12px',
              border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Package size={20} color="#10b981" />
                  <h3 style={{ fontSize: '17px', fontWeight: '700', margin: 0, color: '#fff' }}>{item.name}</h3>
                </div>
                <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: '#38bdf8' }}>
                  ★ {item.githubStars}
                </span>
              </div>

              <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#94a3b8', margin: '0 0 14px' }}>
                {item.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', fontWeight: '500' }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CLI Snippet & Links Footer */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <code style={{ fontSize: '12px', color: '#cbd5e1', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '240px' }}>
                  {item.cliCommand}
                </code>
                <button
                  onClick={() => handleCopyCli(item)}
                  style={{ background: 'none', border: 'none', color: copiedId === item.id ? '#10b981' : '#94a3b8', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                  title="Copy command"
                >
                  {copiedId === item.id ? <Check size={15} /> : <Copy size={15} />}
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <a
                  href={item.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#10b981', fontWeight: '600', textDecoration: 'none' }}
                >
                  Documentation <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
