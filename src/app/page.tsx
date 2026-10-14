'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { resourcesData, projectsData, themePresets } from '@/data';
import { ResourceCard } from '@/components/ui/ResourceCard';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ProjectModal } from '@/features/project-gallery/ProjectModal';
import { InteractiveComponentPlayground } from '@/features/code-playground';
import interactiveRendered from '@/data/projects/interactive-rendered.json';
import { useAppStore } from '@/stores/appStore';
import { ThemeName, FrontendProject } from '@/types';
import { SandboxHub, SandboxModal, SANDBOX_REGISTRY, SandboxItem } from '@/features/sandboxes';

export default function HomePage() {
  const { theme, setTheme, favorites, toggleFavorite } = useAppStore();
  const [activeTab, setActiveTab] = useState<'resources' | 'sandboxes' | 'playground' | 'projects'>('resources');
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(48);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<FrontendProject | null>(null);
  const [activeSandboxProject, setActiveSandboxProject] = useState<FrontendProject | null>(null);
  const [activeSandboxModal, setActiveSandboxModal] = useState<SandboxItem | null>(null);

  // Global Ctrl+K / Cmd+K search focus shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search') as HTMLInputElement | null;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleThemeChange = (newTheme: ThemeName) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setThemeMenuOpen(false);
    showToast(`Switched theme: ${newTheme.toUpperCase()}`);
  };

  // Distinct categories available in resources
  const categories = useMemo(() => {
    const set = new Set<string>();
    resourcesData.forEach((r) => {
      if (r.category) set.add(r.category);
    });
    return Array.from(set).sort();
  }, []);

  // Filtered resources
  const filteredResources = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return resourcesData.filter((r) => {
      const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
      const matchesFavorite = !onlyFavorites || favorites.includes(r.id);
      const matchesQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.url.toLowerCase().includes(q) ||
        (r.category && r.category.toLowerCase().includes(q)) ||
        (r.tag && r.tag.toLowerCase().includes(q));

      return matchesCategory && matchesFavorite && matchesQuery;
    });
  }, [searchQuery, selectedCategory, onlyFavorites, favorites]);

  const visibleResources = useMemo(() => {
    return filteredResources.slice(0, displayLimit);
  }, [filteredResources, displayLimit]);

  const handleToggleFavoriteWithToast = (id: string) => {
    const willBeFavorited = !favorites.includes(id);
    toggleFavorite(id);
    showToast(willBeFavorited ? 'Saved to bookmarks ⭐' : 'Removed from bookmarks');
  };

  return (
    <>
      {/* Toast Notification Container */}
      {toastMessage && (
        <div id="toast-container" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
          <div className="toast">
            <span className="toast-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <header className="navbar" id="app-navbar">
        <div className="nav-left">
          <Link href="/" className="brand-logo" id="brand-logo">
            <div className="logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-title">Mahi <span className="brand-badge">UI</span></span>
              <span className="brand-subtitle">Platform</span>
            </div>
          </Link>

          <div className="nav-divider"></div>

          {/* Primary View Switcher Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => setActiveTab('resources')}
              style={{
                background: activeTab === 'resources' ? 'var(--accent-light)' : 'transparent',
                color: activeTab === 'resources' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                border: 'none',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Resources ({resourcesData.length})
            </button>
            <button
              onClick={() => setActiveTab('sandboxes')}
              style={{
                background: activeTab === 'sandboxes' ? 'var(--accent-light)' : 'transparent',
                color: activeTab === 'sandboxes' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                border: 'none',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.15s ease'
              }}
            >
              <span>Sandboxes</span>
              <span
                style={{
                  fontSize: '0.7rem',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  background: activeTab === 'sandboxes' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.08)',
                  color: activeTab === 'sandboxes' ? '#ffffff' : 'var(--text-muted)'
                }}
              >
                {SANDBOX_REGISTRY.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('playground')}
              style={{
                background: activeTab === 'playground' ? 'var(--accent-light)' : 'transparent',
                color: activeTab === 'playground' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                border: 'none',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Playground ✨
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              style={{
                background: activeTab === 'projects' ? 'var(--accent-light)' : 'transparent',
                color: activeTab === 'projects' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                border: 'none',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Projects ({projectsData.length})
            </button>
            <Link
              href="/studios"
              style={{
                background: 'transparent',
                color: 'var(--text-secondary)',
                border: 'none',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Studios 🎨
            </Link>
          </nav>
        </div>

        <div className="nav-center">
          {activeTab === 'resources' && (
            <div className="search-bar-wrapper">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                id="global-search"
                placeholder="Search by name, category, or URL... (Ctrl + K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <kbd className="shortcut-badge">⌘K</kbd>
            </div>
          )}
        </div>

        <div className="nav-right">
          {/* Theme Selector */}
          <div className="theme-dropdown-container">
            <button
              className="theme-btn"
              id="theme-menu-toggle"
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              aria-label="Toggle theme"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
              </svg>
              <span id="current-theme-label" style={{ textTransform: 'capitalize' }}>{theme}</span>
            </button>

            {themeMenuOpen && (
              <div className="theme-dropdown-menu show" id="theme-menu">
                {themePresets.map((t) => (
                  <button key={t.id} className="theme-option" onClick={() => handleThemeChange(t.id as ThemeName)}>
                    <span className="theme-indicator" style={{ background: t.color }}></span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="https://github.com/mahi-developer-universe/Mahi-UI-Component-Playground"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link-btn"
            title="GitHub Repository"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          {/* User Profile & Team Presence Dropdown */}
          <div className="user-menu-container" id="user-menu-container">
            <button
              className="user-profile-btn"
              id="user-profile-toggle"
              onClick={() => {
                setThemeMenuOpen(false);
                setUserMenuOpen(!userMenuOpen);
              }}
              aria-label="User Account & Team Profile"
            >
              <div className="user-avatar-wrap">
                <span className="user-avatar-initials">MU</span>
                <span className="user-status-indicator online"></span>
              </div>
              <div className="user-info-text">
                <span className="user-name">Mahi Dev</span>
                <span className="user-role">Lead Architect</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {userMenuOpen && (
              <div className="user-dropdown-menu show" id="user-dropdown-menu">
                <div className="user-dropdown-header">
                  <div className="user-avatar-wrap lg">
                    <span className="user-avatar-initials">MU</span>
                    <span className="user-status-indicator online"></span>
                  </div>
                  <div>
                    <div className="user-dropdown-name">Mahi Developer</div>
                    <div className="user-dropdown-email">mahi@developeruniverse.dev</div>
                    <span className="user-tier-badge">Pro Creator • 12,480 Stars</span>
                  </div>
                </div>

                <div className="user-menu-section-title">ACTIVE TEAM MEMBERS (ONLINE)</div>
                <div className="user-team-list">
                  <div className="user-team-item">
                    <span className="team-avatar-mini" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>JD</span>
                    <div className="team-meta">
                      <span className="team-name">Jane Doe</span>
                      <span className="team-status">Designing Bento Grid</span>
                    </div>
                    <span className="user-status-dot online"></span>
                  </div>
                  <div className="user-team-item">
                    <span className="team-avatar-mini" style={{ background: 'linear-gradient(135deg, #ec4899, #f43f5e)' }}>AK</span>
                    <div className="team-meta">
                      <span className="team-name">Alex Kumar</span>
                      <span className="team-status">Editing Three.js Mesh</span>
                    </div>
                    <span className="user-status-dot online"></span>
                  </div>
                  <div className="user-team-item">
                    <span className="team-avatar-mini" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>SL</span>
                    <div className="team-meta">
                      <span className="team-name">Sarah Lin</span>
                      <span className="team-status">Reviewing WCAG AAA</span>
                    </div>
                    <span className="user-status-dot busy"></span>
                  </div>
                </div>

                <div className="user-dropdown-divider"></div>

                <div className="user-menu-actions">
                  <button className="user-menu-action-btn" onClick={() => { setUserMenuOpen(false); showToast('Opened Workspace Profile Settings'); }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <span>Profile Settings</span>
                  </button>
                  <button className="user-menu-action-btn" onClick={() => { setUserMenuOpen(false); showToast('Switched to Developer Universe Team'); }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <span>Team & Collaborators</span>
                  </button>
                  <button className="user-menu-action-btn" onClick={() => { setUserMenuOpen(false); showToast('Exported User Preferences'); }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    <span>Export User Preferences</span>
                  </button>
                  <button className="user-menu-action-btn logout-danger" onClick={() => { setUserMenuOpen(false); showToast('Status set to Offline'); }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    <span>Set Status to Offline</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      {activeTab === 'sandboxes' && (
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <SandboxHub onShowToast={showToast} />
        </div>
      )}

      {activeTab === 'playground' && (
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '2rem' }}>
          <InteractiveComponentPlayground />
        </div>
      )}

      {activeTab === 'projects' && (
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '2rem' }}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 4px 0' }}>30 Developer Projects</h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Complete frontend implementations with full source code and interactive modules.
              </p>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                background: 'var(--accent-light)',
                color: 'var(--accent-primary)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700
              }}
            >
              30 / 30 Available
            </span>
          </div>

          {/* Live Interactive Sandbox Banner & Workspace */}
          {activeSandboxProject && (
            <div
              style={{
                marginBottom: '2rem',
                borderRadius: 'var(--radius-lg, 12px)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                overflow: 'hidden',
                boxShadow: 'var(--glass-shadow)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.5rem',
                  borderBottom: '1px solid var(--border-color)',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--accent-primary)',
                      background: 'rgba(16, 185, 129, 0.15)',
                      padding: '3px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    #{activeSandboxProject.num}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {activeSandboxProject.title} — Active Sandbox
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      background: 'var(--bg-secondary)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    {activeSandboxProject.sectionLabel}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => {
                      const matched = SANDBOX_REGISTRY.find(
                        (s) => s.projectId === activeSandboxProject.id || s.interactiveModule === activeSandboxProject.interactiveModule
                      );
                      if (matched) {
                        setActiveSandboxModal(matched);
                        showToast(`Opened ${matched.title} in Full Screen Modal`);
                      } else {
                        setSelectedProject(activeSandboxProject);
                      }
                    }}
                    style={{
                      padding: '4px 10px',
                      fontSize: '0.75rem',
                      borderRadius: '6px',
                      border: '1px solid var(--accent-primary)',
                      background: 'var(--accent-light)',
                      color: 'var(--accent-primary)',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    ⤢ Full-Screen Modal
                  </button>
                  <button
                    onClick={() => setActiveSandboxProject(null)}
                    style={{
                      padding: '4px 10px',
                      fontSize: '0.75rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      background: 'transparent',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    ✕ Close Sandbox
                  </button>
                </div>
              </div>

              <div
                style={{ padding: '1.5rem' }}
                dangerouslySetInnerHTML={{
                  __html:
                    activeSandboxProject.interactiveModule &&
                    (interactiveRendered as Record<string, string>)[activeSandboxProject.interactiveModule]
                      ? (interactiveRendered as Record<string, string>)[activeSandboxProject.interactiveModule]
                      : `<div style="text-align: center; padding: 2rem; color: var(--text-muted);">Interactive module ready. Click card to open full dialog preview.</div>`
                }}
                onClick={async (e) => {
                  const target = e.target as HTMLElement;
                  const button = target.closest('button') as HTMLButtonElement | null;
                  if (!button) return;
                  const text = button.innerText.trim();
                  if (text.toLowerCase().includes('copy')) {
                    const { copyToClipboard } = await import('@/lib/utils');
                    await copyToClipboard(button.getAttribute('data-code') || text);
                    showToast(`Copied snippet to clipboard 📋`);
                  } else {
                    showToast(`Action Triggered: ${text || 'Interactive Control'}`);
                  }
                }}
              />
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {projectsData.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onLaunch={(id) => {
                  const target = projectsData.find((p) => p.id === id);
                  if (target) {
                    setActiveSandboxProject(target);
                    setSelectedProject(target);
                    showToast(`Launched Sandbox: ${target.title} 🚀`);
                  }
                }}
                onLaunchModal={(proj) => {
                  const matched = SANDBOX_REGISTRY.find(
                    (s) => s.projectId === proj.id || s.interactiveModule === proj.interactiveModule
                  );
                  if (matched) {
                    setActiveSandboxModal(matched);
                    showToast(`Expanded ${matched.title} to Full Screen Modal`);
                  } else {
                    setSelectedProject(proj);
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="layout-body">
          {/* Sidebar Filter for Resource Categories */}
          <aside className="sidebar" id="app-sidebar">
            <div className="sidebar-section">
              <div className="sidebar-heading">CATEGORIES</div>
              <nav className="sidebar-nav" id="sidebar-nav">
                <button
                  className={`nav-item ${selectedCategory === 'all' && !onlyFavorites ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory('all');
                    setOnlyFavorites(false);
                  }}
                >
                  <span>All Resources</span>
                  <span className="nav-count">{resourcesData.length}</span>
                </button>

                <button
                  className={`nav-item ${onlyFavorites ? 'active' : ''}`}
                  onClick={() => setOnlyFavorites(!onlyFavorites)}
                >
                  <span>Bookmarked / Saved</span>
                  <span className="nav-count" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', fontWeight: 700 }}>
                    {favorites.length}
                  </span>
                </button>

                {/* Bookmark JSON Import / Export Actions */}
                <div style={{ display: 'flex', gap: '6px', margin: '4px 0 8px 0', padding: '0 8px' }}>
                  <button
                    onClick={() => {
                      if (favorites.length === 0) {
                        showToast('No bookmarks to export');
                        return;
                      }
                      const jsonStr = JSON.stringify({ version: '1.0', favorites, exportedAt: new Date().toISOString() }, null, 2);
                      const blob = new Blob([jsonStr], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `mahi-bookmarks-${Date.now()}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                      showToast('Bookmarks JSON exported 💾');
                    }}
                    style={{
                      flex: 1,
                      padding: '4px 6px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                    title="Export saved bookmarks as JSON"
                  >
                    Export JSON
                  </button>

                  <label
                    style={{
                      flex: 1,
                      padding: '4px 6px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                    title="Import bookmarks from JSON"
                  >
                    Import
                    <input
                      type="file"
                      accept=".json"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        // Limit file size to 2MB
                        if (file.size > 2 * 1024 * 1024) {
                          showToast('File size exceeds 2MB limit');
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = async (event) => {
                          try {
                            const { sanitizeBookmarkPayload } = await import('@/lib/security');
                            const parsed = JSON.parse(event.target?.result as string);
                            const result = sanitizeBookmarkPayload(parsed);
                            const merged = Array.from(new Set([...favorites, ...result.validIds]));
                            useAppStore.getState().setFavorites(merged);
                            showToast(`Imported ${result.validIds.length} bookmarks ⭐`);
                          } catch (err: any) {
                            showToast(err?.message || 'Failed to parse bookmarks JSON');
                          }
                        };
                        reader.readAsText(file);
                      }}
                    />
                  </label>
                </div>

                <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.5rem 0' }}></div>

                {categories.map((cat) => {
                  const count = resourcesData.filter((r) => r.category === cat).length;
                  return (
                    <button
                      key={cat}
                      className={`nav-item ${selectedCategory === cat && !onlyFavorites ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setOnlyFavorites(false);
                      }}
                    >
                      <span style={{ fontSize: '0.825rem' }}>{cat}</span>
                      <span className="nav-count">{count}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Resource Hub Area */}
          <main className="main-content" id="main-content" style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', padding: '1.75rem 2rem' }}>
            {/* 450+ Resource Directory Grid */}
            <section className="resource-directory-section" id="resources-section" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
              
              {/* Top Toolbar: Filter Bar & Live Counters */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {selectedCategory === 'all' ? 'All Resources' : selectedCategory}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--accent-light)',
                      color: 'var(--accent-primary)',
                      fontWeight: 700
                    }}
                  >
                    {filteredResources.length} items
                  </span>
                </div>

                {/* Category Quick Pills */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    className={`filter-pill ${selectedCategory === 'all' && !onlyFavorites ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory('all');
                      setOnlyFavorites(false);
                    }}
                    style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                  >
                    All ({resourcesData.length})
                  </button>
                  <button
                    className={`filter-pill ${onlyFavorites ? 'active' : ''}`}
                    onClick={() => setOnlyFavorites(!onlyFavorites)}
                    style={{ fontSize: '0.78rem', padding: '4px 10px', color: onlyFavorites ? '#fff' : '#f59e0b' }}
                  >
                    ★ Saved ({favorites.length})
                  </button>
                </div>
              </div>

              {/* Search & Category Filter Box */}
              <div className="resource-search-filter-box" style={{ marginTop: 0 }}>
                <div className="resource-search-input-wrap">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input
                    type="text"
                    placeholder="Filter resources by name, category, or URL..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px 6px', fontSize: '0.8rem' }}
                      title="Clear filter"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <select
                  className="resource-category-select"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setOnlyFavorites(false);
                  }}
                >
                  <option value="all">All Categories ({resourcesData.length})</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat} ({resourcesData.filter((r) => r.category === cat).length})
                    </option>
                  ))}
                </select>

                <button
                  className={`filter-pill ${onlyFavorites ? 'active' : ''}`}
                  onClick={() => setOnlyFavorites(!onlyFavorites)}
                  style={{ height: '38px', borderRadius: 'var(--radius-md)' }}
                >
                  ★ Bookmarks ({favorites.length})
                </button>
              </div>

              {/* Cards Grid or Empty State */}
              {filteredResources.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-muted)'
                  }}
                >
                  <p style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>No resources found</p>
                  <p style={{ fontSize: '0.9rem' }}>Try clearing the search query or switching categories.</p>
                  <button
                    className="filter-pill active"
                    style={{ marginTop: '1rem' }}
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setOnlyFavorites(false);
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="resource-cards-grid">
                    {visibleResources.map((res) => (
                      <ResourceCard
                        key={res.id}
                        resource={res}
                        isFavorite={favorites.includes(res.id)}
                        onToggleFavorite={handleToggleFavoriteWithToast}
                        onLaunchSandbox={(resource) => {
                          const cat = resource.category.toLowerCase();
                          let targetSandbox: SandboxItem | undefined;
                          if (cat.includes('animation') || cat.includes('fx')) {
                            targetSandbox = SANDBOX_REGISTRY.find((s) => s.id === 'studio-motion');
                          } else if (cat.includes('color') || cat.includes('palette') || cat.includes('contrast')) {
                            targetSandbox = SANDBOX_REGISTRY.find((s) => s.id === 'studio-colors');
                          } else if (cat.includes('icon')) {
                            targetSandbox = SANDBOX_REGISTRY.find((s) => s.id === 'studio-icons');
                          } else if (cat.includes('background') || cat.includes('pattern') || cat.includes('gradient')) {
                            targetSandbox = SANDBOX_REGISTRY.find((s) => s.id === 'studio-backgrounds');
                          } else if (cat.includes('chart') || cat.includes('data')) {
                            targetSandbox = SANDBOX_REGISTRY.find((s) => s.id === 'studio-charts');
                          } else if (cat.includes('theme') || cat.includes('design system')) {
                            targetSandbox = SANDBOX_REGISTRY.find((s) => s.id === 'studio-themes');
                          } else {
                            targetSandbox = SANDBOX_REGISTRY[0];
                          }

                          if (targetSandbox) {
                            setActiveSandboxModal(targetSandbox);
                            showToast(`Launched Sandbox: ${targetSandbox.title} 🚀`);
                          }
                        }}
                      />
                    ))}
                  </div>

                  {visibleResources.length < filteredResources.length && (
                    <div style={{ textAlign: 'center', marginTop: '2.5rem', marginBottom: '3rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button
                        className="proj-tab-btn active"
                        style={{ padding: '0.75rem 2rem', fontSize: '0.9rem', cursor: 'pointer' }}
                        onClick={() => setDisplayLimit((prev) => prev + 48)}
                      >
                        Load More Resources ({visibleResources.length} of {filteredResources.length})
                      </button>
                      <button
                        className="proj-tab-btn"
                        style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', cursor: 'pointer' }}
                        onClick={() => setDisplayLimit(filteredResources.length)}
                      >
                        Show All ({filteredResources.length})
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          </main>
        </div>
      )}

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onToast={showToast}
        />
      )}

      {activeSandboxModal && (
        <SandboxModal
          sandbox={activeSandboxModal}
          onClose={() => setActiveSandboxModal(null)}
          onToast={showToast}
        />
      )}
    </>
  );
}
