'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/clipboard';
import { CodePanel } from '@/components/playground/CodePanel';

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

export const GradientStudioWorkspace: React.FC = () => {
  const [gradientType, setGradientType] = useState<'linear' | 'radial' | 'conic'>('linear');
  const [angle, setAngle] = useState<number>(135);
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: '1', color: '#6366f1', position: 0 },
    { id: '2', color: '#ec4899', position: 100 }
  ]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const presets = [
    {
      name: 'Cyberpunk Neon',
      type: 'linear' as const,
      angle: 135,
      stops: [
        { id: '1', color: '#f43f5e', position: 0 },
        { id: '2', color: '#06b6d4', position: 100 }
      ]
    },
    {
      name: 'Emerald Aurora',
      type: 'linear' as const,
      angle: 90,
      stops: [
        { id: '1', color: '#10b981', position: 0 },
        { id: '2', color: '#0284c7', position: 100 }
      ]
    },
    {
      name: 'Sunset Flame',
      type: 'linear' as const,
      angle: 45,
      stops: [
        { id: '1', color: '#f97316', position: 0 },
        { id: '2', color: '#ef4444', position: 100 }
      ]
    },
    {
      name: 'Radial Obsidian Glow',
      type: 'radial' as const,
      angle: 0,
      stops: [
        { id: '1', color: '#38bdf8', position: 0 },
        { id: '2', color: '#090d16', position: 100 }
      ]
    },
    {
      name: 'Conic Spectrum Mesh',
      type: 'conic' as const,
      angle: 180,
      stops: [
        { id: '1', color: '#6366f1', position: 0 },
        { id: '2', color: '#10b981', position: 50 },
        { id: '3', color: '#ec4899', position: 100 }
      ]
    }
  ];

  const buildGradientCss = () => {
    const sorted = [...colorStops].sort((a, b) => a.position - b.position);
    const stopsString = sorted.map((s) => `${s.color} ${s.position}%`).join(', ');

    if (gradientType === 'linear') {
      return `linear-gradient(${angle}deg, ${stopsString})`;
    } else if (gradientType === 'radial') {
      return `radial-gradient(circle at center, ${stopsString})`;
    } else {
      return `conic-gradient(from ${angle}deg at 50% 50%, ${stopsString})`;
    }
  };

  const gradientRule = buildGradientCss();

  const handleAddStop = () => {
    if (colorStops.length >= 5) return;
    setColorStops([
      ...colorStops,
      { id: Date.now().toString(), color: '#10b981', position: 50 }
    ]);
  };

  const handleRemoveStop = (id: string) => {
    if (colorStops.length <= 2) return;
    setColorStops(colorStops.filter((s) => s.id !== id));
  };

  const handleUpdateStop = (id: string, updates: Partial<ColorStop>) => {
    setColorStops(colorStops.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Live Gradient Preview Screen */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.3rem', fontWeight: 700 }}>Live Gradient Preview Canvas</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Dual/multi color stops with 360-degree angle control wheel</p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.08)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              {isFullscreen ? 'Exit Fullscreen' : '⛶ Fullscreen View'}
            </button>
          </div>
        </div>

        {/* Gradient Display Box */}
        <div
          style={{
            height: isFullscreen ? '70vh' : '280px',
            width: '100%',
            borderRadius: 'var(--radius-lg)',
            background: gradientRule,
            boxShadow: 'var(--glass-shadow)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'height 0.3s ease, background 0.15s ease'
          }}
        >
          <span
            style={{
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(10px)',
              padding: '0.6rem 1.25rem',
              borderRadius: '8px',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              border: '1px solid rgba(255,255,255,0.15)',
              maxWidth: '90%',
              textAlign: 'center',
              wordBreak: 'break-all'
            }}
          >
            background: {gradientRule};
          </span>
        </div>
      </div>

      {/* Angle, Type and Color Stop Controls */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Gradient Type */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['linear', 'radial', 'conic'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setGradientType(type)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: gradientType === type ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                  color: gradientType === type ? '#fff' : 'var(--text-secondary)',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Angle Slider (for linear & conic) */}
          {gradientType !== 'radial' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Angle ({angle}°):</label>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                style={{ width: '160px' }}
              />
            </div>
          )}
        </div>

        {/* Color Stops List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Color Stops ({colorStops.length}/5)</span>
            <button
              onClick={handleAddStop}
              disabled={colorStops.length >= 5}
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.08)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                fontSize: '0.8rem',
                cursor: colorStops.length >= 5 ? 'not-allowed' : 'pointer'
              }}
            >
              + Add Color Stop
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {colorStops.map((stop, idx) => (
              <div
                key={stop.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'var(--bg-input)',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => handleUpdateStop(stop.id, { color: e.target.value })}
                  style={{ width: '32px', height: '32px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{stop.color}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Position:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stop.position}
                  onChange={(e) => handleUpdateStop(stop.id, { position: parseInt(e.target.value) })}
                  style={{ flex: 1 }}
                />
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', width: '36px' }}>{stop.position}%</span>

                {colorStops.length > 2 && (
                  <button
                    onClick={() => handleRemoveStop(stop.id)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Curated Presets Bar */}
        <div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>
            Curated Presets:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {presets.map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setGradientType(p.type);
                  setAngle(p.angle);
                  setColorStops(p.stops);
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <CodePanel
          code={`/* CSS Background Gradient */\nbackground: ${gradientRule};`}
          language="css"
          title="Generated Gradient CSS"
        />
      </div>
    </div>
  );
};
