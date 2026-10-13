'use client';

import React, { useState } from 'react';
import { Smartphone, Tablet, Laptop, RotateCcw, ZoomIn, ZoomOut, Check, ExternalLink } from 'lucide-react';

type DeviceType = 'mobile' | 'tablet' | 'laptop';
type Orientation = 'portrait' | 'landscape';

interface DevicePreset {
  name: string;
  width: number;
  height: number;
  type: DeviceType;
  bezelRadius: number;
}

const PRESETS: Record<DeviceType, DevicePreset> = {
  mobile: { name: 'Mobile (iPhone 15 / Pixel)', width: 375, height: 667, type: 'mobile', bezelRadius: 36 },
  tablet: { name: 'Tablet (iPad Pro / Air)', width: 768, height: 1024, type: 'tablet', bezelRadius: 28 },
  laptop: { name: 'Laptop (MacBook Pro 14")', width: 1200, height: 750, type: 'laptop', bezelRadius: 16 },
};

export const DevicePreviewerWorkspace: React.FC = () => {
  const [device, setDevice] = useState<DeviceType>('mobile');
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [zoom, setZoom] = useState<number>(0.9);
  const [sampleTheme, setSampleTheme] = useState<'emerald' | 'cyberpunk' | 'dark'>('emerald');

  const currentPreset = PRESETS[device];
  const isLandscape = orientation === 'landscape' && device !== 'laptop';
  const width = isLandscape ? currentPreset.height : currentPreset.width;
  const height = isLandscape ? currentPreset.width : currentPreset.height;

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Controls Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'var(--card-bg, #090d16)', padding: '16px 24px', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary, #fff)' }}>
            Responsive Hardware Device Previewer
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted, #94a3b8)' }}>
            Realistic bezels for Mobile (375px), Tablet (768px), and Laptop (1200px) with portrait/landscape toggles.
          </p>
        </div>

        {/* Device Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => setDevice('mobile')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '6px', border: 'none', background: device === 'mobile' ? 'var(--primary-color, #10b981)' : 'transparent', color: device === 'mobile' ? '#000' : '#cbd5e1', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}
            >
              <Smartphone size={15} /> Mobile (375px)
            </button>
            <button
              onClick={() => setDevice('tablet')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '6px', border: 'none', background: device === 'tablet' ? 'var(--primary-color, #10b981)' : 'transparent', color: device === 'tablet' ? '#000' : '#cbd5e1', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}
            >
              <Tablet size={15} /> Tablet (768px)
            </button>
            <button
              onClick={() => setDevice('laptop')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '6px', border: 'none', background: device === 'laptop' ? 'var(--primary-color, #10b981)' : 'transparent', color: device === 'laptop' ? '#000' : '#cbd5e1', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}
            >
              <Laptop size={15} /> Laptop (1200px)
            </button>
          </div>

          {/* Orientation flip */}
          {device !== 'laptop' && (
            <button
              onClick={() => setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#cbd5e1', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
            >
              <RotateCcw size={14} /> {orientation === 'portrait' ? 'Rotate Landscape' : 'Rotate Portrait'}
            </button>
          )}

          {/* Zoom controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}><ZoomOut size={15} /></button>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#10b981', minWidth: '38px', textAlign: 'center' }}>{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(Math.min(1.2, zoom + 0.1))} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}><ZoomIn size={15} /></button>
          </div>
        </div>
      </div>

      {/* Main Bezel Stage */}
      <div style={{ background: '#05070e', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', padding: '40px 20px', minHeight: '680px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease, width 0.3s ease, height 0.3s ease',
          }}
        >
          {/* Hardware Chassis */}
          <div
            style={{
              width: `${width + 32}px`,
              height: `${height + 40}px`,
              background: '#181b24',
              borderRadius: `${currentPreset.bezelRadius}px`,
              padding: '16px',
              boxShadow: '0 25px 60px -15px rgba(0,0,0,0.8), inset 0 0 0 2px rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            {/* Dynamic Island / Camera Notch */}
            {device === 'mobile' && !isLandscape && (
              <div style={{ position: 'absolute', top: '22px', left: '50%', transform: 'translateX(-50%)', width: '90px', height: '22px', background: '#000', borderRadius: '12px', zIndex: 10 }} />
            )}

            {/* Screen Inner Viewport */}
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
                background: sampleTheme === 'emerald' ? '#041c14' : sampleTheme === 'cyberpunk' ? '#0b0416' : '#090d16',
                borderRadius: `${Math.max(8, currentPreset.bezelRadius - 12)}px`,
                overflowY: 'auto',
                color: '#fff',
                fontFamily: 'Inter, system-ui, sans-serif',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Internal Sample App Header */}
              <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }}>
                <span style={{ fontWeight: '800', fontSize: '14px', color: '#10b981' }}>Mahi Platform</span>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{width}px × {height}px</span>
              </div>

              {/* Sample Content Body */}
              <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                <div style={{ padding: '4px 10px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontSize: '11px', fontWeight: '700', width: 'fit-content' }}>
                  RESPONSIVE VIEWPORT TEST
                </div>

                <h3 style={{ fontSize: device === 'mobile' ? '20px' : '26px', fontWeight: '800', margin: 0, lineHeight: 1.2 }}>
                  Universal Frontend Architecture
                </h3>

                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#94a3b8', margin: 0 }}>
                  Rendered inside an authentic hardware frame to simulate real mobile touch boundaries, tablet landscape columns, and widescreen layouts.
                </p>

                {/* Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: device === 'mobile' ? '1fr' : '1fr 1fr', gap: '12px', marginTop: '8px' }}>
                  <div style={{ padding: '14px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>Fluid Typography</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Viewport-scaled clamp equations.</div>
                  </div>
                  <div style={{ padding: '14px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>Touch Gestures</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>48px accessible tap targets.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
