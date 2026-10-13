'use client';

import React from 'react';
import Link from 'next/link';

export const LandingFeaturesSection: React.FC = () => {
  const benefits = [
    {
      icon: '⚡',
      title: 'Unified Architecture',
      desc: 'All 30 frontend tools, motion sandboxes, and token generators run in one cohesive website. No multi-repo fatigue.'
    },
    {
      icon: '🎨',
      title: '5 W3C Design Token Themes',
      desc: 'Switch between Emerald, Dark, Light, Cyberpunk, and Sunset presets instantly with zero flash of unstyled content.'
    },
    {
      icon: '♿',
      title: 'WCAG 2.1 AAA Accessibility',
      desc: 'Tested for 18.57:1 AAA contrast ratios, keyboard-friendly focus rings, skip-to-content links, and screen-reader tags.'
    },
    {
      icon: '🔒',
      title: 'Enterprise Security Defense',
      desc: 'Protected by in-memory token bucket rate limiting, automated stack-trace sanitization, and zero hardcoded secrets.'
    },
    {
      icon: '📦',
      title: '1-Click Code Exporters',
      desc: 'Export production ready HTML, React 19 JSX, and DTCG design token JSON directly into your clipboard or repo.'
    },
    {
      icon: '📱',
      title: 'Multi-Device Responsive Matrix',
      desc: 'Fluid layouts crafted for mobile (320px), tablet (768px), and desktop (1440px) with zero horizontal overflow.'
    }
  ];

  return (
    <section aria-labelledby="features-heading" style={{ padding: '3.5rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 id="features-heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
          Why Developers Choose Mahi UI
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto' }}>
          Built for modern engineering teams demanding velocity, design precision, and accessibility compliance.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {benefits.map((b, idx) => (
          <div
            key={idx}
            className="interactive-hover"
            style={{
              padding: '1.75rem',
              borderRadius: 'var(--radius-xl, 16px)',
              background: 'var(--bg-card, #161e2e)',
              border: '1px solid var(--border-color, rgba(255, 255, 255, 0.12))',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'var(--accent-light, rgba(16, 185, 129, 0.15))',
                color: 'var(--accent-primary, #10b981)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem'
              }}
            >
              {b.icon}
            </div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {b.title}
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {b.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const LandingEndCtaSection: React.FC = () => {
  return (
    <section
      aria-label="Bottom Call to Action"
      style={{
        margin: '4rem 1.5rem 2rem 1.5rem',
        padding: '3.5rem 2rem',
        borderRadius: 'var(--radius-xl, 20px)',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.12) 100%)',
        border: '1px solid var(--border-color, rgba(16, 185, 129, 0.3))',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--text-primary)' }}>
          Ready to Elevate Your Frontend Development?
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 auto 2rem auto' }}>
          Access all 30 developer sandboxes, typography editors, 3D spatial geometry labs, and UI recipe builders completely free.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            href="/projects"
            className="interactive-hover"
            style={{
              padding: '0.85rem 2rem',
              borderRadius: 'var(--radius-md, 8px)',
              background: 'var(--accent-primary, #10b981)',
              color: '#000',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 4px 18px var(--accent-glow, rgba(16, 185, 129, 0.4))'
            }}
          >
            Launch All 30 Projects Now
          </Link>

          <Link
            href="/about"
            style={{
              padding: '0.85rem 1.75rem',
              borderRadius: 'var(--radius-md, 8px)',
              background: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none'
            }}
          >
            Read Architecture Docs
          </Link>
        </div>
      </div>
    </section>
  );
};
