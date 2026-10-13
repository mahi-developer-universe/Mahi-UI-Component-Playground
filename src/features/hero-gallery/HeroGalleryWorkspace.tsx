'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/clipboard';
import { CodePanel } from '@/components/playground/CodePanel';

type HeroLayout = 'centered' | 'split' | 'image-led' | 'dashboard';

export const HeroGalleryWorkspace: React.FC = () => {
  const [layout, setLayout] = useState<HeroLayout>('centered');
  const [title, setTitle] = useState<string>('Ship Delightful Software 10x Faster');
  const [subtitle, setSubtitle] = useState<string>('The enterprise component playground built for high-performing engineering organizations and creative teams.');
  const [primaryCta, setPrimaryCta] = useState<string>('Start Building Free →');
  const [secondaryCta, setSecondaryCta] = useState<string>('Explore Documentation');
  const [badgeText, setBadgeText] = useState<string>('🚀 NEXT-GEN PLATFORM 2.0');

  const layouts = [
    { id: 'centered' as const, label: 'Centered Minimal' },
    { id: 'split' as const, label: 'Split Two-Column' },
    { id: 'image-led' as const, label: 'Image-Led Visual' },
    { id: 'dashboard' as const, label: 'Product Dashboard Mockup' }
  ];

  const generatedHtml = `<section class="hero-section hero-${layout}">
  <div class="hero-container">
    <div class="hero-badge">${badgeText}</div>
    <h1 class="hero-title">${title}</h1>
    <p class="hero-subtitle">${subtitle}</p>
    <div class="hero-actions">
      <button class="btn btn-primary">${primaryCta}</button>
      <button class="btn btn-secondary">${secondaryCta}</button>
    </div>
  </div>
</section>`;

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
          gap: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', fontWeight: 700 }}>Hero Section Architectures</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Toggle layout archetypes, edit copy, and export production markup</p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {layouts.map((l) => (
              <button
                key={l.id}
                onClick={() => setLayout(l.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: layout === l.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                  color: layout === l.id ? '#fff' : 'var(--text-secondary)',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Headline</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Subtitle</label>
            <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Primary CTA</label>
            <input type="text" value={primaryCta} onChange={(e) => setPrimaryCta(e.target.value)} style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Floating Badge</label>
            <input type="text" value={badgeText} onChange={(e) => setBadgeText(e.target.value)} style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      {/* Live Hero Section Preview Screen */}
      <div
        style={{
          background: '#040711',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '3rem 2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Ambient Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '25%',
            width: '50%',
            height: '60%',
            background: 'var(--accent-gradient)',
            filter: 'blur(80px)',
            opacity: 0.15,
            pointerEvents: 'none'
          }}
        />

        {layout === 'centered' && (
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '20px', fontWeight: 700 }}>
              {badgeText}
            </span>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, margin: 0, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              {title}
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '650px', margin: 0 }}>
              {subtitle}
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button style={{ padding: '12px 28px', borderRadius: '8px', background: 'var(--accent-primary)', color: '#fff', border: 'none', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}>
                {primaryCta}
              </button>
              <button style={{ padding: '12px 28px', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}>
                {secondaryCta}
              </button>
            </div>
          </div>
        )}

        {layout === 'split' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <span style={{ fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '20px', fontWeight: 700, width: 'fit-content' }}>
                {badgeText}
              </span>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
                {title}
              </h1>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {subtitle}
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                <button style={{ padding: '10px 24px', borderRadius: '8px', background: 'var(--accent-primary)', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                  {primaryCta}
                </button>
                <button style={{ padding: '10px 24px', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
                  {secondaryCta}
                </button>
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem', boxShadow: 'var(--glass-shadow)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
              </div>
              <div style={{ height: '160px', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a5b4fc', fontWeight: 700 }}>
                Live Architecture Visual
              </div>
            </div>
          </div>
        )}

        {(layout === 'image-led' || layout === 'dashboard') && (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '20px', fontWeight: 700 }}>
              {badgeText}
            </span>
            <h1 style={{ fontSize: '2.6rem', fontWeight: 800, margin: 0, maxWidth: '800px', lineHeight: 1.2 }}>
              {title}
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: 0 }}>
              {subtitle}
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ padding: '10px 24px', borderRadius: '8px', background: 'var(--accent-primary)', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                {primaryCta}
              </button>
            </div>

            {/* Dashboard Mockup Screen */}
            <div
              style={{
                width: '100%',
                maxWidth: '900px',
                marginTop: '1.5rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem'
              }}
            >
              <div style={{ height: '90px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Daily Active Users</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>+12,450</span>
              </div>
              <div style={{ height: '90px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Global Latency</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8' }}>14ms</span>
              </div>
              <div style={{ height: '90px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Conversion Rate</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ec4899' }}>4.8%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <CodePanel code={generatedHtml} language="html" title="Hero Layout HTML" />
    </div>
  );
};
