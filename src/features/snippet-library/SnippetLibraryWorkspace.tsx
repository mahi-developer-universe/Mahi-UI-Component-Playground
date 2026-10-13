'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Search, Code2, FileCode, Layers } from 'lucide-react';
import { copyToClipboard } from '@/lib/clipboard';
import { downloadFile } from '@/lib/download';

interface CodeSnippet {
  id: string;
  title: string;
  language: 'html' | 'css' | 'js' | 'react';
  description: string;
  tags: string[];
  code: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'snip-1',
    title: 'WCAG Relative Luminance & Contrast Math',
    language: 'js',
    description: 'Deterministic pure JavaScript function calculating exact WCAG 2.1 relative luminance and contrast ratio.',
    tags: ['wcag', 'accessibility', 'contrast', 'color-math'],
    code: `export function calculateContrastRatio(hex1, hex2) {
  const getLuminance = (hex) => {
    const clean = hex.replace('#', '');
    const rgb = [0, 2, 4].map((i) => parseInt(clean.substring(i, i + 2), 16) / 255);
    const linear = rgb.map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };

  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  return Math.round(ratio * 100) / 100;
}`,
  },
  {
    id: 'snip-2',
    title: 'Glassmorphic Card Backdrop Filter',
    language: 'css',
    description: 'Hardware-accelerated frosted glass surface with border contrast and saturation boost.',
    tags: ['glassmorphism', 'backdrop-filter', 'surface', 'modern-css'],
    code: `.glass-surface {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
}`,
  },
  {
    id: 'snip-3',
    title: 'Accessible Focus Trap Hook',
    language: 'react',
    description: 'Lightweight React hook ensuring modal escape key handling and cycling tab focus.',
    tags: ['react-hook', 'focus-trap', 'accessibility', 'keyboard'],
    code: `import { useEffect } from 'react';

export function useFocusTrap(containerRef, isActive, onEscape) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, onEscape, containerRef]);
}`,
  },
  {
    id: 'snip-4',
    title: 'Semantic Modern Responsive Layout',
    language: 'html',
    description: 'Clean HTML5 semantic structure with main landmarks, skip link, and accessible header navigation.',
    tags: ['html5', 'semantic', 'landmarks', 'seo'],
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mahi UI Accessible Scaffold</title>
</head>
<body>
  <a href="#main-content" class="sr-only focus:not-sr-only">Skip to content</a>
  <header role="banner">
    <nav aria-label="Primary Navigation">
      <a href="/" class="brand-logo">Mahi UI</a>
    </nav>
  </header>
  <main id="main-content" role="main">
    <h1>Universal Frontend Architecture</h1>
  </main>
</body>
</html>`,
  },
];

export const SnippetLibraryWorkspace: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'all' | 'html' | 'css' | 'js' | 'react'>('all');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSnippets = useMemo(() => {
    return SNIPPETS.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchLang = activeLang === 'all' || item.language === activeLang;

      return matchSearch && matchLang;
    });
  }, [search, activeLang]);

  const handleCopy = async (snippet: CodeSnippet) => {
    await copyToClipboard(snippet.code);
    setCopiedId(snippet.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (snippet: CodeSnippet) => {
    const ext = snippet.language === 'react' ? 'tsx' : snippet.language;
    downloadFile(snippet.code, `${snippet.id}.${ext}`, 'text/plain');
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'var(--card-bg, #090d16)', padding: '16px 24px', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary, #fff)' }}>
            Frontend Code Snippet Library
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted, #94a3b8)' }}>
            Searchable catalog of battle-tested HTML, CSS, JavaScript, and React architecture snippets.
          </p>
        </div>

        {/* Language Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
          {(['all', 'html', 'css', 'js', 'react'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                background: activeLang === lang ? 'var(--primary-color, #10b981)' : 'transparent',
                color: activeLang === lang ? '#000' : '#cbd5e1',
                fontWeight: '700',
                fontSize: '12px',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative' }}>
        <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search code snippets by title, tag, or language (e.g. wcag, hook, glassmorphism)..."
          style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '10px', background: 'var(--card-bg, #090d16)', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', color: '#fff', fontSize: '14px', outline: 'none' }}
        />
      </div>

      {/* Snippet Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredSnippets.map((snip) => (
          <div
            key={snip.id}
            style={{
              background: 'var(--card-bg, #090d16)',
              borderRadius: '12px',
              border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                    {snip.language}
                  </span>
                  <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#fff', margin: 0 }}>{snip.title}</h3>
                </div>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: '6px 0 0' }}>{snip.description}</p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleDownload(snip)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', fontSize: '12px', cursor: 'pointer' }}
                >
                  <Download size={14} /> Download
                </button>
                <button
                  onClick={() => handleCopy(snip)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 14px', borderRadius: '6px', background: 'var(--primary-color, #10b981)', border: 'none', color: '#000', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                >
                  {copiedId === snip.id ? <Check size={14} /> : <Copy size={14} />}
                  {copiedId === snip.id ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
            </div>

            {/* Code Block Container */}
            <div style={{ background: '#05070e', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <pre style={{ margin: 0, padding: '16px', color: '#34d399', fontSize: '13px', fontFamily: 'monospace', overflowX: 'auto', lineHeight: 1.5 }}>
                {snip.code}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
