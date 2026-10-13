'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Palette, Layers, Sparkles } from 'lucide-react';
import { copyToClipboard } from '@/lib/clipboard';
import { downloadFile } from '@/lib/download';

// HSL to Hex utility
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Generate mathematical 10-step tonal scale (50 to 900)
function generateTonalRamp(hue: number, saturation: number): Record<number, string> {
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const lightnessMap: Record<number, number> = {
    50: 96,
    100: 90,
    200: 80,
    300: 70,
    400: 60,
    500: 50,
    600: 40,
    700: 30,
    800: 20,
    900: 10,
  };

  const result: Record<number, string> = {};
  steps.forEach((step) => {
    result[step] = hslToHex(hue, saturation, lightnessMap[step]);
  });
  return result;
}

export const TokenGeneratorWorkspace: React.FC = () => {
  const [hue, setHue] = useState(160); // Emerald hue default
  const [saturation, setSaturation] = useState(84);
  const [baseRadius, setBaseRadius] = useState(8);
  const [copied, setCopied] = useState<string | null>(null);

  const ramp = useMemo(() => generateTonalRamp(hue, saturation), [hue, saturation]);

  // CSS Custom Properties Export
  const cssVariables = useMemo(() => {
    let out = `:root {\n  /* Brand Primary Tonal Ramp (Hue: ${hue}, Sat: ${saturation}%) */\n`;
    Object.entries(ramp).forEach(([step, hex]) => {
      out += `  --color-primary-${step}: ${hex};\n`;
    });
    out += `\n  /* Spacing & Radii Design Tokens */\n`;
    out += `  --radius-sm: ${Math.round(baseRadius * 0.5)}px;\n`;
    out += `  --radius-md: ${baseRadius}px;\n`;
    out += `  --radius-lg: ${Math.round(baseRadius * 1.5)}px;\n`;
    out += `  --radius-full: 9999px;\n`;
    out += `}`;
    return out;
  }, [ramp, baseRadius, hue, saturation]);

  // Tailwind config export
  const tailwindConfig = useMemo(() => {
    return `// tailwind.config.ts\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        brand: {\n${Object.entries(ramp)
      .map(([k, v]) => `          ${k}: '${v}',`)
      .join('\n')}\n        },\n      },\n      borderRadius: {\n        sm: '${Math.round(baseRadius * 0.5)}px',\n        md: '${baseRadius}px',\n        lg: '${Math.round(baseRadius * 1.5)}px',\n      },\n    },\n  },\n};`;
  }, [ramp, baseRadius]);

  const handleCopy = async (text: string, type: string) => {
    await copyToClipboard(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownloadCss = () => {
    downloadFile(cssVariables, 'tokens.css', 'text/css');
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'var(--card-bg, #090d16)', padding: '16px 24px', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary, #fff)' }}>
            Design System Token Generator
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted, #94a3b8)' }}>
            Mathematical 10-step tonal ramp generator, border-radii tokens, CSS variables, and Tailwind config export.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handleCopy(tailwindConfig, 'tailwind')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#cbd5e1', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
          >
            {copied === 'tailwind' ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
            {copied === 'tailwind' ? 'Copied Tailwind!' : 'Copy Tailwind Config'}
          </button>
          <button
            onClick={handleDownloadCss}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: '8px', background: 'var(--primary-color, #10b981)', border: 'none', color: '#000', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
          >
            <Download size={15} />
            Download tokens.css
          </button>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Controls Column */}
        <div style={{ background: 'var(--card-bg, #090d16)', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>
              <span>Base Color Hue</span>
              <span>{hue}°</span>
            </div>
            <input type="range" min={0} max={360} value={hue} onChange={(e) => setHue(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>
              <span>Chroma Saturation</span>
              <span>{saturation}%</span>
            </div>
            <input type="range" min={10} max={100} value={saturation} onChange={(e) => setSaturation(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>
              <span>Base Border Radius</span>
              <span>{baseRadius}px</span>
            </div>
            <input type="range" min={0} max={24} value={baseRadius} onChange={(e) => setBaseRadius(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
          </div>

          {/* Quick presets */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
              Color Archetype Presets
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {[
                { name: 'Emerald', h: 160, s: 84 },
                { name: 'Sky Blue', h: 200, s: 95 },
                { name: 'Violet', h: 260, s: 85 },
                { name: 'Rose', h: 345, s: 90 },
                { name: 'Amber', h: 40, s: 95 },
              ].map((p) => (
                <button
                  key={p.name}
                  onClick={() => { setHue(p.h); setSaturation(p.s); }}
                  style={{ padding: '6px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tonal Ramp Visual Swatches & Code Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Swatches Ramp */}
          <div style={{ background: 'var(--card-bg, #090d16)', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', padding: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', display: 'block', marginBottom: '14px' }}>
              10-Step Mathematical Tonal Ramp (50 → 900)
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))', gap: '8px' }}>
              {Object.entries(ramp).map(([step, hex]) => (
                <div key={step} style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '100%',
                      height: '64px',
                      borderRadius: `${baseRadius}px`,
                      background: hex,
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    }}
                  />
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#fff' }}>{step}</span>
                  <span style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>{hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CSS Variables Output */}
          <div style={{ background: '#05070e', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>
                Generated CSS Custom Properties
              </span>
              <button
                onClick={() => handleCopy(cssVariables, 'css')}
                style={{ background: 'none', border: 'none', color: copied === 'css' ? '#10b981' : '#cbd5e1', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {copied === 'css' ? <Check size={14} /> : <Copy size={14} />}
                {copied === 'css' ? 'Copied' : 'Copy CSS'}
              </button>
            </div>
            <pre style={{ margin: 0, padding: '12px', borderRadius: '6px', background: 'rgba(0,0,0,0.5)', color: '#34d399', fontSize: '12px', fontFamily: 'monospace', overflowX: 'auto' }}>
              {cssVariables}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
