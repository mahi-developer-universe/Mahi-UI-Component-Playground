'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/stores/appStore';

export const MobileNavigation: React.FC = () => {
  const pathname = usePathname();
  const { favorites } = useAppStore();

  const items = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/playground', label: 'Studio', icon: '⚡' },
    { href: '/projects', label: 'Projects', icon: '📦' },
    { href: '/studios', label: 'Labs', icon: '🎨' },
    { href: '/favorites', label: `Saved (${favorites.length})`, icon: '⭐' },
    { href: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <nav
      className="mobile-bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 90
      }}
      aria-label="Mobile navigation bar"
    >
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              textDecoration: 'none',
              fontSize: '0.72rem',
              color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: isActive ? 600 : 500,
              padding: '6px'
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
