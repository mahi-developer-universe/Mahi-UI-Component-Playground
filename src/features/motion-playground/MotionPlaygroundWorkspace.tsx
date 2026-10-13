'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/clipboard';
import { CodePanel } from '@/components/playground/CodePanel';

export const MotionPlaygroundWorkspace: React.FC = () => {
  // Cubic bezier points: (P1x, P1y, P2x, P2y)
  const [p1x, setP1x] = useState<number>(0.16);
  const [p1y, setP1y] = useState<number>(1.0);
  const [p2x, setP2x] = useState<number>(0.3);
  const [p2y, setP2y] = useState<number>(1.0);

  // Animation parameters
  const [duration, setDuration] = useState<number>(0.8);
  const [delay, setDelay] = useState<number>(0);
  const [iterations, setIterations] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [trackPosition, setTrackPosition] = useState<number>(0);

  // Spring physics parameters
  const [stiffness, setStiffness] = useState<number>(180);
  const [damping, setDamping] = useState<number>(12);
  const [mass, setMass] = useState<number>(1);

  const bezierString = `cubic-bezier(${p1x}, ${p1y}, ${p2x}, ${p2y})`;

  const presets = [
    { name: 'Spring Ease-Out', curve: [0.16, 1, 0.3, 1] },
    { name: 'Elastic Bounce', curve: [0.68, -0.55, 0.27, 1.55] },
    { name: 'Material Standard', curve: [0.4, 0, 0.2, 1] },
    { name: 'Ease-In-Out Quart', curve: [0.77, 0, 0.175, 1] },
    { name: 'Fast Out Slow In', curve: [0.4, 0, 0.6, 1] }
  ];

  const applyPreset = (curve: number[]) => {
    setP1x(curve[0]);
    setP1y(curve[1]);
    setP2x(curve[2]);
    setP2y(curve[3]);
  };

  const runAnimation = () => {
    setIsRunning(true);
    setTrackPosition(1);
    setTimeout(() => {
      setIsRunning(false);
    }, (duration + delay) * 1000);
  };

  const resetTrack = () => {
    setIsRunning(false);
    setTrackPosition(0);
  };

  const generatedCss = `.motion-target {
  transition: transform ${duration}s ${bezierString} ${delay}s;
}

/* Keyframes format */
@keyframes motionPhysics {
  0% { transform: translateX(0px) scale(1); }
  100% { transform: translateX(380px) scale(1.1); }
}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Visual Bezier Curve & Spring Canvas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {/* SVG Curve Visualizer */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>Cubic-Bezier Visualizer</h3>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>
              {bezierString}
            </span>
          </div>

          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '220px',
              background: '#040711',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              overflow: 'hidden'
            }}
          >
            <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
              {/* Grid Lines */}
              <line x1="0" y1="200" x2="200" y2="0" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
              <line x1="0" y1="200" x2="200" y2="200" stroke="rgba(255,255,255,0.15)" />
              <line x1="0" y1="0" x2="0" y2="200" stroke="rgba(255,255,255,0.15)" />

              {/* Control Handles */}
              <line x1="0" y1="200" x2={p1x * 200} y2={200 - p1y * 200} stroke="#f43f5e" strokeWidth="1.5" />
              <line x1="200" y1="0" x2={p2x * 200} y2={200 - p2y * 200} stroke="#38bdf8" strokeWidth="1.5" />

              {/* Curve Path */}
              <path
                d={`M 0 200 C ${p1x * 200} ${200 - p1y * 200}, ${p2x * 200} ${200 - p2y * 200}, 200 0`}
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="3.5"
              />

              {/* Control Points */}
              <circle cx={p1x * 200} cy={200 - p1y * 200} r="6" fill="#f43f5e" />
              <circle cx={p2x * 200} cy={200 - p2y * 200} r="6" fill="#38bdf8" />
            </svg>
          </div>

          {/* Slider Controls for Curve Points */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8rem' }}>
            <div>
              <label style={{ display: 'block', color: '#f43f5e', marginBottom: '4px' }}>P1X: {p1x}</label>
              <input type="range" min="0" max="1" step="0.01" value={p1x} onChange={(e) => setP1x(parseFloat(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#f43f5e', marginBottom: '4px' }}>P1Y: {p1y}</label>
              <input type="range" min="-0.5" max="2" step="0.05" value={p1y} onChange={(e) => setP1y(parseFloat(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#38bdf8', marginBottom: '4px' }}>P2X: {p2x}</label>
              <input type="range" min="0" max="1" step="0.01" value={p2x} onChange={(e) => setP2x(parseFloat(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#38bdf8', marginBottom: '4px' }}>P2Y: {p2y}</label>
              <input type="range" min="-0.5" max="2" step="0.05" value={p2y} onChange={(e) => setP2y(parseFloat(e.target.value))} style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        {/* Easing Presets & Spring Physics Parameters */}
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
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>Curated Curves & Physics</h3>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {presets.map((pr) => (
              <button
                key={pr.name}
                onClick={() => applyPreset(pr.curve)}
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

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Timing Parameters:</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Duration: {duration}s</span>
              <input type="range" min="0.1" max="3" step="0.1" value={duration} onChange={(e) => setDuration(parseFloat(e.target.value))} style={{ width: '160px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Delay: {delay}s</span>
              <input type="range" min="0" max="2" step="0.1" value={delay} onChange={(e) => setDelay(parseFloat(e.target.value))} style={{ width: '160px' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Runner Track */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem' }}>Interactive Motion Runner Track</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Watch real physics easing applied to target element</p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={runAnimation}
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-primary)',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              ▶ Run Animation
            </button>

            <button
              onClick={resetTrack}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.08)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* Track */}
        <div
          style={{
            background: '#040711',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '2rem 1.5rem',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'var(--accent-gradient)',
              boxShadow: '0 0 20px var(--accent-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800,
              fontSize: '1.1rem',
              transform: trackPosition === 1 ? 'translateX(min(650px, 70vw)) scale(1.05)' : 'translateX(0px) scale(1)',
              transition: isRunning ? `transform ${duration}s ${bezierString} ${delay}s` : 'none'
            }}
          >
            M
          </div>
        </div>

        <CodePanel code={generatedCss} language="css" title="Generated CSS Easing" />
      </div>
    </div>
  );
};
