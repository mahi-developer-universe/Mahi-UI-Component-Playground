'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/clipboard';
import { CodePanel } from '@/components/playground/CodePanel';

export const LoaderGeneratorWorkspace: React.FC = () => {
  const [speed, setSpeed] = useState<number>(1.2);
  const [size, setSize] = useState<number>(44);
  const [color, setColor] = useState<string>('#3b82f6');
  const [intensity, setIntensity] = useState<number>(0.7);
  const [progressVal, setProgressVal] = useState<number>(68);

  const spinnerCss = `.mahi-spinner {
  width: ${size}px;
  height: ${size}px;
  border: 3px solid rgba(255, 255, 255, 0.15);
  border-top-color: ${color};
  border-radius: 50%;
  animation: mahiSpin ${speed}s linear infinite;
}
@keyframes mahiSpin {
  to { transform: rotate(360deg); }
}`;

  const orbitalCss = `.mahi-orbital {
  width: ${size}px;
  height: ${size}px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mahi-orbital::before, .mahi-orbital::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  border: 2px solid ${color};
  animation: mahiOrbit ${speed * 1.5}s ease-in-out infinite;
}
@keyframes mahiOrbit {
  0% { width: 0; height: 0; opacity: 1; }
  100% { width: 100%; height: 100%; opacity: 0; }
}`;

  const shimmerSkeletonCss = `.mahi-skeleton-shimmer {
  background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,${intensity * 0.25}) 50%, rgba(255,255,255,0.04) 75%);
  background-size: 200% 100%;
  animation: mahiShimmer ${speed * 1.2}s infinite;
  border-radius: 6px;
}
@keyframes mahiShimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`;

  const progressBarCss = `.mahi-progress-track {
  width: 100%;
  height: 8px;
  background: rgba(255,255,255,0.08);
  border-radius: 9999px;
  overflow: hidden;
}
.mahi-progress-fill {
  height: 100%;
  width: ${progressVal}%;
  background: ${color};
  border-radius: 9999px;
  transition: width 0.3s ease;
}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Configuration Controls Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.25rem',
          background: 'var(--bg-card)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)'
        }}
      >
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Speed: {speed}s
          </label>
          <input type="range" min="0.4" max="3" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} style={{ width: '100%' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Size: {size}px
          </label>
          <input type="range" min="20" max="80" step="2" value={size} onChange={(e) => setSize(parseInt(e.target.value))} style={{ width: '100%' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Accent Color
          </label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: '100%', height: '36px', background: 'transparent', border: 'none', cursor: 'pointer' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Determinate Progress: {progressVal}%
          </label>
          <input type="range" min="0" max="100" value={progressVal} onChange={(e) => setProgressVal(parseInt(e.target.value))} style={{ width: '100%' }} />
        </div>
      </div>

      {/* Live Loaders & Skeletons Showcase */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {/* Orbital & Spinners */}
        <div style={{ background: 'var(--bg-card)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', minHeight: '220px' }}>
          <style>{spinnerCss}</style>
          <div className="mahi-spinner" />
          <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Orbital Ring Spinner</div>
        </div>

        {/* Pulsing Dots */}
        <div style={{ background: 'var(--bg-card)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', minHeight: '220px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: `${size / 3}px`,
                  height: `${size / 3}px`,
                  borderRadius: '50%',
                  background: color,
                  animation: `mahiPulseDot ${speed}s infinite ease-in-out`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
          <style>{`
            @keyframes mahiPulseDot {
              0%, 100% { transform: scale(0.6); opacity: 0.4; }
              50% { transform: scale(1.15); opacity: 1; }
            }
          `}</style>
          <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Pulsing Wave Dots</div>
        </div>

        {/* Shimmer Profile Skeleton */}
        <div style={{ background: 'var(--bg-card)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '220px' }}>
          <style>{shimmerSkeletonCss}</style>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="mahi-skeleton-shimmer" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div className="mahi-skeleton-shimmer" style={{ width: '70%', height: '14px' }} />
              <div className="mahi-skeleton-shimmer" style={{ width: '40%', height: '10px' }} />
            </div>
          </div>
          <div className="mahi-skeleton-shimmer" style={{ width: '100%', height: '60px' }} />
          <div style={{ fontSize: '0.85rem', fontWeight: 600, textAlign: 'center', marginTop: 'auto' }}>Shimmer Profile Card</div>
        </div>

        {/* Progress Bar */}
        <div style={{ background: 'var(--bg-card)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem', minHeight: '220px' }}>
          <style>{progressBarCss}</style>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span>Telemetry Task Upload</span>
            <span style={{ fontWeight: 700, color }}>{progressVal}%</span>
          </div>
          <div className="mahi-progress-track">
            <div className="mahi-progress-fill" />
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, textAlign: 'center', marginTop: '1rem' }}>Determinate Progress Bar</div>
        </div>
      </div>

      <CodePanel code={`${spinnerCss}\n\n${shimmerSkeletonCss}\n\n${progressBarCss}`} language="css" title="Reusable Loader & Skeleton CSS" />
    </div>
  );
};
