import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        padding: '3rem 1.5rem',
        marginTop: 'auto',
        color: 'var(--text-secondary)'
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ maxWidth: '360px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}
              >
                M
              </div>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Mahi UI Component Playground
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
              One unified developer platform with 30 interactive frontend tools, design system generators, 5 dynamic themes, and production-grade verification.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Platform
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
                <li><Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Overview</Link></li>
                <li><Link href="/playground" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Component Studio</Link></li>
                <li><Link href="/projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>All 30 Projects</Link></li>
                <li><Link href="/studios" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Design Studios</Link></li>
                <li><Link href="/favorites" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Bookmarks</Link></li>
              </ul>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Legal & Contact
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
                <li><Link href="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Contact Team</Link></li>
                <li><Link href="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy Policy</Link></li>
                <li><Link href="/terms" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Terms of Service</Link></li>
                <li><Link href="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Architecture</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <div>
            Built with Next.js App Router, React 19, TypeScript, and DTCG Design Tokens.
          </div>
          <div>
            © {new Date().getFullYear()} Mahi Developer Universe • Cyber City, Hyderabad 500081, India
          </div>
        </div>
      </div>
    </footer>
  );
};
