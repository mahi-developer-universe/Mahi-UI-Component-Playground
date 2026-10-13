'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/stores/appStore';
import { useBookmarkStore } from '@/stores/bookmarkStore';

interface InspirationSite {
  id: string;
  name: string;
  url: string;
  category: 'saas' | 'fintech' | 'ai' | 'devtools' | 'portfolio' | 'agency';
  categoryLabel: string;
  tags: string[];
  description: string;
  gradient: string;
}

const INSPIRATION_SITES: InspirationSite[] = [
  {
    id: 'insp-1',
    name: 'Cult UI',
    url: 'https://www.cult-ui.com/',
    category: 'devtools',
    categoryLabel: 'Developer Tools',
    tags: ['components', 'dark-mode', 'micro-interactions'],
    description: 'High craft frontend components with slick motion physics and dark aesthetics.',
    gradient: 'linear-gradient(135deg, #1e1b4b, #312e81)'
  },
  {
    id: 'insp-2',
    name: '21st.dev',
    url: 'https://21st.dev/',
    category: 'devtools',
    categoryLabel: 'Developer Tools',
    tags: ['react', 'tailwind', 'primitives'],
    description: 'Open-source community design library of animated UI blocks and templates.',
    gradient: 'linear-gradient(135deg, #064e3b, #047857)'
  },
  {
    id: 'insp-3',
    name: 'Linear',
    url: 'https://linear.app/',
    category: 'saas',
    categoryLabel: 'SaaS',
    tags: ['keyboard-shortcuts', 'speed', 'minimalist'],
    description: 'Benchmark project management tool renowned for fluidity and visual precision.',
    gradient: 'linear-gradient(135deg, #3730a3, #4338ca)'
  },
  {
    id: 'insp-4',
    name: 'Stripe',
    url: 'https://stripe.com/',
    category: 'fintech',
    categoryLabel: 'Fintech',
    tags: ['isometric', 'gradients', 'payments'],
    description: 'Pioneering design standard for payment infrastructure and mesh gradients.',
    gradient: 'linear-gradient(135deg, #0f766e, #0e7490)'
  },
  {
    id: 'insp-5',
    name: 'OpenAI',
    url: 'https://openai.com/',
    category: 'ai',
    categoryLabel: 'AI Studio',
    tags: ['typography', 'editorial', 'models'],
    description: 'Clean typographic layout focusing on deep research and model interfaces.',
    gradient: 'linear-gradient(135deg, #1c1917, #292524)'
  },
  {
    id: 'insp-6',
    name: 'Rauno Freiberg Portfolio',
    url: 'https://rauno.me/',
    category: 'portfolio',
    categoryLabel: 'Portfolio',
    tags: ['craft', 'interaction', 'design-engineer'],
    description: 'Sublime design engineering portfolio featuring tactile craft and fluid interactions.',
    gradient: 'linear-gradient(135deg, #581c87, #6b21a8)'
  },
  {
    id: 'insp-7',
    name: 'Locomotive Agency',
    url: 'https://locomotive.ca/',
    category: 'agency',
    categoryLabel: 'Agency',
    tags: ['scroll-motion', 'typography', 'creative'],
    description: 'Award-winning digital design agency with smooth scroll physics and bold type.',
    gradient: 'linear-gradient(135deg, #831843, #9d174d)'
  },
  {
    id: 'insp-8',
    name: 'Midjourney',
    url: 'https://www.midjourney.com/',
    category: 'ai',
    categoryLabel: 'AI Studio',
    tags: ['generative', 'creative', 'community'],
    description: 'Prompt synthesis and generative imagery community canvas.',
    gradient: 'linear-gradient(135deg, #1e293b, #0f172a)'
  }
];

export const InspirationHubWorkspace: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const { addBookmark } = useBookmarkStore();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'saas', label: 'SaaS' },
    { id: 'fintech', label: 'Fintech' },
    { id: 'ai', label: 'AI Studio' },
    { id: 'devtools', label: 'Developer Tools' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'agency', label: 'Agency' }
  ];

  const filtered = INSPIRATION_SITES.filter((item) => {
    const matchCat = selectedCat === 'all' || item.category === selectedCat;
    const q = search.toLowerCase().trim();
    const matchQ =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q));

    return matchCat && matchQ;
  });

  const handleSaveBookmark = (site: InspirationSite) => {
    const res = addBookmark({
      title: site.name,
      url: site.url,
      category: site.categoryLabel,
      tags: site.tags,
      notes: site.description
    });
    setToastMsg(res.message);
    setTimeout(() => setToastMsg(null), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {toastMsg && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
          <div className="toast">
            <span className="toast-icon">✓</span>
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      {/* Header & Filter Controls */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.3rem', fontWeight: 700 }}>UI Inspiration Directory</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Curated showcase of verified web experiences across SaaS, Fintech, AI, and Portfolio designs.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search inspiration references..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              minWidth: '240px'
            }}
          />
        </div>

        {/* Categories Bar */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-md)',
                background: selectedCat === c.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                color: selectedCat === c.id ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Inspiration Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {filtered.map((site) => (
          <div
            key={site.id}
            className="bento-card"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--glass-shadow)'
            }}
          >
            {/* Visual Header Banner */}
            <div
              style={{
                height: '110px',
                background: site.gradient,
                padding: '1rem',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between'
              }}
            >
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                {site.name}
              </span>
              <span style={{ fontSize: '0.72rem', background: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: '4px', color: '#fff' }}>
                {site.categoryLabel}
              </span>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {site.description}
              </p>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {site.tags.map((t) => (
                  <span key={t} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-muted)' }}>
                    #{t}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                <button
                  onClick={() => handleSaveBookmark(site)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--accent-primary)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  ⭐ Bookmark
                </button>

                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    background: 'rgba(255,255,255,0.08)',
                    padding: '4px 10px',
                    borderRadius: '4px'
                  }}
                >
                  Visit Link ↗
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
