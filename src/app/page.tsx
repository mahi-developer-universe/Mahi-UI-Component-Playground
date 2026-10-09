'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { resourcesData, themePresets } from '@/data';
import { ResourceCard } from '@/components/ui/ResourceCard';
import { useAppStore } from '@/stores/appStore';
import { ThemeName } from '@/types';

export default function HomePage() {
  const { theme, setTheme, favorites, toggleFavorite } = useAppStore();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(48);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
          <a href="#" className="brand-logo" id="brand-logo">
            <div className="logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-title">Mahi <span className="brand-badge">UI</span></span>
              <span className="brand-subtitle">Resource Hub</span>
            </div>
          </a>
          <div className="nav-divider"></div>
          <span className="version-tag">{resourcesData.length} Verified Resources</span>
        </div>

        <div className="nav-center">
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
        </div>
      </header>

      {/* Main Workspace Layout */}
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
                    />
                  ))}
                </div>

                {visibleResources.length < filteredResources.length && (
                  <div style={{ textAlign: 'center', marginTop: '2.5rem', marginBottom: '3rem' }}>
                    <button
                      className="proj-tab-btn active"
                      style={{ padding: '0.75rem 2rem', fontSize: '0.9rem', cursor: 'pointer' }}
                      onClick={() => setDisplayLimit((prev) => prev + 48)}
                    >
                      Load More Resources ({visibleResources.length} of {filteredResources.length})
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
