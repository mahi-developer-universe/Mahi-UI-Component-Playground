import React from 'react';
import Link from 'next/link';
import { InteractiveComponentPlayground } from '@/features/code-playground';

export const metadata = {
  title: 'Interactive Component Playground | Mahi UI',
  description: 'Customize UI components interactively, adjust props, preview responsive viewports, and export production-ready code.'
};

export default function PlaygroundPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-main)', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Navigation Bar */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--accent-primary)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem'
              }}
            >
              ← Back to Resource Hub
            </Link>
            <span style={{ color: 'var(--border-color)' }}>|</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Component Studio & Live Playground
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link
              href="/studios"
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              Design Studios →
            </Link>
          </div>
        </div>

        {/* Master Interactive Playground Engine */}
        <InteractiveComponentPlayground />
      </div>
    </div>
  );
}
