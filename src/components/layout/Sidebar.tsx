'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/stores/appStore';
import { CANONICAL_PROJECTS } from '@/data/projects/canonicalRegistry';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen, favorites, recentProjects } = useAppStore();

  const handleLinkClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const navLinks = [
    { href: '/', label: 'Overview', icon: '🏠' },
    { href: '/playground', label: 'Component Studio', icon: '⚡' },
    { href: '/projects', label: 'All 30 Projects', icon: '📦' },
    { href: '/studios', label: 'Creative Studios', icon: '🎨' },
    { href: '/favorites', label: `Favorites (${favorites.length})`, icon: '⭐' },
    { href: '/recent', label: 'Recently Opened', icon: '🕒' },
    { href: '/settings', label: 'Preferences', icon: '⚙️' },
    { href: '/about', label: 'About & Roadmap', icon: '📖' }
  ];

  const categories = [
    { id: 'ui-animation', label: '1. UI & Animation (#1-#5)', range: [1, 5] },
    { id: 'design-tools', label: '2. Design Tools (#6-#10)', range: [6, 10] },
    { id: 'inspiration-hub', label: '3. Inspiration Hub (#11-#15)', range: [11, 15] },
    { id: 'dev-tools', label: '4. Dev Productivity (#16-#20)', range: [16, 20] },
    { id: 'portfolio-apps', label: '5. Advanced Apps (#21-#25)', range: [21, 25] },
    { id: 'creative-plus', label: '6. Creative Plus (#26-#30)', range: [26, 30] }
  ];

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {sidebarOpen && (
        <div
          className="mobile-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`app-sidebar ${sidebarOpen ? 'open' : 'closed'}`}
        aria-label="Application primary sidebar navigation"
      >
      {/* Primary Navigation */}
      <div>
        <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', padding: '0 0.75rem 0.5rem', fontWeight: 700 }}>
          Navigation
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--accent-light)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent'
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 30 Projects Directory Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.75rem 0.5rem' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 700 }}>
            30 Workspaces
          </span>
          <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: '4px', color: 'var(--accent-primary)' }}>
            30/30
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {categories.map((cat) => {
            const catProjects = CANONICAL_PROJECTS.filter(
              (p) => p.num >= cat.range[0] && p.num <= cat.range[1]
            );

            return (
              <div key={cat.id}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', padding: '4px 8px' }}>
                  {cat.label}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginTop: '2px' }}>
                  {catProjects.map((proj) => {
                    const isProjActive = pathname.includes(proj.slug) || pathname.includes(proj.id);
                    return (
                      <Link
                        key={proj.id}
                        href={proj.route}
                        title={proj.title}
                        onClick={handleLinkClick}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '6px 10px',
                          borderRadius: 'var(--radius-sm)',
                          textDecoration: 'none',
                          fontSize: '0.8rem',
                          color: isProjActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                          background: isProjActive ? 'var(--accent-light)' : 'transparent',
                          fontWeight: isProjActive ? 600 : 400
                        }}
                      >
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                          <span style={{ color: 'var(--accent-primary)', marginRight: '6px', fontFamily: 'var(--font-mono)' }}>
                            #{proj.num < 10 ? `0${proj.num}` : proj.num}
                          </span>
                          {proj.title}
                        </span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                          {proj.difficulty[0]}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
    </>
  );
};
