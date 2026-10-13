'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/clipboard';
import { CodePanel } from '@/components/playground/CodePanel';

interface ButtonEffect {
  id: string;
  name: string;
  category: 'hover' | 'focus' | 'loading' | 'gradient' | 'border' | 'shimmer' | 'motion';
  description: string;
  css: string;
  html: string;
}

const BUTTON_EFFECTS: ButtonEffect[] = [
  // 1. Shimmer
  {
    id: 'shimmer-sweep',
    name: 'Neon Shimmer Sweep',
    category: 'shimmer',
    description: 'Continuous linear-gradient highlight sweeping across button surface',
    css: `.btn-shimmer-sweep {
  position: relative;
  background: #111827;
  color: #fff;
  border: 1px solid rgba(255,255,255,0.15);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  overflow: hidden;
  cursor: pointer;
}
.btn-shimmer-sweep::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(60deg, transparent, rgba(255,255,255,0.2), transparent);
  transform: rotate(30deg);
  animation: shimmerSweep var(--anim-speed, 2.5s) infinite linear;
}
@keyframes shimmerSweep {
  0% { transform: translate(-100%, -100%) rotate(30deg); }
  100% { transform: translate(100%, 100%) rotate(30deg); }
}`,
    html: `<button class="btn-shimmer-sweep">Neon Shimmer</button>`
  },
  {
    id: 'hologram-pulse',
    name: 'Holographic Pulse',
    category: 'shimmer',
    description: 'Subtle rainbow refraction shimmer on dark obsidian background',
    css: `.btn-hologram-pulse {
  background: linear-gradient(135deg, #090d16, #161f38);
  border: 1px solid #38bdf8;
  color: #38bdf8;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}
.btn-hologram-pulse:hover {
  box-shadow: 0 0 25px rgba(56, 189, 248, 0.5);
  transform: translateY(-2px);
}`,
    html: `<button class="btn-hologram-pulse">Hologram Pulse</button>`
  },

  // 2. Gradients
  {
    id: 'gradient-flow',
    name: 'Animated Gradient Flow',
    category: 'gradient',
    description: 'Dynamic 300% background gradient with smooth continuous panning',
    css: `.btn-gradient-flow {
  background: linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6, #ec4899);
  background-size: 300% 100%;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  animation: gradientFlow var(--anim-speed, 3s) infinite linear;
}
@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}`,
    html: `<button class="btn-gradient-flow">Gradient Flow</button>`
  },
  {
    id: 'sunset-amber',
    name: 'Sunset Ember Glow',
    category: 'gradient',
    description: 'Warm high-intensity dusk gradient with deep drop shadow',
    css: `.btn-sunset-amber {
  background: linear-gradient(135deg, #f97316 0%, #ef4444 100%);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-sunset-amber:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 25px rgba(249, 115, 22, 0.6);
}`,
    html: `<button class="btn-sunset-amber">Sunset Glow</button>`
  },

  // 3. Hover Effects
  {
    id: 'magnetic-lift',
    name: 'Magnetic Float & Shadow',
    category: 'hover',
    description: 'Smooth vertical lift with expanding atmospheric elevation shadow',
    css: `.btn-magnetic-lift {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
}
.btn-magnetic-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -6px rgba(0,0,0,0.4);
  border-color: var(--accent-primary);
}`,
    html: `<button class="btn-magnetic-lift">Magnetic Float</button>`
  },
  {
    id: 'fill-slide-up',
    name: 'Color Infill Slide-Up',
    category: 'hover',
    description: 'Secondary layer rising from bottom to completely fill the button',
    css: `.btn-fill-slide-up {
  position: relative;
  background: transparent;
  color: var(--accent-primary);
  border: 2px solid var(--accent-primary);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  overflow: hidden;
  cursor: pointer;
  z-index: 1;
  transition: color 0.3s ease;
}
.btn-fill-slide-up::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent-primary);
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
}
.btn-fill-slide-up:hover {
  color: #fff;
}
.btn-fill-slide-up:hover::before {
  transform: translateY(0);
}`,
    html: `<button class="btn-fill-slide-up">Fill Slide Up</button>`
  },

  // 4. Borders
  {
    id: 'rotating-border-gradient',
    name: 'Rotating Conic Border',
    category: 'border',
    description: 'Glowing conic gradient border line spinning continuously',
    css: `.btn-conic-border {
  position: relative;
  padding: 12px 24px;
  background: #0f172a;
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  z-index: 1;
}
.btn-conic-border::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: conic-gradient(from 0deg, #10b981, #3b82f6, #ec4899, #10b981);
  border-radius: 10px;
  z-index: -1;
  animation: spinBorder var(--anim-speed, 3s) linear infinite;
}
@keyframes spinBorder {
  to { transform: rotate(360deg); }
}`,
    html: `<button class="btn-conic-border">Conic Border</button>`
  },
  {
    id: 'corner-bracket-accent',
    name: 'Cyberpunk Corner Brackets',
    category: 'border',
    description: 'Geometric corner brackets expanding on interaction',
    css: `.btn-corner-brackets {
  position: relative;
  background: #120a24;
  color: #f43f5e;
  border: 1px solid rgba(244, 63, 94, 0.3);
  padding: 12px 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-corner-brackets:hover {
  border-color: #f43f5e;
  box-shadow: 0 0 15px rgba(244, 63, 94, 0.4);
}`,
    html: `<button class="btn-corner-brackets">Corner Bracket</button>`
  },

  // 5. Loading
  {
    id: 'spinner-embedded',
    name: 'Embedded Ring Spinner',
    category: 'loading',
    description: 'Active loading ring spinner replacing or beside text label',
    css: `.btn-loading-spinner {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #3b82f6;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: wait;
}
.btn-loading-spinner .spinner-ring {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin var(--anim-speed, 0.8s) linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}`,
    html: `<button class="btn-loading-spinner"><span class="spinner-ring"></span> Loading...</button>`
  },

  // 6. Motion Physics
  {
    id: 'bouncy-spring-push',
    name: 'Spring Bouncy Push',
    category: 'motion',
    description: 'Physics tactile bounce with quick depression and spring recovery',
    css: `.btn-spring-push {
  background: #10b981;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 0 #047857;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}
.btn-spring-push:active {
  transform: translateY(4px);
  box-shadow: 0 0 0 #047857;
}`,
    html: `<button class="btn-spring-push">Tactile Push</button>`
  },
  {
    id: 'ripple-click-wave',
    name: 'Material Radial Ripple',
    category: 'motion',
    description: 'Radial pulse wave radiating from center outward',
    css: `.btn-ripple-wave {
  background: #6366f1;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
  transition: box-shadow 0.3s ease;
}
.btn-ripple-wave:hover {
  box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
}`,
    html: `<button class="btn-ripple-wave">Ripple Wave</button>`
  }
];

