'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ColorPaletteStudio } from '@/features/color-palette-studio';
import { ThemeStudio } from '@/features/theme-studio';
import { TypographyStudio } from '@/features/typography-studio';
import { IconExplorer } from '@/features/icon-explorer';
import { BackgroundStudio } from '@/features/background-studio';
import { MotionLab } from '@/features/animation-lab';

type StudioTab = 'typography' | 'icons' | 'colors' | 'themes' | 'backgrounds' | 'motion';

export default function StudiosPage() {
  const [activeTab, setActiveTab] = useState<StudioTab>('typography');

  const tabs = [
    { id: 'typography', label: 'Typography Studio', icon: 'Aa' },
    { id: 'icons', label: 'Icon Explorer', icon: '✦' },
    { id: 'colors', label: 'Color & Contrast', icon: '🎨' },
    { id: 'themes', label: 'Theme Studio', icon: '⚙️' },
    { id: 'backgrounds', label: 'Background Studio', icon: '▦' },
    { id: 'motion', label: 'Motion Physics', icon: '▶' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-main)', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Top Header Bar */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--accent-primary)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem'
              }}
            >
              ← Back to Mahi UI Hub
            </Link>
            <span style={{ color: 'var(--border-color)' }}>|</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Integrated Design Studios & Creative Labs
            </span>
          </div>

          <Link
            href="/playground"
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-light)',
              border: '1px solid var(--accent-primary)',
              color: 'var(--accent-primary)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            Live Component Playground →
          </Link>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-color)',
            overflowX: 'auto'
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as StudioTab)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  background: isActive ? 'var(--accent-light)' : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Studio View */}
        {activeTab === 'typography' && (
          <section>
            <div style={{ marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 6px 0' }}>
                Aa Typography & Font Studio
              </h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Pair fonts from Google Fonts & native stacks, configure musical type scale harmony ratios, and export synchronized token rules.
              </p>
            </div>
            <TypographyStudio />
          </section>
        )}

        {activeTab === 'icons' && (
          <section>
            <div style={{ marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 6px 0' }}>
                ✦ Curated Icon Explorer & Container Studio
              </h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Browse curated Lucide vector icons, adjust stroke width, size, container shapes, and copy React/TSX imports.
              </p>
            </div>
            <IconExplorer />
          </section>
        )}

        {activeTab === 'colors' && (
          <section>
            <div style={{ marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 6px 0' }}>
                🎨 Tonal Color Ramp & WCAG Contrast Studio
              </h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Generate complete 50-950 color ladders with guaranteed AAA/AA accessibility compliance ratings and multi-format token export.
              </p>
            </div>
            <ColorPaletteStudio />
          </section>
        )}

        {activeTab === 'themes' && (
          <section>
            <div style={{ marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 6px 0' }}>
                ⚙️ Theme Surface & Token Studio
              </h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Fine-tune corner radius, blur depth, and border opacity across all 5 human palette presets.
              </p>
            </div>
            <ThemeStudio />
          </section>
        )}

        {activeTab === 'backgrounds' && (
          <section>
            <div style={{ marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 6px 0' }}>
                ▦ Background & Surface Effects Studio
              </h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Author linear gradients, mesh radials, dot matrix and technical grid patterns with live CSS export.
              </p>
            </div>
            <BackgroundStudio />
          </section>
        )}

        {activeTab === 'motion' && (
          <section>
            <div style={{ marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 6px 0' }}>
                ▶ Motion Physics & Easing Studio
              </h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Test spring curves, cubic-bezier presets, and export motion timing rules.
              </p>
            </div>
            <MotionLab />
          </section>
        )}
      </div>
    </div>
  );
}
