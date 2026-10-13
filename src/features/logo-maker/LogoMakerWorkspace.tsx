'use client';

import React, { useState, useRef } from 'react';
import { downloadFile } from '@/lib/download';
import { copyToClipboard } from '@/lib/clipboard';

export const LogoMakerWorkspace: React.FC = () => {
  const [brandName, setBrandName] = useState<string>('Mahi');
  const [tagline, setTagline] = useState<string>('Studio');
  const [iconShape, setIconShape] = useState<'human' | 'badge' | 'shield' | 'circle' | 'geometric'>('human');
  const [primaryColor, setPrimaryColor] = useState<string>('#3b82f6');
  const [secondaryColor, setSecondaryColor] = useState<string>('#ec4899');
  const [borderRadius, setBorderRadius] = useState<number>(14);
  const [fontSize, setFontSize] = useState<number>(32);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const getVectorMark = () => {
    switch (iconShape) {
      case 'human':
        return `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" />
<circle cx="9" cy="7" r="4" fill="none" stroke="#ffffff" stroke-width="2.2" />`;
      case 'badge':
        return `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="none" stroke="#ffffff" stroke-width="2" />`;
      case 'shield':
        return `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="#ffffff" stroke-width="2" />`;
      case 'circle':
        return `<circle cx="12" cy="12" r="9" fill="none" stroke="#ffffff" stroke-width="2.5" />
<circle cx="12" cy="12" r="4" fill="#ffffff" />`;
      case 'geometric':
        return `<rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="#ffffff" stroke-width="2" />
<line x1="3" y1="9" x2="21" y2="9" stroke="#ffffff" stroke-width="2" />
<line x1="9" y1="21" x2="9" y2="9" stroke="#ffffff" stroke-width="2" />`;
      default:
        return '';
    }
  };

  const cleanSvgString = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="100" viewBox="0 0 320 100">
  <defs>
    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primaryColor}" />
      <stop offset="100%" stop-color="${secondaryColor}" />
    </linearGradient>
  </defs>
  <!-- Brand Icon Badge -->
  <rect x="20" y="20" width="60" height="60" rx="${borderRadius}" fill="url(#logoGrad)" />
  <g transform="translate(38, 38) scale(1)">
    ${getVectorMark()}
  </g>
  <!-- Typography -->
  <text x="96" y="56" font-family="'Inter', -apple-system, sans-serif" font-size="${fontSize}" font-weight="800" fill="#ffffff">
    ${brandName}<tspan fill="${primaryColor}">${tagline}</tspan>
  </text>
</svg>`;

  const handleDownloadSvg = () => {
    downloadFile('brand-logo.svg', cleanSvgString, 'image/svg+xml');
  };

  const handleCopySvg = async () => {
    await copyToClipboard(cleanSvgString);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Live Brand Canvas */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem'
        }}
      >
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.3rem', fontWeight: 700 }}>Mini Logo & Brand Mark Canvas</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Scalable SVG vectors with human marks and gradient badges</p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleDownloadSvg}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-primary)',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Download Scalable SVG
            </button>
            <button
              onClick={handleCopySvg}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.08)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Copy SVG Code
            </button>
          </div>
        </div>

        {/* Live SVG Rendering Mount */}
        <div
          style={{
            padding: '2.5rem 3.5rem',
            background: '#040711',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--glass-shadow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          dangerouslySetInnerHTML={{ __html: cleanSvgString }}
        />
      </div>

      {/* Brand Controls */}
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
        {/* Shape Switcher */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Mark Shape</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(['human', 'badge', 'shield', 'circle', 'geometric'] as const).map((sh) => (
              <button
                key={sh}
                onClick={() => setIconShape(sh)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: iconShape === sh ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                  color: iconShape === sh ? '#fff' : 'var(--text-secondary)',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {sh}
              </button>
            ))}
          </div>
        </div>

        {/* Typography & Color Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Brand Name</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Tagline / Accent Text</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Primary Accent</label>
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              style={{ width: '100%', height: '36px', border: 'none', background: 'transparent', cursor: 'pointer' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Secondary Accent</label>
            <input
              type="color"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              style={{ width: '100%', height: '36px', border: 'none', background: 'transparent', cursor: 'pointer' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Badge Radius ({borderRadius}px)</label>
            <input
              type="range"
              min="0"
              max="30"
              value={borderRadius}
              onChange={(e) => setBorderRadius(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Font Size ({fontSize}px)</label>
            <input
              type="range"
              min="20"
              max="48"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
