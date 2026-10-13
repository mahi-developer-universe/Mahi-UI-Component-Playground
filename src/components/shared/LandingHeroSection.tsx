'use client';

import React from 'react';
import Link from 'next/link';

export const LandingHeroSection: React.FC = () => {
  return (
    <section
      aria-label="Hero Introduction"
      style={{
        padding: '3.5rem 1.5rem 2.5rem 1.5rem',
        maxWidth: '1280px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      {/* Above-the-fold Trust Chip */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '9999px',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: 'var(--accent-primary, #10b981)',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1.5rem'
        }}
      >
        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
        <span>Unified Frontend Suite • 30 Live Projects • 450+ Curated Tools</span>
      </div>

      {/* Primary Value Proposition Headline */}
      <h1
        style={{
          fontSize: 'clamp(2.3rem, 5vw, 3.8rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          margin: '0 auto 1.25rem auto',
          maxWidth: '960px',
          color: 'var(--text-primary)'
        }}
      >
        The All-In-One Modern <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Component Playground</span> & Developer Suite
      </h1>

      {/* Problem We Solve Subheading */}
      <p
        style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: '780px',
          margin: '0 auto 2.25rem auto'
        }}
      >
        Stop piecing together disconnected component repos, out-of-date generators, and unverified design kits.
        Mahi UI provides <strong>30 production-ready interactive workspaces</strong>, W3C DTCG design tokens, and instant code exports in one lightning-fast platform.
      </p>

      {/* Above-the-fold Primary & Secondary Call to Action (CTA) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}
      >
        <Link
          href="/projects"
          className="interactive-hover"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.85rem 1.85rem',
            borderRadius: 'var(--radius-md, 8px)',
            background: 'var(--accent-primary, #10b981)',
            color: '#000',
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
            boxShadow: '0 4px 20px var(--accent-glow, rgba(16, 185, 129, 0.35))'
          }}
        >
          <span>Explore 30 Projects</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </Link>

        <Link
          href="/playground"
          className="interactive-hover"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.85rem 1.85rem',
            borderRadius: 'var(--radius-md, 8px)',
            background: 'var(--bg-card, #161e2e)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color, rgba(255, 255, 255, 0.18))',
            fontWeight: 600,
            fontSize: '1rem',
            textDecoration: 'none'
          }}
        >
          <span>Open Interactive Studio</span>
          <span>✨</span>
        </Link>
      </div>

      {/* Trust Badges & Metrics Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          maxWidth: '920px',
          margin: '0 auto',
          padding: '1.25rem',
          borderRadius: 'var(--radius-lg, 12px)',
          background: 'var(--bg-card, #161e2e)',
          border: '1px solid var(--border-color, rgba(255, 255, 255, 0.12))',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
        }}
      >
        <div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-primary, #10b981)' }}>30 / 30</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Live Interactive Labs</div>
        </div>
        <div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-primary, #10b981)' }}>450+</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Verified Resources</div>
        </div>
        <div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-primary, #10b981)' }}>WCAG AAA</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>High Contrast Ratio</div>
        </div>
        <div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-primary, #10b981)' }}>100% Free</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Open Source MIT</div>
        </div>
      </div>
    </section>
  );
};
