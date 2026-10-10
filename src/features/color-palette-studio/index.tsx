'use client';

import React, { useState, useMemo } from 'react';
import { generateTonalScale, calculateContrastRatio, getWcagRating, suggestAccessibleColor } from '@/lib/color';
import { CopyButton } from '@/components/ui/CopyButton';

export const ColorPaletteStudio: React.FC = () => {
  const [baseColor, setBaseColor] = useState('#2563eb');
  const [colorName, setColorName] = useState('brand');

  const tonalScale = useMemo(() => {
    return generateTonalScale(baseColor);
  }, [baseColor]);

  // Generate CSS Variables Export
  const cssVariablesExport = useMemo(() => {
    const lines = tonalScale.map((s) => `  --color-${colorName}-${s.step}: ${s.hex};`);
    return `:root {\n${lines.join('\n')}\n}`;
  }, [tonalScale, colorName]);

  // Generate Tailwind Configuration Export
  const tailwindExport = useMemo(() => {
    const obj: Record<string, string> = {};
    tonalScale.forEach((s) => {
      obj[s.step] = s.hex;
    });
    return `// tailwind.config.js theme extension\ncolors: {\n  ${colorName}: ${JSON.stringify(obj, null, 4).replace(/"/g, "'")}\n}`;
  }, [tonalScale, colorName]);

  // Generate JSON Tokens Export
  const jsonExport = useMemo(() => {
    const tokens: Record<string, any> = {};
    tonalScale.forEach((s) => {
      tokens[`${colorName}-${s.step}`] = {
        value: s.hex,
        type: 'color',
        contrastWhite: s.contrastOnWhite,
        contrastDark: s.contrastOnDark
      };
    });
    return JSON.stringify(tokens, null, 2);
  }, [tonalScale, colorName]);

  const presetSwatches = [
    { label: 'Slate Blue', hex: '#2563eb' },
    { label: 'Emerald Forest', hex: '#059669' },
    { label: 'Cyber Violet', hex: '#7c3aed' },
    { label: 'Sunset Crimson', hex: '#e11d48' },
    { label: 'Amber Gold', hex: '#d97706' },
    { label: 'Graphite Slate', hex: '#475569' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Studio Header & Color Input Controls */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
              PICK BASE COLOR
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                style={{
                  width: '44px',
                  height: '40px',
                  padding: 0,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  background: 'transparent'
                }}
              />
              <input
                type="text"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  width: '100px'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
              TOKEN PREFIX
            </label>
            <input
              type="text"
              value={colorName}
              onChange={(e) => setColorName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              placeholder="brand"
              style={{
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                width: '120px'
              }}
            />
          </div>
        </div>

        {/* Quick Presets */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
            HARMONIOUS PALETTE PRESETS
          </label>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {presetSwatches.map((p) => (
              <button
                key={p.hex}
                onClick={() => setBaseColor(p.hex)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  background: baseColor === p.hex ? 'var(--accent-light)' : 'rgba(255, 255, 255, 0.04)',
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: p.hex }}></span>
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated 11-Step Tonal Swatch Scale */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            11-Step Tonal Ramp (50 - 950)
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Calculated perceptual lightness with WCAG 2.1 compliance audits
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))', gap: '8px' }}>
          {tonalScale.map((step) => {
            const isDark = step.contrastOnWhite > step.contrastOnDark;
            const textColor = isDark ? '#ffffff' : '#000000';
            const ratingWhite = getWcagRating(step.contrastOnWhite);

            return (
              <div
                key={step.step}
                style={{
                  background: step.hex,
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem 0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '130px',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  color: textColor
                }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, opacity: 0.9 }}>
                    {step.step}
                  </span>
                  <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    {step.hex}
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '8px', fontSize: '0.7rem', opacity: 0.85 }}>
                  <div>W: {step.contrastOnWhite}:1</div>
                  <div>D: {step.contrastOnDark}:1</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessible Contrast Inspector & Color Alternatives Generator */}
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
        <div>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: 700 }}>
            WCAG Accessibility Contrast Inspector & Smart Alternatives
          </h4>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Tests base color against light and dark surfaces. When a pairing fails WCAG AA (&lt; 4.5:1), an accessible luminance alternative is suggested automatically.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {/* Surface: Clean White */}
          {(() => {
            const contrast = calculateContrastRatio(baseColor, '#ffffff');
            const rating = getWcagRating(contrast);
            const suggested = contrast < 4.5 ? suggestAccessibleColor(baseColor, '#ffffff', 4.5) : baseColor;

            return (
              <div
                style={{
                  background: '#ffffff',
                  color: '#0f172a',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>
                    Surface: Clean White (#ffffff)
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: rating.aa ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: rating.aa ? '#059669' : '#dc2626'
                    }}
                  >
                    {contrast}:1 · {rating.label}
                  </span>
                </div>

                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: baseColor, marginBottom: '6px' }}>
                  Headline in Selected Color ({baseColor})
                </div>

                {contrast < 4.5 && (
                  <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #cbd5e1', fontSize: '0.8rem' }}>
                    <div style={{ color: '#dc2626', fontWeight: 600, marginBottom: '4px' }}>
                      ⚠️ Insufficient contrast for normal text (&lt; 4.5:1)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>Suggested Alternative:</span>
                      <button
                        onClick={() => setBaseColor(suggested)}
                        style={{
                          background: suggested,
                          color: '#ffffff',
                          border: 'none',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Apply {suggested} (4.5:1 AA)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Surface: Slate Dark */}
          {(() => {
            const contrast = calculateContrastRatio(baseColor, '#0b0f19');
            const rating = getWcagRating(contrast);
            const suggested = contrast < 4.5 ? suggestAccessibleColor(baseColor, '#0b0f19', 4.5) : baseColor;

            return (
              <div
                style={{
                  background: '#0b0f19',
                  color: '#f8fafc',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>
                    Surface: Slate Dark (#0b0f19)
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: rating.aa ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      color: rating.aa ? '#34d399' : '#f87171'
                    }}
                  >
                    {contrast}:1 · {rating.label}
                  </span>
                </div>

                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: baseColor, marginBottom: '6px' }}>
                  Headline in Selected Color ({baseColor})
                </div>

                {contrast < 4.5 && (
                  <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed rgba(255, 255, 255, 0.15)', fontSize: '0.8rem' }}>
                    <div style={{ color: '#f87171', fontWeight: 600, marginBottom: '4px' }}>
                      ⚠️ Insufficient contrast for normal text (&lt; 4.5:1)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>Suggested Alternative:</span>
                      <button
                        onClick={() => setBaseColor(suggested)}
                        style={{
                          background: suggested,
                          color: '#0b0f19',
                          border: 'none',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Apply {suggested} (4.5:1 AA)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Code Export Tabs */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem'
        }}
      >
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700 }}>
          Export Design Tokens
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* CSS Variables */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>CSS Custom Properties</span>
              <CopyButton text={cssVariablesExport} label="Copy CSS" />
            </div>
            <pre
              style={{
                background: '#090d16',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: '#38bdf8',
                overflowX: 'auto',
                maxHeight: '220px',
                border: '1px solid var(--border-color)'
              }}
            >
              {cssVariablesExport}
            </pre>
          </div>

          {/* Tailwind Config */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Tailwind Theme</span>
              <CopyButton text={tailwindExport} label="Copy Tailwind" />
            </div>
            <pre
              style={{
                background: '#090d16',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: '#34d399',
                overflowX: 'auto',
                maxHeight: '220px',
                border: '1px solid var(--border-color)'
              }}
            >
              {tailwindExport}
            </pre>
          </div>

          {/* Design Tokens JSON */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>JSON Tokens</span>
              <CopyButton text={jsonExport} label="Copy JSON" />
            </div>
            <pre
              style={{
                background: '#090d16',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: '#f472b6',
                overflowX: 'auto',
                maxHeight: '220px',
                border: '1px solid var(--border-color)'
              }}
            >
              {jsonExport}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
