'use client';

import React, { useState } from 'react';
import { Copy, Check, Sliders, Layers, Sparkles, RefreshCw, Box } from 'lucide-react';
import { copyToClipboard } from '@/lib/clipboard';

type ToolTab = 'shadow' | 'glass' | 'radius' | 'transform';

export const CssToolkitWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ToolTab>('shadow');
  const [copied, setCopied] = useState(false);

  // Box Shadow state
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(16);
  const [shadowBlur, setShadowBlur] = useState(32);
  const [shadowSpread, setShadowSpread] = useState(-4);
  const [shadowColor, setShadowColor] = useState('rgba(0, 0, 0, 0.45)');
  const [shadowInset, setShadowInset] = useState(false);

  // Glassmorphism state
  const [glassBlur, setGlassBlur] = useState(16);
  const [glassOpacity, setGlassOpacity] = useState(0.12);
  const [glassBorderOpacity, setGlassBorderOpacity] = useState(0.2);
  const [glassSaturation, setGlassSaturation] = useState(150);

  // Border Radius state
  const [tlRadius, setTlRadius] = useState(24);
  const [trRadius, setTrRadius] = useState(8);
  const [brRadius, setBrRadius] = useState(24);
  const [blRadius, setBlRadius] = useState(8);

  // Transform state
  const [rotateX, setRotateX] = useState(15);
  const [rotateY, setRotateY] = useState(-15);
  const [rotateZ, setRotateZ] = useState(0);
  const [scale, setScale] = useState(1);
  const [perspective, setPerspective] = useState(1000);

  // Generated CSS Strings
  const shadowCss = `box-shadow: ${shadowInset ? 'inset ' : ''}${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor};`;

  const glassCss = `background: rgba(255, 255, 255, ${glassOpacity});
backdrop-filter: blur(${glassBlur}px) saturate(${glassSaturation}%);
-webkit-backdrop-filter: blur(${glassBlur}px) saturate(${glassSaturation}%);
border: 1px solid rgba(255, 255, 255, ${glassBorderOpacity});`;

  const radiusCss = `border-radius: ${tlRadius}px ${trRadius}px ${brRadius}px ${blRadius}px;`;

  const transformCss = `transform: perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale});
transform-style: preserve-3d;
transition: transform 0.2s ease-out;`;

  const getCurrentCss = () => {
    switch (activeTab) {
      case 'shadow': return shadowCss;
      case 'glass': return glassCss;
      case 'radius': return radiusCss;
      case 'transform': return transformCss;
    }
  };

  const handleCopy = async () => {
    await copyToClipboard(getCurrentCss());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header & Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'var(--card-bg, #090d16)', padding: '16px 24px', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary, #fff)' }}>
            CSS Generator Toolkit
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted, #94a3b8)' }}>
            Precision generator for multi-layer shadows, glassmorphism, 4-corner radii, and 3D transforms.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => setActiveTab('shadow')}
            style={{ padding: '8px 14px', borderRadius: '6px', border: 'none', background: activeTab === 'shadow' ? 'var(--primary-color, #10b981)' : 'transparent', color: activeTab === 'shadow' ? '#000' : '#cbd5e1', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}
          >
            Box Shadow
          </button>
          <button
            onClick={() => setActiveTab('glass')}
            style={{ padding: '8px 14px', borderRadius: '6px', border: 'none', background: activeTab === 'glass' ? 'var(--primary-color, #10b981)' : 'transparent', color: activeTab === 'glass' ? '#000' : '#cbd5e1', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}
          >
            Glassmorphism
          </button>
          <button
            onClick={() => setActiveTab('radius')}
            style={{ padding: '8px 14px', borderRadius: '6px', border: 'none', background: activeTab === 'radius' ? 'var(--primary-color, #10b981)' : 'transparent', color: activeTab === 'radius' ? '#000' : '#cbd5e1', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}
          >
            Border Radius
          </button>
          <button
            onClick={() => setActiveTab('transform')}
            style={{ padding: '8px 14px', borderRadius: '6px', border: 'none', background: activeTab === 'transform' ? 'var(--primary-color, #10b981)' : 'transparent', color: activeTab === 'transform' ? '#000' : '#cbd5e1', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}
          >
            3D Transform
          </button>
        </div>
      </div>

      {/* Main 2-column workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 400px) 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Controls Column */}
        <div style={{ background: 'var(--card-bg, #090d16)', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {activeTab === 'shadow' && (
            <>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Horizontal Offset (X)</span>
                  <span>{shadowX}px</span>
                </div>
                <input type="range" min={-50} max={50} value={shadowX} onChange={(e) => setShadowX(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Vertical Offset (Y)</span>
                  <span>{shadowY}px</span>
                </div>
                <input type="range" min={-50} max={50} value={shadowY} onChange={(e) => setShadowY(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Blur Radius</span>
                  <span>{shadowBlur}px</span>
                </div>
                <input type="range" min={0} max={100} value={shadowBlur} onChange={(e) => setShadowBlur(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Spread Radius</span>
                  <span>{shadowSpread}px</span>
                </div>
                <input type="range" min={-30} max={30} value={shadowSpread} onChange={(e) => setShadowSpread(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" id="inset-shadow" checked={shadowInset} onChange={(e) => setShadowInset(e.target.checked)} style={{ accentColor: 'var(--primary-color, #10b981)' }} />
                <label htmlFor="inset-shadow" style={{ fontSize: '13px', color: '#cbd5e1', cursor: 'pointer' }}>Inset Shadow</label>
              </div>
            </>
          )}

          {activeTab === 'glass' && (
            <>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Backdrop Blur</span>
                  <span>{glassBlur}px</span>
                </div>
                <input type="range" min={0} max={40} value={glassBlur} onChange={(e) => setGlassBlur(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Background Opacity</span>
                  <span>{Math.round(glassOpacity * 100)}%</span>
                </div>
                <input type="range" min={0} max={0.6} step={0.02} value={glassOpacity} onChange={(e) => setGlassOpacity(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Border Opacity</span>
                  <span>{Math.round(glassBorderOpacity * 100)}%</span>
                </div>
                <input type="range" min={0} max={0.8} step={0.02} value={glassBorderOpacity} onChange={(e) => setGlassBorderOpacity(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Saturation Boost</span>
                  <span>{glassSaturation}%</span>
                </div>
                <input type="range" min={100} max={250} value={glassSaturation} onChange={(e) => setGlassSaturation(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
              </div>
            </>
          )}

          {activeTab === 'radius' && (
            <>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Top-Left Radius</span>
                  <span>{tlRadius}px</span>
                </div>
                <input type="range" min={0} max={100} value={tlRadius} onChange={(e) => setTlRadius(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Top-Right Radius</span>
                  <span>{trRadius}px</span>
                </div>
                <input type="range" min={0} max={100} value={trRadius} onChange={(e) => setTrRadius(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Bottom-Right Radius</span>
                  <span>{brRadius}px</span>
                </div>
                <input type="range" min={0} max={100} value={brRadius} onChange={(e) => setBrRadius(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Bottom-Left Radius</span>
                  <span>{blRadius}px</span>
                </div>
                <input type="range" min={0} max={100} value={blRadius} onChange={(e) => setBlRadius(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
              </div>
            </>
          )}

          {activeTab === 'transform' && (
            <>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Rotate X (Tilt)</span>
                  <span>{rotateX}°</span>
                </div>
                <input type="range" min={-60} max={60} value={rotateX} onChange={(e) => setRotateX(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Rotate Y (Turn)</span>
                  <span>{rotateY}°</span>
                </div>
                <input type="range" min={-60} max={60} value={rotateY} onChange={(e) => setRotateY(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Scale</span>
                  <span>{scale.toFixed(2)}x</span>
                </div>
                <input type="range" min={0.6} max={1.4} step={0.05} value={scale} onChange={(e) => setScale(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Perspective</span>
                  <span>{perspective}px</span>
                </div>
                <input type="range" min={400} max={2000} step={50} value={perspective} onChange={(e) => setPerspective(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
              </div>
            </>
          )}

          {/* Quick preset buttons */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px', marginTop: '6px' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Quick Actions</span>
            <button
              onClick={() => {
                if (activeTab === 'shadow') { setShadowX(0); setShadowY(20); setShadowBlur(40); setShadowSpread(-5); }
                if (activeTab === 'glass') { setGlassBlur(20); setGlassOpacity(0.1); setGlassBorderOpacity(0.25); }
                if (activeTab === 'radius') { setTlRadius(32); setTrRadius(8); setBrRadius(32); setBlRadius(8); }
                if (activeTab === 'transform') { setRotateX(20); setRotateY(-20); setScale(1.05); }
              }}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <Sparkles size={14} color="#10b981" />
              Apply Modern Preset
            </button>
          </div>
        </div>

        {/* Live Stage & Code Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Stage */}
          <div
            style={{
              height: '380px',
              borderRadius: '12px',
              border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
              background: activeTab === 'glass' ? 'radial-gradient(circle at 20% 30%, #ec4899 0%, transparent 40%), radial-gradient(circle at 80% 70%, #3b82f6 0%, transparent 40%), #090d16' : '#090d16',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* The Target Preview Box */}
            <div
              style={{
                width: '240px',
                height: '240px',
                background: activeTab === 'glass' ? `rgba(255, 255, 255, ${glassOpacity})` : '#131b2e',
                backdropFilter: activeTab === 'glass' ? `blur(${glassBlur}px) saturate(${glassSaturation}%)` : undefined,
                WebkitBackdropFilter: activeTab === 'glass' ? `blur(${glassBlur}px) saturate(${glassSaturation}%)` : undefined,
                border: activeTab === 'glass' ? `1px solid rgba(255, 255, 255, ${glassBorderOpacity})` : '1px solid rgba(255,255,255,0.12)',
                borderRadius: activeTab === 'radius' ? `${tlRadius}px ${trRadius}px ${brRadius}px ${blRadius}px` : '16px',
                boxShadow: activeTab === 'shadow' ? `${shadowInset ? 'inset ' : ''}${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}` : '0 10px 25px -5px rgba(0,0,0,0.3)',
                transform: activeTab === 'transform' ? `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})` : undefined,
                transition: 'all 0.15s ease-out',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                textAlign: 'center',
              }}
            >
              <Box size={36} color="#10b981" style={{ marginBottom: '12px' }} />
              <div style={{ color: '#fff', fontWeight: '700', fontSize: '15px' }}>CSS Target Card</div>
              <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>
                {activeTab.toUpperCase()} active
              </div>
            </div>
          </div>

          {/* Generated Code Box */}
          <div style={{ background: 'var(--card-bg, #090d16)', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>
                Generated CSS
              </span>
              <button
                onClick={handleCopy}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '6px', background: 'var(--primary-color, #10b981)', border: 'none', color: '#000', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied to Clipboard' : 'Copy CSS'}
              </button>
            </div>
            <pre style={{ margin: 0, padding: '14px', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', color: '#34d399', fontSize: '13px', fontFamily: 'monospace', overflowX: 'auto', border: '1px solid rgba(255,255,255,0.06)' }}>
              {getCurrentCss()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
