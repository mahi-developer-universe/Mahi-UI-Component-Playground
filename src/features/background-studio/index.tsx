'use client';

import React, { useState, useMemo } from 'react';
import { CopyButton } from '@/components/ui/CopyButton';
import { Slider } from '@/components/ui/Slider';

type BgType = 'gradient' | 'pattern' | 'mesh' | 'glass';

export const BackgroundStudio: React.FC = () => {
  const [bgType, setBgType] = useState<BgType>('gradient');

  // Gradient properties
  const [gradientAngle, setGradientAngle] = useState<number>(135);
  const [color1, setColor1] = useState<string>('#3b82f6');
  const [color2, setColor2] = useState<string>('#8b5cf6');
  const [color3, setColor3] = useState<string>('#ec4899');

  // Pattern properties
  const [patternType, setPatternType] = useState<'dots' | 'grid' | 'stripes'>('dots');
  const [patternSize, setPatternSize] = useState<number>(24);
  const [patternOpacity, setPatternOpacity] = useState<number>(15);

  // Mesh properties
  const [meshBlur, setMeshBlur] = useState<number>(80);

  // Compute CSS Style and CSS Code
  const { inlineStyle, cssSnippet } = useMemo(() => {
    if (bgType === 'gradient') {
      const grad = `linear-gradient(${gradientAngle}deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`;
      return {
        inlineStyle: { background: grad },
        cssSnippet: `.surface-gradient {\n  background: ${grad};\n}`
      };
    }

    if (bgType === 'pattern') {
      const alpha = patternOpacity / 100;
      if (patternType === 'dots') {
        const bgImg = `radial-gradient(rgba(255, 255, 255, ${alpha}) 1.5px, transparent 1.5px)`;
        const bgSz = `${patternSize}px ${patternSize}px`;
        return {
          inlineStyle: {
            backgroundColor: '#090d16',
            backgroundImage: bgImg,
            backgroundSize: bgSz
          },
          cssSnippet: `.surface-pattern-dots {\n  background-color: #090d16;\n  background-image: ${bgImg};\n  background-size: ${bgSz};\n}`
        };
      }
      if (patternType === 'grid') {
        const line = `linear-gradient(to right, rgba(255, 255, 255, ${alpha}) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, ${alpha}) 1px, transparent 1px)`;
        const bgSz = `${patternSize}px ${patternSize}px`;
        return {
          inlineStyle: {
            backgroundColor: '#090d16',
            backgroundImage: line,
            backgroundSize: bgSz
          },
          cssSnippet: `.surface-pattern-grid {\n  background-color: #090d16;\n  background-image: ${line};\n  background-size: ${bgSz};\n}`
        };
      }
      if (patternType === 'stripes') {
        const stripes = `repeating-linear-gradient(45deg, rgba(255, 255, 255, ${alpha}), rgba(255, 255, 255, ${alpha}) 10px, transparent 10px, transparent 20px)`;
        return {
          inlineStyle: {
            backgroundColor: '#090d16',
            backgroundImage: stripes
          },
          cssSnippet: `.surface-pattern-stripes {\n  background-color: #090d16;\n  background-image: ${stripes};\n}`
        };
      }
    }

    if (bgType === 'mesh') {
      const mesh = `radial-gradient(at 0% 0%, ${color1} 0px, transparent 50%), radial-gradient(at 100% 0%, ${color2} 0px, transparent 50%), radial-gradient(at 100% 100%, ${color3} 0px, transparent 50%)`;
      return {
        inlineStyle: {
          backgroundColor: '#090d16',
          backgroundImage: mesh
        },
        cssSnippet: `.surface-mesh {\n  background-color: #090d16;\n  background-image: ${mesh};\n}`
      };
    }

    // Glassmorphism
    return {
      inlineStyle: {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.15)'
      },
      cssSnippet: `.surface-glass {\n  background: rgba(255, 255, 255, 0.05);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n}`
    };
  }, [bgType, gradientAngle, color1, color2, color3, patternType, patternSize, patternOpacity]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Configuration Controls Bar */}
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
        {/* Surface Type Tabs */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
            BACKGROUND TYPE
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(['gradient', 'pattern', 'mesh', 'glass'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setBgType(type)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  background: bgType === type ? 'var(--accent-light)' : 'rgba(255, 255, 255, 0.03)',
                  color: bgType === type ? 'var(--accent-primary)' : 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Controls based on selected type */}
        {bgType === 'gradient' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', alignItems: 'end' }}>
            <Slider
              label="Angle (°)"
              value={gradientAngle}
              min={0}
              max={360}
              step={5}
              unit="°"
              onChange={setGradientAngle}
            />
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>COLOR 1</label>
              <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} style={{ width: '48px', height: '36px', borderRadius: '6px', border: 'none', cursor: 'pointer' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>COLOR 2</label>
              <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} style={{ width: '48px', height: '36px', borderRadius: '6px', border: 'none', cursor: 'pointer' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>COLOR 3</label>
              <input type="color" value={color3} onChange={(e) => setColor3(e.target.value)} style={{ width: '48px', height: '36px', borderRadius: '6px', border: 'none', cursor: 'pointer' }} />
            </div>
          </div>
        )}

        {bgType === 'pattern' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>PATTERN STYLE</label>
              <select
                value={patternType}
                onChange={(e) => setPatternType(e.target.value as any)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              >
                <option value="dots">Dot Matrix</option>
                <option value="grid">Technical Grid</option>
                <option value="stripes">Diagonal Stripes</option>
              </select>
            </div>
            <Slider label="Pattern Spacing" value={patternSize} min={12} max={48} step={2} unit="px" onChange={setPatternSize} />
            <Slider label="Opacity" value={patternOpacity} min={5} max={50} step={5} unit="%" onChange={setPatternOpacity} />
          </div>
        )}

        {bgType === 'mesh' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>MESH ANCHOR 1</label>
              <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} style={{ width: '48px', height: '36px', borderRadius: '6px', border: 'none', cursor: 'pointer' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>MESH ANCHOR 2</label>
              <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} style={{ width: '48px', height: '36px', borderRadius: '6px', border: 'none', cursor: 'pointer' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>MESH ANCHOR 3</label>
              <input type="color" value={color3} onChange={(e) => setColor3(e.target.value)} style={{ width: '48px', height: '36px', borderRadius: '6px', border: 'none', cursor: 'pointer' }} />
            </div>
          </div>
        )}
      </div>

      {/* Live Canvas Preview */}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>
            Live Background Preview & Surface Card
          </h4>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
            Active Surface: {bgType}
          </span>
        </div>

        {/* Viewport Frame */}
        <div
          style={{
            height: '240px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
            ...inlineStyle
          }}
        >
          {/* Sample Card Rendered on Top */}
          <div
            style={{
              padding: '1.25rem 2rem',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-md)',
              color: '#ffffff',
              textAlign: 'center',
              boxShadow: '0 20px 30px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>
              Foreground Element
            </div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              Testing foreground text contrast & surface harmony
            </div>
          </div>
        </div>

        {/* Export CSS */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Generated CSS Surface Rule
            </span>
            <CopyButton text={cssSnippet} label="Copy CSS" />
          </div>
          <pre
            style={{
              background: '#090d16',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: '#38bdf8',
              margin: 0,
              border: '1px solid var(--border-color)',
              overflowX: 'auto'
            }}
          >
            {cssSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
};
