'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/stores/appStore';
import { themePresets } from '@/data';
import { ThemeName } from '@/types';
import { CopyButton } from '@/components/ui/CopyButton';
import { Slider } from '@/components/ui/Slider';
import { exportDTCGDesignTokens } from '@/lib/dtcg-tokens';

export const ThemeStudio: React.FC = () => {
  const { theme, setTheme } = useAppStore();
  const [borderRadius, setBorderRadius] = useState(12);
  const [blurIntensity, setBlurIntensity] = useState(16);
  const [borderAlpha, setBorderAlpha] = useState(15);
  const [exportFormat, setExportFormat] = useState<'css' | 'dtcg'>('css');

  const activeThemePreset = themePresets.find((t) => t.id === theme) || themePresets[0];

  const generatedThemeBundle = `:root[data-theme="${theme}"] {
  --radius-custom: ${borderRadius}px;
  --glass-blur: ${blurIntensity}px;
  --border-opacity: ${borderAlpha / 100};
  --theme-anchor: ${activeThemePreset.color};
}`;

  const generatedDtcgBundle = JSON.stringify(
    exportDTCGDesignTokens(theme, borderRadius, blurIntensity, borderAlpha),
    null,
    2
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', fontWeight: 700 }}>
            Theme System Engine & Preset Inspector
          </h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Inspect core palettes, calibrate radius and blur tokens in real-time, and generate synchronized stylesheet rules.
          </p>
        </div>

        {/* 5 Grounded Human Palettes */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
            ACTIVE THEME PRESET
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
            {themePresets.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id as ThemeName);
                    document.documentElement.setAttribute('data-theme', t.id);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-lg)',
                    border: `1.5px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                    background: isSelected ? 'var(--accent-light)' : 'rgba(255, 255, 255, 0.03)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: t.color,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      flexShrink: 0
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t.label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {t.color}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Token Sliders */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <Slider
            label="Corner Radius Token (--radius-custom)"
            value={borderRadius}
            min={0}
            max={32}
            step={2}
            unit="px"
            onChange={setBorderRadius}
          />
          <Slider
            label="Glassmorphic Backdrop Blur (--glass-blur)"
            value={blurIntensity}
            min={0}
            max={40}
            step={2}
            unit="px"
            onChange={setBlurIntensity}
          />
          <Slider
            label="Border Stroke Alpha (--border-opacity)"
            value={borderAlpha}
            min={5}
            max={60}
            step={5}
            unit="%"
            onChange={setBorderAlpha}
          />
        </div>
      </div>

      {/* Live Token Preview Container */}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>
            Realtime Token Surface Preview
          </h4>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Applies radius {borderRadius}px, blur {blurIntensity}px, alpha {borderAlpha}%
          </span>
        </div>

        <div
          style={{
            padding: '2.5rem',
            background: `radial-gradient(circle at 50% 50%, ${activeThemePreset.color}33, transparent 70%)`,
            border: '1px dashed var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              padding: '1.75rem 2rem',
              borderRadius: `${borderRadius}px`,
              backdropFilter: `blur(${blurIntensity}px)`,
              WebkitBackdropFilter: `blur(${blurIntensity}px)`,
              background: 'rgba(255, 255, 255, 0.05)',
              border: `1px solid rgba(255, 255, 255, ${borderAlpha / 100})`,
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
              maxWidth: '400px',
              textAlign: 'center'
            }}
          >
            <h5 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
              Calibrated Glass Surface
            </h5>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Interactive preview adapting immediately to active sliders and theme tokens.
            </p>
          </div>
        </div>

        {/* Code Output */}
        <div style={{ marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Token Export:
              </span>
              <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '2px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <button
                  onClick={() => setExportFormat('css')}
                  style={{
                    background: exportFormat === 'css' ? 'var(--accent-primary)' : 'transparent',
                    color: exportFormat === 'css' ? '#fff' : 'var(--text-muted)',
                    border: 'none',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  CSS Variables
                </button>
                <button
                  onClick={() => setExportFormat('dtcg')}
                  style={{
                    background: exportFormat === 'dtcg' ? 'var(--accent-primary)' : 'transparent',
                    color: exportFormat === 'dtcg' ? '#fff' : 'var(--text-muted)',
                    border: 'none',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  W3C DTCG Tokens (JSON)
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <CopyButton
                text={exportFormat === 'css' ? generatedThemeBundle : generatedDtcgBundle}
                label={exportFormat === 'css' ? 'Copy CSS' : 'Copy DTCG JSON'}
              />
              {exportFormat === 'dtcg' && (
                <button
                  onClick={() => {
                    const blob = new Blob([generatedDtcgBundle], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `tokens-${theme}.tokens.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="action-btn"
                  style={{ fontSize: '0.75rem', padding: '3px 8px', cursor: 'pointer' }}
                >
                  ↓ Download .tokens.json
                </button>
              )}
            </div>
          </div>
          <pre
            style={{
              background: '#090d16',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: exportFormat === 'css' ? '#38bdf8' : '#34d399',
              margin: 0,
              border: '1px solid var(--border-color)',
              maxHeight: '260px',
              overflowY: 'auto'
            }}
          >
            {exportFormat === 'css' ? generatedThemeBundle : generatedDtcgBundle}
          </pre>
        </div>
      </div>
    </div>
  );
};
