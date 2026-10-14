'use client';

import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { MobileNavigation } from './MobileNavigation';
import { CommandPalette } from '../search/CommandPalette';
import { CookieBanner } from '../shared/CookieBanner';
import { BackToTopButton } from '../shared/BackToTopButton';
import { ShortcutsModal } from '../shared/ShortcutsModal';
import { useAppStore } from '@/stores/appStore';

import { GlobalBreadcrumbs } from './GlobalBreadcrumbs';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { theme, commandPaletteOpen, setCommandPaletteOpen } = useAppStore();
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.setAttribute('data-theme', theme);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      } else if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setShortcutsModalOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setShortcutsModalOpen(false);
        setCommandPaletteOpen(false);
      }
    };

    const handleOpenShortcuts = () => setShortcutsModalOpen(true);
    window.addEventListener('open-shortcuts-modal', handleOpenShortcuts);
    window.addEventListener('keydown', handleKeyDown);

    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      useAppStore.getState().setSidebarOpen(false);
    }

    const handleResize = () => {
      if (window.innerWidth < 768) {
        useAppStore.getState().setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-shortcuts-modal', handleOpenShortcuts);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme, setCommandPaletteOpen]);

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* WCAG 2.1 AAA Accessible Skip to Content Link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Sticky Top Header */}
      <Header onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 68px)' }}>
        <Sidebar />
        <main
          id="main-content"
          tabIndex={-1}
          style={{
            flex: 1,
            minWidth: 0,
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            paddingBottom: '4rem',
            outline: 'none'
          }}
        >
          <GlobalBreadcrumbs />
          {children}
        </main>
      </div>

      <Footer />
      <MobileNavigation />
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
      <ShortcutsModal isOpen={shortcutsModalOpen} onClose={() => setShortcutsModalOpen(false)} />
      <CookieBanner />
      <BackToTopButton />
    </div>
  );
};

