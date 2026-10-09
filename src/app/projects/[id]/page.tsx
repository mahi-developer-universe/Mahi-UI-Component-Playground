import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projectsData } from '@/data';
import interactiveRendered from '@/data/projects/interactive-rendered.json';
import { ProjectClientRunner } from './ProjectClientRunner';

export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const renderedHtml = project.interactiveModule
    ? (interactiveRendered as Record<string, string>)[project.interactiveModule]
    : null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-main)', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Back Link & Navigation */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--accent-primary)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}
          >
            ← Back to Mahi UI Hub
          </Link>
          <span
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono, monospace)',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '4px 10px',
              borderRadius: '6px'
            }}
          >
            Route: /projects/{project.id}
          </span>
        </div>

        {/* Project Header Banner */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl, 16px)',
            padding: '2.5rem',
            marginBottom: '2rem',
            boxShadow: 'var(--glass-shadow)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span
              style={{
                background: 'rgba(16, 185, 129, 0.2)',
                color: 'var(--accent-primary)',
                fontFamily: 'var(--font-mono, monospace)',
                fontWeight: 700,
                fontSize: '0.9rem',
                padding: '4px 12px',
                borderRadius: '8px'
              }}
            >
              Project #{project.num}
            </span>
            <span
              style={{
                fontSize: '0.85rem',
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'var(--text-secondary)'
              }}
            >
              {project.difficulty}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Category: {project.sectionLabel}
            </span>
          </div>

          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--text-main)' }}>
            {project.title}
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '850px', margin: '0 0 1.5rem 0' }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {project.features.map((feat) => (
              <span
                key={feat}
                style={{
                  fontSize: '0.8rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  color: 'var(--text-muted)'
                }}
              >
                ✓ {feat}
              </span>
            ))}
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <strong>Inspiration:</strong> {project.inspiredBy}
          </div>
        </div>

        {/* Live Interactive Workspace */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl, 16px)',
            padding: '2.5rem',
            boxShadow: 'var(--glass-shadow)',
            minHeight: '400px'
          }}
        >
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>
              Live Application Workspace
            </h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--success, #10b981)' }}>
              ● Verified Functional Implementation
            </span>
          </div>

          {renderedHtml ? (
            <ProjectClientRunner renderedHtml={renderedHtml} projectId={project.id} />
          ) : (
            <div
              style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '12px',
                border: '1px dashed var(--border-color)'
              }}
            >
              <h3 style={{ margin: '0 0 0.75rem 0' }}>Mahi UI Component Playground Suite</h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
                This is the foundational suite (#1) providing 7 interactive component collections with resizable viewports, code copying, and 5 dynamic themes.
              </p>
              <Link
                href="/#showcase-container"
                style={{
                  display: 'inline-block',
                  background: 'var(--accent-primary)',
                  color: '#fff',
                  padding: '8px 20px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                Explore Components Showcase
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
