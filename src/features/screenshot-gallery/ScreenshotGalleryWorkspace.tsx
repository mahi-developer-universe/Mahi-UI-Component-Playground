'use client';

import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Sparkles, Filter, Eye, X } from 'lucide-react';

interface WebsiteItem {
  id: string;
  name: string;
  category: 'saas' | 'developer-tools' | 'portfolio' | 'agency' | 'ai';
  url: string;
  description: string;
  tags: string[];
  gradientTheme: string;
}

const WEBSITES: WebsiteItem[] = [
  {
    id: 'stripe',
    name: 'Stripe Documentation & Landing',
    category: 'developer-tools',
    url: 'https://stripe.com',
    description: 'Gold-standard interactive developer documentation, code previews, and animated gradient mesh canvases.',
    tags: ['gradient-mesh', 'developer-experience', 'fintech', 'world-class'],
    gradientTheme: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
  },
  {
    id: 'linear',
    name: 'Linear',
    category: 'saas',
    url: 'https://linear.app',
    description: 'High-craft dark mode ergonomics, fluid keyboard navigation, and minimalist product telemetry.',
    tags: ['dark-mode', 'keyboard-first', 'minimalist', 'bento'],
    gradientTheme: 'linear-gradient(135deg, #18181b 0%, #3f3f46 100%)',
  },
  {
    id: 'vercel',
    name: 'Vercel Platform',
    category: 'developer-tools',
    url: 'https://vercel.com',
    description: 'High-contrast monochrome typography, geometric grid lines, and edge deployment visualizers.',
    tags: ['monochrome', 'grid-lines', 'typography', 'frameworks'],
    gradientTheme: 'linear-gradient(135deg, #000000 0%, #1e293b 100%)',
  },
  {
    id: 'rauno',
    name: 'Rauno Freiberg',
    category: 'portfolio',
    url: 'https://rauno.me',
    description: 'Legendary micro-interactions, spring physics, and keyboard-accessible design engineering explorations.',
    tags: ['micro-interactions', 'spring-physics', 'portfolio', 'craft'],
    gradientTheme: 'linear-gradient(135deg, #0f172a 0%, #10b981 100%)',
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    category: 'ai',
    url: 'https://anthropic.com',
    description: 'Editorial serif typography, warm desert earth tones, and transparent AI safety research interfaces.',
    tags: ['editorial-serif', 'earth-tones', 'ai-research', 'clean'],
    gradientTheme: 'linear-gradient(135deg, #78350f 0%, #b45309 100%)',
  },
  {
    id: 'godly',
    name: 'Godly Design Gallery',
    category: 'agency',
    url: 'https://godly.website',
    description: 'Curated gallery of the web’s finest interactive experiences, creative typography, and WebGL showcases.',
    tags: ['showcase', 'creative-web', 'webgl', 'inspiration'],
    gradientTheme: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
  },
];

export const ScreenshotGalleryWorkspace: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSite, setSelectedSite] = useState<WebsiteItem | null>(null);

  const filteredSites = useMemo(() => {
    return WEBSITES.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchCategory = activeCategory === 'all' || item.category === activeCategory;

      return matchSearch && matchCategory;
    });
  }, [search, activeCategory]);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'var(--card-bg, #090d16)', padding: '16px 24px', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary, #fff)' }}>
            Website Screenshot & Showcase Gallery
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted, #94a3b8)' }}>
            Searchable visual directory of reference web architectures with verified external links and detail modals.
          </p>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
          {(['all', 'developer-tools', 'saas', 'portfolio', 'ai', 'agency'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                background: activeCategory === cat ? 'var(--primary-color, #10b981)' : 'transparent',
                color: activeCategory === cat ? '#000' : '#cbd5e1',
                fontWeight: '600',
                fontSize: '12px',
                textTransform: 'capitalize',
                cursor: 'pointer',
              }}
            >
              {cat.replace('-', ' ')}
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
          placeholder="Filter websites by title, craft tag (e.g. bento, dark-mode, typography)..."
          style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '10px', background: 'var(--card-bg, #090d16)', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', color: '#fff', fontSize: '14px', outline: 'none' }}
        />
      </div>

      {/* Gallery Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {filteredSites.map((site) => (
          <div
            key={site.id}
            style={{
              background: 'var(--card-bg, #090d16)',
              borderRadius: '12px',
              border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            {/* Visual Simulated Screenshot Header Card */}
            <div
              style={{
                height: '160px',
                background: site.gradientTheme,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                padding: '20px',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedSite(site)}
            >
              <div style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', padding: '8px 16px', borderRadius: '8px', color: '#fff', fontWeight: '800', fontSize: '16px', letterSpacing: '-0.01em', border: '1px solid rgba(255,255,255,0.1)' }}>
                {site.name}
              </div>
            </div>

            {/* Card Metadata */}
            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#10b981', letterSpacing: '0.05em' }}>
                  {site.category.replace('-', ' ')}
                </span>
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, margin: '6px 0 12px' }}>
                  {site.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {site.tags.map((t) => (
                    <span key={t} style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: '#cbd5e1' }}>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', marginTop: '6px' }}>
                <button
                  onClick={() => setSelectedSite(site)}
                  style={{ background: 'none', border: 'none', color: '#cbd5e1', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Eye size={14} /> Inspect Details
                </button>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#10b981', fontWeight: '700', textDecoration: 'none' }}
                >
                  Visit Source <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      {selectedSite && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: '#090d16', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', maxWidth: '600px', width: '100%', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.8)' }}>
            <div style={{ height: '200px', background: selectedSite.gradientTheme, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <button
                onClick={() => setSelectedSite(null)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={18} />
              </button>
              <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: '800', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{selectedSite.name}</h3>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '700', textTransform: 'uppercase' }}>{selectedSite.category}</span>
                <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6, margin: '8px 0 0' }}>{selectedSite.description}</p>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedSite.tags.map((t) => (
                  <span key={t} style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', fontWeight: '600' }}>#{t}</span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                <button
                  onClick={() => setSelectedSite(null)}
                  style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '13px', cursor: 'pointer' }}
                >
                  Close
                </button>
                <a
                  href={selectedSite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: '8px', background: 'var(--primary-color, #10b981)', color: '#000', fontSize: '13px', fontWeight: '700', textDecoration: 'none' }}
                >
                  Open Live Website <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
