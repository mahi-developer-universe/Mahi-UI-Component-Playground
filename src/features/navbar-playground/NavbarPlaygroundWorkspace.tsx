'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/clipboard';
import { CodePanel } from '@/components/playground/CodePanel';

type NavStyle = 'floating-island' | 'glassmorphic-sticky' | 'sidebar-dock' | 'bottom-sheet';

export const NavbarPlaygroundWorkspace: React.FC = () => {
  const [navStyle, setNavStyle] = useState<NavStyle>('floating-island');
  const [brandName, setBrandName] = useState<string>('MahiUI');
  const [blurIntensity, setBlurIntensity] = useState<number>(16);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>('Overview');

  const links = ['Overview', 'Components', 'Playgrounds', 'Ecosystem', 'Docs'];

  const styles = [
    { id: 'floating-island' as const, label: 'Floating Island' },
    { id: 'glassmorphic-sticky' as const, label: 'Glassmorphic Header' },
    { id: 'sidebar-dock' as const, label: 'Sidebar Dock' },
    { id: 'bottom-sheet' as const, label: 'Mobile Bottom Sheet' }
  ];

  const generatedCss = `/* Navbar Style: ${navStyle} */
.mahi-navbar-${navStyle} {
  backdrop-filter: blur(${blurIntensity}px);
  -webkit-backdrop-filter: blur(${blurIntensity}px);
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: ${navStyle === 'floating-island' ? '9999px' : '0px'};
  padding: 12px 24px;
}`;

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
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', fontWeight: 700 }}>Navbar Architecture Studio</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Floating island, sticky glassmorphic, sidebar dock, and mobile bottom sheet</p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {styles.map((s) => (
              <button
                key={s.id}
                onClick={() => setNavStyle(s.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: navStyle === s.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                  color: navStyle === s.id ? '#fff' : 'var(--text-secondary)',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginRight: '8px' }}>Brand Text:</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              style={{ padding: '4px 10px', borderRadius: '4px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Backdrop Blur:</label>
            <input type="range" min="4" max="32" value={blurIntensity} onChange={(e) => setBlurIntensity(parseInt(e.target.value))} style={{ width: '120px' }} />
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>{blurIntensity}px</span>
          </div>

          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              background: mobileDrawerOpen ? 'var(--accent-primary)' : 'rgba(255,255,255,0.08)',
              color: '#fff',
              border: 'none',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            {mobileDrawerOpen ? 'Close Mobile Drawer' : 'Toggle Mobile Drawer'}
          </button>
        </div>
      </div>

      {/* Live Interactive Navigation Simulation Viewport */}
      <div
        style={{
          background: '#040711',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem 1.5rem',
          minHeight: '360px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: navStyle === 'sidebar-dock' ? 'flex-start' : 'center',
          justifyContent: navStyle === 'bottom-sheet' ? 'flex-end' : 'flex-start'
        }}
      >
        {/* Floating Island Navigation */}
        {navStyle === 'floating-island' && (
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              padding: '10px 24px',
              borderRadius: '9999px',
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: `blur(${blurIntensity}px)`,
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.5)'
            }}
          >
            <span style={{ fontWeight: 800, color: 'var(--accent-primary)' }}>{brandName}</span>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {links.map((link) => (
                <button
                  key={link}
                  onClick={() => setActiveLink(link)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: activeLink === link ? '#fff' : 'var(--text-secondary)',
                    fontWeight: activeLink === link ? 700 : 500,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {link}
                </button>
              ))}
            </div>
            <button style={{ padding: '6px 14px', borderRadius: '20px', background: 'var(--accent-primary)', color: '#fff', border: 'none', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
              Action →
            </button>
          </nav>
        )}

        {/* Glassmorphic Sticky Header */}
        {navStyle === 'glassmorphic-sticky' && (
          <header
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 24px',
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: `blur(${blurIntensity}px)`,
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-primary)' }}>{brandName}</span>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              {links.map((link) => (
                <button
                  key={link}
                  onClick={() => setActiveLink(link)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: activeLink === link ? '#fff' : 'var(--text-secondary)',
                    fontWeight: activeLink === link ? 700 : 500,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {link}
                </button>
              ))}
            </div>
          </header>
        )}

        {/* Sidebar Dock */}
        {navStyle === 'sidebar-dock' && (
          <div
            style={{
              width: '200px',
              padding: '1.5rem',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: `blur(${blurIntensity}px)`,
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <span style={{ fontWeight: 800, color: 'var(--accent-primary)' }}>{brandName} Dock</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {links.map((link) => (
                <button
                  key={link}
                  onClick={() => setActiveLink(link)}
                  style={{
                    textAlign: 'left',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    background: activeLink === link ? 'var(--accent-light)' : 'transparent',
                    border: 'none',
                    color: activeLink === link ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    fontWeight: activeLink === link ? 700 : 500,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Bottom Sheet */}
        {navStyle === 'bottom-sheet' && (
          <div
            style={{
              width: '100%',
              maxWidth: '380px',
              padding: '12px 18px',
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: `blur(${blurIntensity}px)`,
              borderRadius: '20px 20px 0 0',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              justifyContent: 'space-around'
            }}
          >
            {links.slice(0, 4).map((link) => (
              <button
                key={link}
                onClick={() => setActiveLink(link)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeLink === link ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: activeLink === link ? 700 : 500,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                {link}
              </button>
            ))}
          </div>
        )}

        {/* Simulated Mobile Drawer Modal */}
        {mobileDrawerOpen && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '240px',
              background: 'rgba(10, 15, 30, 0.98)',
              borderLeft: '1px solid var(--border-color)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.7)',
              zIndex: 10
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800 }}>Mobile Menu</span>
              <button onClick={() => setMobileDrawerOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
            </div>
            {links.map((link) => (
              <div key={link} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {link}
              </div>
            ))}
          </div>
        )}
      </div>

      <CodePanel code={generatedCss} language="css" title="Navbar Architecture CSS" />
    </div>
  );
};
