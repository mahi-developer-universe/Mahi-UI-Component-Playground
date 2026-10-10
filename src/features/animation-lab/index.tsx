'use client';

import React, { useState } from 'react';
import { CopyButton } from '@/components/ui/CopyButton';
import { Slider } from '@/components/ui/Slider';

export const MotionLab: React.FC = () => {
  const [duration, setDuration] = useState<number>(0.6);
  const [easingPreset, setEasingPreset] = useState<string>('cubic-bezier(0.16, 1, 0.3, 1)');
  const [activeTrigger, setActiveTrigger] = useState<boolean>(false);

  const presets = [
    { label: 'Spring Fluid (Default)', value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    { label: 'Ease Out Expo', value: 'cubic-bezier(0.19, 1, 0.22, 1)' },
    { label: 'Ease In Out Quart', value: 'cubic-bezier(0.77, 0, 0.175, 1)' },
    { label: 'Snappy Bounce', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    { label: 'Standard Linear', value: 'linear' }
  ];

  const generatedCss = `.animated-element {
  transition: transform ${duration}s ${easingPreset}, opacity ${duration}s ${easingPreset};
}`;

  const triggerAnimation = () => {
    setActiveTrigger(false);
    setTimeout(() => setActiveTrigger(true), 20);
  };

  return (
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '1.2rem', fontWeight: 700 }}>
            Motion Physics & Transition Studio
          </h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Calibrate cubic-bezier easing curves, duration timings, and simulate reactive physics springs.
          </p>
        </div>

        <button
          onClick={triggerAnimation}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-primary)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.85rem'
          }}
        >
          Replay Motion ▶
        </button>
      </div>

      {/* Preset Buttons */}
      <div>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
          EASING CURVE PRESETS
        </label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {presets.map((p) => (
            <button
              key={p.value}
              onClick={() => {
                setEasingPreset(p.value);
                triggerAnimation();
              }}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: easingPreset === p.value ? 'var(--accent-light)' : 'rgba(255, 255, 255, 0.03)',
                color: easingPreset === p.value ? 'var(--accent-primary)' : 'var(--text-primary)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontWeight: easingPreset === p.value ? 700 : 500
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{ maxWidth: '400px' }}>
        <Slider
          label="Transition Duration (Seconds)"
          value={duration}
          min={0.1}
          max={2.0}
          step={0.05}
          unit="s"
          onChange={setDuration}
        />
      </div>

      {/* Interactive Motion Runner Area */}
      <div
        style={{
          height: '180px',
          background: 'rgba(0, 0, 0, 0.25)',
          borderRadius: 'var(--radius-lg)',
          border: '1px dashed var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 2rem',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-gradient)',
            boxShadow: '0 8px 24px var(--accent-glow)',
            transform: activeTrigger ? 'translateX(400px) rotate(180deg)' : 'translateX(0px) rotate(0deg)',
            transition: `transform ${duration}s ${easingPreset}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '1.2rem'
          }}
        >
          ✦
        </div>
      </div>

      {/* Generated CSS snippet */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            CSS Transition Rule
          </span>
          <CopyButton text={generatedCss} label="Copy CSS" />
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
            border: '1px solid var(--border-color)'
          }}
        >
          {generatedCss}
        </pre>
      </div>
    </div>
  );
};
