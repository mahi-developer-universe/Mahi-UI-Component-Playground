'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/stores/appStore';
import { THEMES } from '@/types/theme.types';
import { ThemeName } from '@/types';

interface HeaderProps {
  onOpenCommandPalette?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCommandPalette }) => {
  const pathname = usePathname();
  const { theme, setTheme, sidebarOpen, toggleSidebar } = useAppStore();
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const handleSelectTheme = (t: ThemeName) => {
    setTheme(t);
    document.documentElement.setAttribute('data-theme', t);
    setThemeDropdownOpen(false);
  };

  return (
    <header className="navbar" id="app-navbar" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={toggleSidebar}
          className="theme-btn"
          aria-label={sidebarOpen ? 'Collapse navigation sidebar' : 'Expand navigation sidebar'}
          style={{ padding: '6px 10px', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <Link href="/" className="brand-logo" id="brand-logo" style={{ textDecoration: 'none' }}>
          <div className="logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">Mahi<span className="brand-accent">UI</span></span>
            <span className="brand-tag">Playground</span>
          </div>
        </Link>

        {/* Home & About Direct Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '0.5rem' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              fontWeight: pathname === '/' ? 700 : 500,
              color: pathname === '/' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              background: pathname === '/' ? 'var(--accent-light)' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <span>Home</span>
          </Link>
          <Link
            href="/about"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              fontWeight: pathname === '/about' ? 700 : 500,
              color: pathname === '/about' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              background: pathname === '/about' ? 'var(--accent-light)' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <span>About</span>
          </Link>
        </nav>
      </div>

      <div className="nav-center" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={onOpenCommandPalette}
          className="search-bar"
          style={{
            cursor: 'pointer',
            minWidth: '280px',
            maxWidth: '380px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 14px',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-secondary)'
          }}
          aria-label="Search all 30 interactive tools and commands"
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Search 30 projects & tools...
          </span>
          <kbd style={{
            fontSize: '0.72rem',
            padding: '2px 6px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)'
          }}>
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
            className="theme-btn"
            style={{
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
            aria-expanded={themeDropdownOpen}
            aria-label="Change active website theme"
          >
            <span>Theme: <strong>{theme}</strong></span>
            <span style={{ fontSize: '0.7rem' }}>▼</span>
          </button>

          {themeDropdownOpen && (
            <div
              className="theme-dropdown-menu"
              style={{
                position: 'absolute',
                right: 0,
                top: '110%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '6px',
                minWidth: '180px',
                boxShadow: 'var(--glass-shadow)',
                zIndex: 200
              }}
            >
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSelectTheme(t.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: theme === t.id ? 'var(--accent-light)' : 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  <span
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: t.accent,
                      display: 'inline-block'
                    }}
                  />
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => {
            const event = new CustomEvent('open-shortcuts-modal');
            window.dispatchEvent(event);
          }}
          className="theme-btn"
          title="Keyboard shortcuts (or press ?)"
          aria-label="View keyboard shortcuts"
          style={{ padding: '6px 10px', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '1rem', lineHeight: 1 }}>⌨️</span>
        </button>

        <Link
          href="https://github.com/mahi-developer-universe/Mahi-UI-Component-Playground"
          target="_blank"
          rel="noopener noreferrer"
          className="theme-btn"
          style={{ padding: '6px 12px', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span>GitHub</span>
        </Link>
      </div>
    </header>
  );
};
