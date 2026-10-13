'use client';

import React from 'react';
import { usePreferencesStore } from '@/stores/preferencesStore';
import { useAppStore } from '@/stores/appStore';
import { THEMES } from '@/types/theme.types';
import { ThemeName } from '@/types';

export default function SettingsPage() {
  const { theme, setTheme } = useAppStore();
  const {
    reducedMotion,
    setReducedMotion,
    preferredExportFormat,
    setPreferredExportFormat,
    defaultViewport,
    setDefaultViewport,
    compactCards,
    setCompactCards
  } = usePreferencesStore();

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
          Platform Settings & Preferences
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 }}>
          Manage your developer workspace preferences, theme tokens, motion behavior, and code export defaults.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Global Theme Selector */}
        <section style={{ background: 'var(--bg-card)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Global Website Theme</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 1.25rem 0' }}>
            Choose from five curated high-contrast developer themes with WCAG verified contrast ratios.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  document.documentElement.setAttribute('data-theme', t.id);
                }}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: theme === t.id ? 'var(--accent-light)' : 'rgba(255,255,255,0.03)',
                  border: theme === t.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: t.accent }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Accessibility & Motion */}
        <section style={{ background: 'var(--bg-card)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Accessibility & Reduced Motion</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 1.25rem 0' }}>
            Configure sensory and vestibular motion preferences across all 30 tool previews.
          </p>

          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '0.9rem' }}>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
            />
            <span>Enable Reduced Motion (Disable non-essential continuous keyframe animations)</span>
          </label>
        </section>

        {/* Code Generation Defaults */}
        <section style={{ background: 'var(--bg-card)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Default Code Export Format</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 1.25rem 0' }}>
            Choose the default tab and format for component snippet generation.
          </p>

          <div style={{ display: 'flex', gap: '1rem' }}>
            {(['react', 'css', 'html'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setPreferredExportFormat(fmt)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: preferredExportFormat === fmt ? 'var(--accent-primary)' : 'rgba(255,255,255,0.04)',
                  color: preferredExportFormat === fmt ? '#fff' : 'var(--text-secondary)',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {fmt.toUpperCase()}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
