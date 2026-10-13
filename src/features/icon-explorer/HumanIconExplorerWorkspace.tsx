'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/clipboard';

interface HumanIcon {
  id: string;
  name: string;
  category: 'profiles' | 'collaboration' | 'gestures' | 'accessibility';
  svgPath: string;
}

const HUMAN_ICONS: HumanIcon[] = [
  // Profiles
  {
    id: 'user-single',
    name: 'Individual User',
    category: 'profiles',
    svgPath: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'
  },
  {
    id: 'user-check',
    name: 'Verified User',
    category: 'profiles',
    svgPath: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/>'
  },
  {
    id: 'user-plus',
    name: 'Add Member',
    category: 'profiles',
    svgPath: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>'
  },
  {
    id: 'user-id',
    name: 'Identification Badge',
    category: 'profiles',
    svgPath: '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><line x1="15" y1="8" x2="17" y2="8"/><line x1="15" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="17" y2="16"/>'
  },

  // Collaboration
  {
    id: 'team-users',
    name: 'Team / Community',
    category: 'collaboration',
    svgPath: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
  },
  {
    id: 'pair-programming',
    name: 'Pair Collaboration',
    category: 'collaboration',
    svgPath: '<circle cx="6" cy="7" r="3"/><circle cx="18" cy="7" r="3"/><path d="M2 19a4 4 0 0 1 8 0"/><path d="M14 19a4 4 0 0 1 8 0"/>'
  },
  {
    id: 'mentorship',
    name: 'Mentorship Dialog',
    category: 'collaboration',
    svgPath: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="9" cy="10" r="1.5"/><circle cx="15" cy="10" r="1.5"/>'
  },

  // Gestures
  {
    id: 'hand-shake',
    name: 'Handshake Partnership',
    category: 'gestures',
    svgPath: '<path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.8L15 13"/>'
  },
  {
    id: 'pointing-touch',
    name: 'Finger Touch Point',
    category: 'gestures',
    svgPath: '<path d="M18 11V6a2 2 0 0 0-4 0v3"/><path d="M14 10V4a2 2 0 0 0-4 0v7"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-5.7-2.3L3 16l1.5-1.5a2 2 0 0 1 2.8 0L9 16"/>'
  },

  // Accessibility
  {
    id: 'universal-access',
    name: 'Universal Human Access',
    category: 'accessibility',
    svgPath: '<circle cx="12" cy="4" r="2"/><path d="m4.93 10.93 4.24-4.24a2 2 0 0 1 2.83 0l4.24 4.24"/><path d="M12 10v10"/><path d="m8 15 4 5 4-5"/>'
  },
  {
    id: 'human-eye',
    name: 'Visual Perception',
    category: 'accessibility',
    svgPath: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>'
  },
  {
    id: 'ear-hearing',
    name: 'Auditory Hearing',
    category: 'accessibility',
    svgPath: '<path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a2 2 0 1 1-4 0"/><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 0 4 0"/>'
  }
];

export const HumanIconExplorerWorkspace: React.FC = () => {
  const [category, setCategory] = useState<string>('all');
  const [size, setSize] = useState<number>(32);
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [color, setColor] = useState<string>('#3b82f6');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Human Icons' },
    { id: 'profiles', label: 'Profiles & Identity' },
    { id: 'collaboration', label: 'Collaboration & Team' },
    { id: 'gestures', label: 'Touch & Gestures' },
    { id: 'accessibility', label: 'Universal Access' }
  ];

  const filtered = HUMAN_ICONS.filter(
    (i) => category === 'all' || i.category === category
  );

  const handleCopySvg = async (icon: HumanIcon) => {
    const rawSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
  ${icon.svgPath}
</svg>`;
    await copyToClipboard(rawSvg);
    setCopiedId(icon.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Controls Bar */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', fontWeight: 700 }}>Human-Themed Vector Icon Catalog</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>100% human-crafted vector geometry (Zero robot/AI icons in this catalog)</p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: category === c.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                  color: category === c.id ? '#fff' : 'var(--text-secondary)',
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

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Size ({size}px):</label>
            <input type="range" min="20" max="64" value={size} onChange={(e) => setSize(parseInt(e.target.value))} style={{ width: '100px' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Stroke ({strokeWidth}px):</label>
            <input type="range" min="1" max="3.5" step="0.5" value={strokeWidth} onChange={(e) => setStrokeWidth(parseFloat(e.target.value))} style={{ width: '100px' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Color Tint:</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: '36px', height: '32px', border: 'none', background: 'transparent', cursor: 'pointer' }} />
          </div>

          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
            Click any icon card to copy its production SVG code
          </span>
        </div>
      </div>

      {/* Icons Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {filtered.map((icon) => (
          <div
            key={icon.id}
            onClick={() => handleCopySvg(icon)}
            style={{
              background: 'var(--bg-card)',
              border: copiedId === icon.id ? '2px solid var(--success)' : '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: 'var(--glass-shadow)'
            }}
          >
            <div
              style={{
                width: `${size}px`,
                height: `${size}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              dangerouslySetInnerHTML={{
                __html: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${icon.svgPath}</svg>`
              }}
            />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{icon.name}</div>
              <div style={{ fontSize: '0.72rem', color: copiedId === icon.id ? 'var(--success)' : 'var(--text-muted)' }}>
                {copiedId === icon.id ? '✓ Copied SVG!' : icon.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
