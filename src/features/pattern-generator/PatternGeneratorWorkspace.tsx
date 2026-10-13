'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/clipboard';
import { downloadFile } from '@/lib/download';
import { CodePanel } from '@/components/playground/CodePanel';

export const PatternGeneratorWorkspace: React.FC = () => {
  const [patternType, setPatternType] = useState<'dots' | 'crosses' | 'grid' | 'chevrons' | 'isometric' | 'mesh'>('dots');
  const [spacing, setSpacing] = useState<number>(24);
  const [scale, setScale] = useState<number>(2);
  const [color, setColor] = useState<string>('#3b82f6');
  const [opacity, setOpacity] = useState<number>(0.6);
  const [rotation, setRotation] = useState<number>(0);

  // Generate SVG pattern content based on type
  const getPatternSvgContent = () => {
    switch (patternType) {
      case 'dots':
        return `<circle cx="${spacing / 2}" cy="${spacing / 2}" r="${scale}" fill="${color}" fill-opacity="${opacity}" />`;
      case 'crosses':
        return `
          <line x1="${spacing / 2 - scale * 2}" y1="${spacing / 2}" x2="${spacing / 2 + scale * 2}" y2="${spacing / 2}" stroke="${color}" stroke-width="${scale}" stroke-opacity="${opacity}" />
          <line x1="${spacing / 2}" y1="${spacing / 2 - scale * 2}" x2="${spacing / 2}" y2="${spacing / 2 + scale * 2}" stroke="${color}" stroke-width="${scale}" stroke-opacity="${opacity}" />
        `;
      case 'grid':
        return `
          <path d="M ${spacing} 0 L 0 0 0 ${spacing}" fill="none" stroke="${color}" stroke-width="${scale}" stroke-opacity="${opacity}" />
        `;
      case 'chevrons':
        return `
          <path d="M 0 ${spacing / 2} L ${spacing / 2} 0 L ${spacing} ${spacing / 2}" fill="none" stroke="${color}" stroke-width="${scale}" stroke-opacity="${opacity}" />
        `;
      case 'isometric':
        return `
          <path d="M 0 ${spacing} L ${spacing} 0 M ${spacing / 2} ${spacing} L ${spacing} ${spacing / 2} M 0 ${spacing / 2} L ${spacing / 2} 0" fill="none" stroke="${color}" stroke-width="${scale}" stroke-opacity="${opacity}" />
        `;
      case 'mesh':
        return `
          <polygon points="${spacing / 2},0 ${spacing},${spacing / 2} ${spacing / 2},${spacing} 0,${spacing / 2}" fill="none" stroke="${color}" stroke-width="${scale}" stroke-opacity="${opacity}" />
        `;
      default:
        return '';
    }
  };

  const patternSvgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${spacing}" height="${spacing}" viewBox="0 0 ${spacing} ${spacing}">
  ${getPatternSvgContent()}
</svg>`;

  const svgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(patternSvgString)}`;

  const generatedCss = `.pattern-background {
  background-color: var(--bg-primary);
  background-image: url("${svgDataUri}");
  background-size: ${spacing}px ${spacing}px;
  background-repeat: repeat;
  transform: rotate(${rotation}deg);
}`;

  const handleDownloadSvg = () => {
    downloadFile(`pattern-${patternType}.svg`, patternSvgString, 'image/svg+xml');
  };

  const presets = [
    { name: 'Blueprint Grid', type: 'grid' as const, spacing: 20, scale: 1, color: '#38bdf8', opacity: 0.4 },
    { name: 'Dot Matrix Matrix', type: 'dots' as const, spacing: 16, scale: 1.5, color: '#10b981', opacity: 0.8 },
    { name: 'Cyberpunk Crosses', type: 'crosses' as const, spacing: 28, scale: 1.5, color: '#f43f5e', opacity: 0.7 },
    { name: 'Isometric Tech Mesh', type: 'isometric' as const, spacing: 32, scale: 1.2, color: '#818cf8', opacity: 0.5 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Pattern Visual Canvas */}
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
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.3rem', fontWeight: 700 }}>SVG Pattern Generator Studio</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Seamless repeating background tiles: Dots, Crosses, Grids, Chevrons, and Meshes</p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleDownloadSvg}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-primary)',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              Download SVG File
            </button>
          </div>
        </div>

        {/* Live Pattern Screen */}
        <div
          style={{
            height: '260px',
            width: '100%',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: '#040711',
            backgroundImage: `url("${svgDataUri}")`,
            backgroundSize: `${spacing}px ${spacing}px`,
            backgroundRepeat: 'repeat',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--glass-shadow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.2s ease'
          }}
        >
          <span
            style={{
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(10px)',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)'
            }}
          >
            Pattern: {patternType.toUpperCase()} ({spacing}px pitch)
          </span>
        </div>
      </div>

      {/* Control Panel */}
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
        {/* Pattern Types */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['dots', 'crosses', 'grid', 'chevrons', 'isometric', 'mesh'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setPatternType(t)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-md)',
                background: patternType === t ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                color: patternType === t ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Sliders Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Grid Pitch / Spacing: {spacing}px
            </label>
            <input type="range" min="10" max="64" value={spacing} onChange={(e) => setSpacing(parseInt(e.target.value))} style={{ width: '100%' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Stroke / Radius Scale: {scale}px
            </label>
            <input type="range" min="0.5" max="6" step="0.5" value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} style={{ width: '100%' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Opacity: {Math.round(opacity * 100)}%
            </label>
            <input type="range" min="0.1" max="1" step="0.05" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} style={{ width: '100%' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Rotation: {rotation}°
            </label>
            <input type="range" min="0" max="90" step="5" value={rotation} onChange={(e) => setRotation(parseInt(e.target.value))} style={{ width: '100%' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Pattern Color
            </label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: '100%', height: '36px', background: 'transparent', border: 'none', cursor: 'pointer' }} />
          </div>
        </div>

        {/* Presets */}
        <div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>
            Curated Pattern Presets:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {presets.map((pr) => (
              <button
                key={pr.name}
                onClick={() => {
                  setPatternType(pr.type);
                  setSpacing(pr.spacing);
                  setScale(pr.scale);
                  setColor(pr.color);
                  setOpacity(pr.opacity);
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
                {pr.name}
              </button>
            ))}
          </div>
        </div>

        <CodePanel code={generatedCss} language="css" title="Generated Pattern Background CSS" />
      </div>
    </div>
  );
};
