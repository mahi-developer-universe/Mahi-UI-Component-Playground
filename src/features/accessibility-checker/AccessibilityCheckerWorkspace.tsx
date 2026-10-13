'use client';

import React, { useState, useMemo } from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2, XCircle, Copy, Check, Sparkles, RefreshCw } from 'lucide-react';
import { copyToClipboard } from '@/lib/clipboard';

// WCAG 2.1 Luminance Formula
function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length !== 6) return 0;

  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function calculateContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 100) / 100;
}

const PRESET_PAIRS = [
  { name: 'Modern Brand Dark', fg: '#f8fafc', bg: '#090d16' },
  { name: 'Emerald on Dark', fg: '#34d399', bg: '#064e3b' },
  { name: 'Muted Text on Slate', fg: '#94a3b8', bg: '#0f172a' },
  { name: 'Low Contrast Warning', fg: '#64748b', bg: '#1e293b' },
  { name: 'High Contrast AAA', fg: '#000000', bg: '#ffffff' },
  { name: 'Cyberpunk Neon', fg: '#38bdf8', bg: '#050505' },
];

export const AccessibilityCheckerWorkspace: React.FC = () => {
  const [fgColor, setFgColor] = useState('#f8fafc');
  const [bgColor, setBgColor] = useState('#090d16');
  const [copied, setCopied] = useState(false);

  const ratio = useMemo(() => calculateContrastRatio(fgColor, bgColor), [fgColor, bgColor]);

  // WCAG 2.1 Thresholds
  const normalTextAA = ratio >= 4.5;
  const normalTextAAA = ratio >= 7.0;
  const largeTextAA = ratio >= 3.0; // 18pt or 14pt bold
  const largeTextAAA = ratio >= 4.5;
  const uiComponentsAA = ratio >= 3.0;

  const handleCopyReport = async () => {
    const report = `WCAG 2.1 Contrast Analysis Report:
Foreground: ${fgColor}
Background: ${bgColor}
Contrast Ratio: ${ratio}:1

- Normal Text (AA - 4.5:1): ${normalTextAA ? 'PASS' : 'FAIL'}
- Normal Text (AAA - 7.0:1): ${normalTextAAA ? 'PASS' : 'FAIL'}
- Large Text (AA - 3.0:1): ${largeTextAA ? 'PASS' : 'FAIL'}
- Large Text (AAA - 4.5:1): ${largeTextAAA ? 'PASS' : 'FAIL'}
- UI Components & Icons (3.0:1): ${uiComponentsAA ? 'PASS' : 'FAIL'}`;

    await copyToClipboard(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    const temp = fgColor;
    setFgColor(bgColor);
    setBgColor(temp);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'var(--card-bg, #090d16)', padding: '16px 24px', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary, #fff)' }}>
            Color Accessibility Checker (WCAG 2.1)
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted, #94a3b8)' }}>
            Real-time luminance & contrast verification with AA / AAA compliance scoring for web components.
          </p>
        </div>

        <button
          onClick={handleCopyReport}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 18px', borderRadius: '8px', background: 'var(--primary-color, #10b981)', border: 'none', color: '#000', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied Report!' : 'Copy WCAG Report'}
        </button>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 420px) 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Color Controls */}
        <div style={{ background: 'var(--card-bg, #090d16)', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '8px' }}>
              Foreground (Text / Icon Color)
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                style={{ width: '48px', height: '48px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
              />
              <input
                type="text"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '12px', color: '#fff', fontSize: '14px', fontFamily: 'monospace' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleSwap}
              style={{ padding: '6px 14px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#cbd5e1', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw size={14} /> Swap Colors
            </button>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '8px' }}>
              Background Color
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                style={{ width: '48px', height: '48px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '12px', color: '#fff', fontSize: '14px', fontFamily: 'monospace' }}
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', display: 'block', marginBottom: '10px' }}>
              Tested Color Pairs
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {PRESET_PAIRS.map((pair) => (
                <button
                  key={pair.name}
                  onClick={() => { setFgColor(pair.fg); setBgColor(pair.bg); }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
                >
                  <span style={{ color: '#cbd5e1', fontSize: '12px', fontWeight: '500' }}>{pair.name}</span>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: pair.fg, border: '1px solid rgba(255,255,255,0.2)' }} />
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: pair.bg, border: '1px solid rgba(255,255,255,0.2)' }} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Scorecard & Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Ratio Scorecard Header */}
          <div style={{ background: 'var(--card-bg, #090d16)', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>
                Contrast Ratio
              </span>
              <div style={{ fontSize: '48px', fontWeight: '900', color: ratio >= 4.5 ? '#10b981' : ratio >= 3.0 ? '#f59e0b' : '#ef4444', lineHeight: 1.1, marginTop: '4px' }}>
                {ratio} : 1
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ padding: '12px 18px', borderRadius: '8px', background: normalTextAA ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', border: `1px solid ${normalTextAA ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`, textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: normalTextAA ? '#34d399' : '#f87171' }}>Normal Text AA</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: normalTextAA ? '#10b981' : '#ef4444' }}>{normalTextAA ? 'PASS (≥4.5)' : 'FAIL'}</div>
              </div>

              <div style={{ padding: '12px 18px', borderRadius: '8px', background: normalTextAAA ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', border: `1px solid ${normalTextAAA ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`, textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: normalTextAAA ? '#34d399' : '#f87171' }}>Normal Text AAA</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: normalTextAAA ? '#10b981' : '#ef4444' }}>{normalTextAAA ? 'PASS (≥7.0)' : 'FAIL'}</div>
              </div>

              <div style={{ padding: '12px 18px', borderRadius: '8px', background: largeTextAA ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', border: `1px solid ${largeTextAA ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`, textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: largeTextAA ? '#34d399' : '#f87171' }}>Large Text AA</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: largeTextAA ? '#10b981' : '#ef4444' }}>{largeTextAA ? 'PASS (≥3.0)' : 'FAIL'}</div>
              </div>
            </div>
          </div>

          {/* Live Component Preview Card */}
          <div
            style={{
              borderRadius: '12px',
              padding: '36px',
              backgroundColor: bgColor,
              color: fgColor,
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
          >
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.8 }}>
                Live Component Rendering
              </span>
              <h3 style={{ fontSize: '28px', fontWeight: '800', margin: '8px 0 0', lineHeight: 1.2 }}>
                Accessible Design Systems Matter
              </h3>
            </div>

            <p style={{ fontSize: '16px', lineHeight: 1.6, margin: 0, opacity: 0.9 }}>
              Universal access ensures every person, regardless of visual impairment or viewing environment, can comfortably consume digital products. This paragraph renders directly using your selected foreground and background colors.
            </p>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
              <button
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  backgroundColor: fgColor,
                  color: bgColor,
                  fontWeight: '700',
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Inverted CTA Button
              </button>
              <span style={{ fontSize: '13px', textDecoration: 'underline', cursor: 'pointer', opacity: 0.85 }}>
                Secondary Text Action →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
