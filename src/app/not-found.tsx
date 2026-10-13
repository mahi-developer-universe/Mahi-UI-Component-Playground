import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: '404 - Page Not Found | Mahi UI'
};

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '75vh',
        flexDirection: 'column',
        gap: '1.25rem',
        textAlign: 'center',
        padding: '2.5rem 1.5rem',
        maxWidth: '680px',
        margin: '0 auto'
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '6rem',
          fontWeight: 900,
          lineHeight: 1,
          background: 'var(--accent-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.05em'
        }}
      >
        404
      </div>

      <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
        Component Workspace Not Found
      </h1>

      <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
        The route, sandbox, or design studio you are attempting to visit does not exist or may have been reorganized into our 30 canonical project suites.
      </p>

      <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
        <Link
          href="/"
          className="interactive-hover"
          style={{
            padding: '0.8rem 1.75rem',
            background: 'var(--accent-primary, #10b981)',
            color: '#000',
            fontWeight: 700,
            borderRadius: 'var(--radius-md, 8px)',
            textDecoration: 'none'
          }}
        >
          Return to Hub
        </Link>
        <Link
          href="/projects"
          className="interactive-hover"
          style={{
            padding: '0.8rem 1.75rem',
            background: 'var(--bg-card, #161e2e)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            fontWeight: 600,
            borderRadius: 'var(--radius-md, 8px)',
            textDecoration: 'none'
          }}
        >
          Explore All 30 Projects
        </Link>
        <Link
          href="/studios"
          className="interactive-hover"
          style={{
            padding: '0.8rem 1.75rem',
            background: 'var(--bg-card, #161e2e)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            fontWeight: 600,
            borderRadius: 'var(--radius-md, 8px)',
            textDecoration: 'none'
          }}
        >
          Design Studios
        </Link>
      </div>
    </div>
  );
}