export const ButtonEffectsWorkspace: React.FC = () => {
  const [selectedEffect, setSelectedEffect] = useState<ButtonEffect>(BUTTON_EFFECTS[0]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [animSpeed, setAnimSpeed] = useState<number>(2.5);
  const [copied, setCopied] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Effects' },
    { id: 'shimmer', label: 'Shimmer & Glow' },
    { id: 'gradient', label: 'Gradients' },
    { id: 'hover', label: 'Hover States' },
    { id: 'border', label: 'Animated Borders' },
    { id: 'loading', label: 'Loading States' },
    { id: 'motion', label: 'Motion Physics' }
  ];

  const filtered = BUTTON_EFFECTS.filter(
    (e) => filterCategory === 'all' || e.category === filterCategory
  );

  const handleCopy = async (code: string, label: string) => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Dynamic Controls Bar */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          background: 'var(--bg-card)',
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)'
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilterCategory(c.id)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                fontWeight: filterCategory === c.id ? 700 : 500,
                background: filterCategory === c.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.04)',
                color: filterCategory === c.id ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Animation Speed:</label>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.1"
            value={animSpeed}
            onChange={(e) => setAnimSpeed(parseFloat(e.target.value))}
            style={{ width: '120px' }}
          />
          <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>{animSpeed}s</span>
        </div>
      </div>

      {/* Button Preview Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedEffect(item)}
            style={{
              background: selectedEffect.id === item.id ? 'rgba(16, 185, 129, 0.06)' : 'var(--bg-card)',
              border: selectedEffect.id === item.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem 1.25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              cursor: 'pointer',
              minHeight: '160px',
              transition: 'all 0.2s ease',
              // Pass custom animation speed CSS variable
              ['--anim-speed' as any]: `${animSpeed}s`
            }}
          >
            {/* Render actual button HTML style */}
            <div dangerouslySetInnerHTML={{ __html: `<style>${item.css}</style>${item.html}` }} />

            <div style={{ textAlign: 'center', marginTop: 'auto' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.name}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Category: {item.category}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Effect Code Inspector & Export */}
      {selectedEffect && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl, 16px)',
            padding: '2rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.3rem' }}>{selectedEffect.name}</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{selectedEffect.description}</p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => handleCopy(selectedEffect.css, 'CSS')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-primary)',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}
              >
                {copied === 'CSS' ? '✓ Copied CSS' : 'Copy Production CSS'}
              </button>

              <button
                onClick={() => handleCopy(selectedEffect.html, 'HTML')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.08)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                {copied === 'HTML' ? '✓ Copied HTML' : 'Copy HTML'}
              </button>
            </div>
          </div>

          <CodePanel code={selectedEffect.css} language="css" title={`${selectedEffect.name} Rules`} />
        </div>
      )}
    </div>
  );
};
