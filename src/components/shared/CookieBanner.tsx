'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('mahi_cookie_consent');
      if (!consent) {
        // Subtle entrance after page load
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is blocked
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('mahi_cookie_consent', 'accepted');
    } catch {}
    setVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('mahi_cookie_consent', 'declined');
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie and Privacy Preferences"
      className="cookie-banner-container"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        right: '1.5rem',
        maxWidth: '520px',
        zIndex: 9990,
        margin: '0 auto 0 0',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div
        style={{
          background: 'var(--bg-card, #161e2e)',
          border: '1px solid var(--border-color, rgba(255, 255, 255, 0.15))',
          borderRadius: 'var(--radius-xl, 16px)',
          padding: '1.25rem 1.5rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px var(--accent-glow, rgba(16, 185, 129, 0.15))',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--accent-light, rgba(16, 185, 129, 0.15))',
              color: 'var(--accent-primary, #10b981)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              flexShrink: 0
            }}
          >
            🍪
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Privacy & Local Preferences
            </h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              We store your theme selection, bookmarks, and UI presets directly in your browser without tracking cookies or third-party ads. Read our{' '}
              <Link href="/about" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>
                Architecture & Privacy docs
              </Link>.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.65rem' }}>
          <button
            onClick={handleDecline}
            style={{
              padding: '0.45rem 0.95rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              background: 'transparent',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md, 8px)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Strict Only
          </button>
          <button
            onClick={handleAccept}
            style={{
              padding: '0.45rem 1.15rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              background: 'var(--accent-primary, #10b981)',
              color: '#000',
              border: 'none',
              borderRadius: 'var(--radius-md, 8px)',
              cursor: 'pointer',
              boxShadow: '0 2px 8px var(--accent-glow, rgba(16, 185, 129, 0.3))',
              transition: 'all 0.15s ease'
            }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};
