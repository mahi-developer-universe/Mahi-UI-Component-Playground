'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { CANONICAL_PROJECTS } from '@/data/projects/canonicalRegistry';
import { ProjectCategory, Difficulty } from '@/types';

export default function ProjectsDirectoryPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'ui-animation', label: 'UI & Animation' },
    { id: 'design-tools', label: 'Design Tools' },
    { id: 'inspiration-hub', label: 'Inspiration Hub' },
    { id: 'dev-tools', label: 'Developer Tools' },
    { id: 'portfolio-apps', label: 'Portfolio Apps' },
    { id: 'creative-plus', label: 'Creative Plus' }
  ];

  const filteredProjects = useMemo(() => {
    return CANONICAL_PROJECTS.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'all' || p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));

      return matchCat && matchDiff && matchSearch;
    });
  }, [search, selectedCategory, selectedDifficulty]);

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Directory Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-primary)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          <span>⚡ 30 Interactive Workspaces</span>
        </div>
        <h1 style={{ fontSize: '2.6rem', fontWeight: 800, margin: '0 0 0.75rem 0', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          Projects Directory & Tools Catalog
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '750px', lineHeight: 1.6, margin: 0 }}>
          Explore all 30 production-ready frontend developer tools, generators, and design systems. Every project runs as an interactive workspace on this website.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          padding: '1rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', flex: 1 }}>
          <input
            type="text"
            placeholder="Search all 30 projects by name, tag, or feature..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              minWidth: '280px',
              flex: 1
            }}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredProjects.length}</strong> of <strong>30</strong> tools
        </div>
      </div>

      {/* Projects Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="project-item-card"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--glass-shadow)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', background: 'var(--accent-light)', padding: '2px 8px', borderRadius: '4px' }}>
                #{p.num < 10 ? `0${p.num}` : p.num}
              </span>
              <span className={`proj-diff-badge diff-${p.difficulty.toLowerCase()}`}>
                {p.difficulty}
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
              {p.title}
            </h3>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 1rem 0', flex: 1 }}>
              {p.description}
            </p>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {p.features.slice(0, 3).map((f) => (
                <span key={f} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: '4px', color: 'var(--text-muted)' }}>
                  ✓ {f}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Exports: {p.exportFormats.slice(0, 2).join(', ').toUpperCase()}
              </span>

              <Link
                href={p.route}
                className="proj-action-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--accent-primary)',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}
              >
                Launch Tool →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
