'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/stores/appStore';
import { CANONICAL_PROJECTS, getProjectBySlugOrId } from '@/data/projects/canonicalRegistry';

export default function RecentProjectsPage() {
  const { recentProjects } = useAppStore();

  const projects = recentProjects
    .map((slugOrId) => getProjectBySlugOrId(slugOrId))
    .filter(Boolean);

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
          Recently Opened Workspaces
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 }}>
          Quickly jump back into the tools and playgrounds you were recently customizing.
        </p>
      </div>

      {projects.length === 0 ? (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border-color)', color: 'var(--text-muted)' }}>
          <p style={{ margin: '0 0 1.5rem 0' }}>No recent tool history recorded in this browser session.</p>
          <Link
            href="/projects"
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              background: 'var(--accent-primary)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            Browse All 30 Projects →
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {projects.map((p) => p && (
            <div key={p.id} className="project-item-card" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 700 }}>#{p.num}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.difficulty}</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>{p.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 1rem 0', flex: 1 }}>{p.description}</p>
              <Link
                href={p.route}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--accent-primary)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}
              >
                Re-open Workspace →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
