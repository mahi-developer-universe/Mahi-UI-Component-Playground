'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/clipboard';
import { CodePanel } from '@/components/playground/CodePanel';

type CtaType = 'newsletter' | 'product-launch' | 'demo-request' | 'download-sdk';

export const CtaFooterGalleryWorkspace: React.FC = () => {
  const [ctaType, setCtaType] = useState<CtaType>('newsletter');
  const [footerColumns, setFooterColumns] = useState<number>(4);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const ctaTypes = [
    { id: 'newsletter' as const, label: 'Newsletter Signup' },
    { id: 'product-launch' as const, label: 'Product Launch Announcement' },
    { id: 'demo-request' as const, label: 'Book Demo Session' },
    { id: 'download-sdk' as const, label: 'Download CLI & SDK' }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const generatedHtml = `<section class="cta-section cta-${ctaType}">
  <div class="cta-card">
    <h2>Subscribe to Frontend Engineering Digest</h2>
    <form class="cta-form">
      <input type="email" placeholder="engineer@domain.com" required />
      <button type="submit">Subscribe Now</button>
    </form>
  </div>
</section>

<footer class="footer-columns-${footerColumns}">
  <div class="footer-grid">
    <!-- ${footerColumns} Responsive Footer Columns -->
  </div>
</footer>`;

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
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', fontWeight: 700 }}>CTA & Footer Gallery</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Combined high-conversion call-to-actions with responsive multi-column footers</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {ctaTypes.map((c) => (
            <button
              key={c.id}
              onClick={() => setCtaType(c.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-md)',
                background: ctaType === c.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                color: ctaType === c.id ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Live CTA & Footer Combined Preview Viewport */}
      <div
        style={{
          background: '#040711',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem'
        }}
      >
        {/* CTA Card Section */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(99, 102, 241, 0.18))',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '16px',
            padding: '2.5rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          {ctaType === 'newsletter' && (
            <>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>Stay Ahead in Modern Frontend Engineering</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '550px', margin: 0 }}>
                Weekly breakdown of micro-interactions, canvas shaders, web animations, and accessible component architectures.
              </p>
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', gap: '8px', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{ padding: '10px 16px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', width: '280px' }}
                />
                <button type="submit" style={{ padding: '10px 24px', borderRadius: '8px', background: 'var(--accent-primary)', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                  {submitted ? '✓ Subscribed!' : 'Subscribe Free'}
                </button>
              </form>
            </>
          )}

          {ctaType === 'product-launch' && (
            <>
              <span style={{ fontSize: '0.78rem', background: 'rgba(236,72,153,0.2)', color: '#ec4899', padding: '3px 10px', borderRadius: '20px', fontWeight: 700 }}>
                LIVE ON PRODUCT HUNT
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>Mahi UI 2.0 Is Officially Live</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '550px', margin: 0 }}>
                Thirty production tools built into a single cohesive developer ecosystem.
              </p>
              <button style={{ padding: '10px 24px', borderRadius: '8px', background: '#ec4899', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                Upvote & Get Pro License →
              </button>
            </>
          )}

          {ctaType === 'demo-request' && (
            <>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>Scale Your Enterprise Design System</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '550px', margin: 0 }}>
                Schedule a 20-minute architecture session with our core design systems engineers.
              </p>
              <button style={{ padding: '10px 24px', borderRadius: '8px', background: '#10b981', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                Schedule Architecture Review
              </button>
            </>
          )}

          {ctaType === 'download-sdk' && (
            <>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>Install the Mahi UI CLI Today</h2>
              <div style={{ background: '#090d16', padding: '10px 20px', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#38bdf8', border: '1px solid var(--border-color)' }}>
                npm install -g mahi-ui-component-playground
              </div>
            </>
          )}
        </div>

        {/* Responsive Multi-Column Footer Simulation */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '2rem' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>Components</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>Buttons</span>
                <span>Bento Cards</span>
                <span>Modals & Dialogs</span>
                <span>Dropdown Menus</span>
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>Studios</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>Gradient Wheel</span>
                <span>Pattern Studio</span>
                <span>Dither & Halftone</span>
                <span>Typography Clamp</span>
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>Ecosystem</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>Design Tokens</span>
                <span>Tailwind Config</span>
                <span>GitHub Repository</span>
                <span>Changelog</span>
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>Legal</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>MIT License</span>
                <span>Privacy Safe</span>
                <span>No Third-Party Cookies</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CodePanel code={generatedHtml} language="html" title="CTA & Footer HTML Layout" />
    </div>
  );
};
