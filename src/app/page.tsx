'use client';

import React, { useState, useMemo } from 'react';
import { componentsData, projectsData, resourcesData, themePresets } from '@/data';
import { ComponentCard } from '@/components/ui/ComponentCard';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ResourceCard } from '@/components/ui/ResourceCard';
import { ThreeLab } from '@/features/three-d-studio/ThreeLab';
import { useAppStore } from '@/stores/appStore';
import { ProjectModal } from '@/features/project-gallery/ProjectModal';
import { FrontendProject, ThemeName } from '@/types';

export default function HomePage() {
  const { theme, setTheme, favorites, toggleFavorite, isThreeLabOpen, setThreeLabOpen } = useAppStore();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [resourceSearch, setResourceSearch] = useState('');
  const [resourceCategory, setResourceCategory] = useState('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<FrontendProject | null>(null);

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

  const filteredComponents = useMemo(() => {
    return componentsData.filter((c) => {
      const matchesCat = categoryFilter === 'all' || c.category === categoryFilter;
      const matchesQuery =
        !searchQuery ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [categoryFilter, searchQuery]);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      return projectFilter === 'all' || p.section === projectFilter;
    });
  }, [projectFilter]);

  const filteredResources = useMemo(() => {
    const q = resourceSearch.toLowerCase().trim();
    return resourcesData
      .filter((r) => {
        const matchesCat = resourceCategory === 'all' || r.category === resourceCategory;
        const matchesQ = !q || r.name.toLowerCase().includes(q) || r.url.toLowerCase().includes(q);
        return matchesCat && matchesQ;
      })
      .slice(0, 72);
  }, [resourceSearch, resourceCategory]);

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
              <span className="brand-subtitle">Modular Next.js Platform</span>
            </div>
          </a>
          <div className="nav-divider"></div>
          <span className="version-tag">v2.0 • Feature Architecture</span>
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
              placeholder="Search components, buttons, tabs, resources... (Ctrl + K)"
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

          <button
            className="action-btn"
            onClick={() => setThreeLabOpen(true)}
            style={{
              background: 'rgba(236, 72, 153, 0.15)',
              color: '#ec4899',
              border: '1px solid rgba(236, 72, 153, 0.3)',
              fontWeight: 700
            }}
          >
            Three.js 3D Lab
          </button>

          <a href="https://github.com/mahi-developer-universe/Mahi-UI-Component-Playground" target="_blank" className="icon-link-btn" title="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="layout-body">
        {/* Sidebar */}
        <aside className="sidebar" id="app-sidebar">
          <div className="sidebar-section">
            <div className="sidebar-heading">COMPONENTS</div>
            <nav className="sidebar-nav" id="sidebar-nav">
              <button
                className={`nav-item ${categoryFilter === 'all' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('all')}
              >
                <span>All Components</span>
                <span className="nav-count">{componentsData.length}</span>
              </button>
              {componentsData.map((c) => (
                <button
                  key={c.id}
                  className={`nav-item ${categoryFilter === c.category ? 'active' : ''}`}
                  onClick={() => setCategoryFilter(c.category)}
                >
                  <span style={{ textTransform: 'capitalize' }}>{c.title}</span>
                </button>
              ))}

              <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.5rem 0' }}></div>
              <a href="#projects-section" className="nav-item" style={{ textDecoration: 'none' }}>
                <span>30 Projects Hub</span>
                <span className="nav-count" style={{ background: 'var(--accent-light)', color: 'var(--accent-primary)', fontWeight: 700 }}>30</span>
              </a>
              <a href="#resources-section" className="nav-item" style={{ textDecoration: 'none' }}>
                <span>450+ Resource Hub</span>
                <span className="nav-count" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--success)', fontWeight: 700 }}>459</span>
              </a>
              <button
                className="nav-item"
                onClick={() => setThreeLabOpen(true)}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
              >
                <span>Three.js 3D Studio</span>
                <span className="nav-count" style={{ background: 'rgba(236, 72, 153, 0.2)', color: '#ec4899', fontWeight: 700 }}>3D</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="main-content" id="main-content">
          {/* Hero Banner */}
          <section className="hero-banner">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>Next.js App Router Architecture</span>
            </div>
            <h1 className="hero-title">
              Mahi UI <span className="gradient-text">Component Playground & 3D Lab</span>
            </h1>
            <p className="hero-desc">
              Explore interactive buttons, cards, badges, tooltips, modals, tabs, dropdowns, and Three.js WebGL spatial scenes. Powered by Next.js, React 19, and TypeScript.
            </p>

            <div className="toolbar-wrapper">
              <div className="category-pills">
                {['all', 'buttons', 'cards', 'badges', 'tooltips', 'modals', 'tabs', 'dropdowns'].map((cat) => (
                  <button
                    key={cat}
                    className={`filter-pill ${categoryFilter === cat ? 'active' : ''}`}
                    onClick={() => setCategoryFilter(cat)}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <span className="result-count-text">
                Showing {filteredComponents.length} component collections
              </span>
            </div>
          </section>

          {/* Component Showcase */}
          <section className="showcase-container" id="showcase-container">
            {filteredComponents.map((comp) => (
              <ComponentCard key={comp.id} component={comp} />
            ))}
          </section>

          {/* 30 Projects Section */}
          <section className="projects-directory-section" id="projects-section">
            <div className="directory-header">
              <span className="directory-tag">Roadmap</span>
              <h2 className="directory-title">
                30 Frontend Developer Projects <span className="gradient-text">Catalog</span>
              </h2>
              <p className="directory-desc">
                Real-world projects inspired by Cult UI, Forge UI, 21st.dev, Magic UI, and Evil Charts.
              </p>
            </div>

            <div className="projects-filter-bar">
              {[
                { id: 'all', label: 'All 30 Projects' },
                { id: 'ui-animation', label: '1. UI & Animations' },
                { id: 'design-tools', label: '2. Creative Tools' },
                { id: 'inspiration-hub', label: '3. Inspiration' },
                { id: 'dev-tools', label: '4. Productivity' },
                { id: 'portfolio-apps', label: '5. Portfolios' },
                { id: 'creative-plus', label: '6. Experiments' }
              ].map((f) => (
                <button
                  key={f.id}
                  className={`proj-tab-btn ${projectFilter === f.id ? 'active' : ''}`}
                  onClick={() => setProjectFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="projects-grid">
              {filteredProjects.map((proj) => (
                <ProjectCard
                  key={proj.id}
                  project={proj}
                  onLaunch={() => {
                    setSelectedProject(proj);
                    showToast(`Opened ${proj.title}`);
                  }}
                />
              ))}
            </div>
          </section>

          {/* 450+ Resource Directory */}
          <section className="resource-directory-section" id="resources-section">
            <div className="directory-header">
              <span className="directory-tag">Resource Catalog</span>
              <h2 className="directory-title">
                450+ Verified Frontend & <span className="gradient-text">Design Resources</span>
              </h2>
              <p className="directory-desc">
                Curated directory of design systems, AI tools, animation libraries, and developer utilities.
              </p>
            </div>

            <div className="resource-search-filter-box">
              <div className="resource-search-input-wrap">
                <input
                  type="text"
                  placeholder="Search 450+ resources by name or URL..."
                  value={resourceSearch}
                  onChange={(e) => setResourceSearch(e.target.value)}
                />
              </div>

              <select
                className="resource-category-select"
                value={resourceCategory}
                onChange={(e) => setResourceCategory(e.target.value)}
              >
                <option value="all">All Categories (450+)</option>
                <option value="Component Libraries & UI Kits">Component Libraries & UI Kits</option>
                <option value="Animation & Visual Effects">Animation & Visual Effects</option>
                <option value="UI/UX Inspiration & Galleries">UI/UX Inspiration & Galleries</option>
                <option value="Design Utilities & Generators">Design Utilities & Generators</option>
                <option value="Developer Productivity & Tools">Developer Productivity & Tools</option>
                <option value="AI & Creative Intelligence">AI & Creative Intelligence</option>
                <option value="Icons & Vector Assets">Icons & Vector Assets</option>
                <option value="Charts & Data Visualization">Charts & Data Visualization</option>
              </select>
            </div>

            <div className="resource-cards-grid">
              {filteredResources.map((res) => (
                <ResourceCard
                  key={res.id}
                  resource={res}
                  isFavorite={favorites.includes(res.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* 3D Lab Modal Dialog */}
      {isThreeLabOpen && (
        <ThreeLab onClose={() => setThreeLabOpen(false)} />
      )}

      {/* Interactive Project Application Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onToast={showToast}
        />
      )}
    </>
  );
}
