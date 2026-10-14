import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CANONICAL_PROJECTS, getProjectBySlugOrId } from '@/data/projects/canonicalRegistry';
import interactiveRendered from '@/data/projects/interactive-rendered.json';
import { ProjectClientRunner } from './ProjectClientRunner';

import type { Metadata } from 'next';

export function generateStaticParams() {
  const params: { id: string }[] = [];
  CANONICAL_PROJECTS.forEach((project) => {
    params.push({ id: project.slug });
    params.push({ id: project.id });
  });
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectBySlugOrId(id);
  if (!project) {
    return {
      title: 'Project Not Found | Mahi UI'
    };
  }
  const projectName = project.name || project.title || 'Project';
  return {
    title: `${projectName} | Mahi UI Component Playground`,
    description: project.description || '',
    keywords: [projectName, project.category || 'Tools', 'frontend playground', 'interactive tools']
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectBySlugOrId(id);

  if (!project) {
    notFound();
  }

  // Find legacy interactive module key if mapped
  const legacyMap: Record<string, string> = {
    'proj-2': 'button-gallery',
    'proj-3': 'motion-lab',
    'proj-4': 'loader-lab',
    'proj-5': 'chart-playground',
    'proj-6': 'gradient-studio',
    'proj-7': 'pattern-studio',
    'proj-8': 'dither-studio',
    'proj-9': 'typography-lab',
    'proj-10': 'logo-maker',
    'proj-11': 'inspiration-hub',
    'proj-12': 'hero-gallery',
    'proj-13': 'navbar-playground',
    'proj-14': 'cta-footer-gallery',
    'proj-15': 'bookmark-manager',
    'proj-16': 'icon-explorer',
    'proj-17': 'og-generator',
    'proj-18': 'css-generator',
    'proj-19': 'a11y-checker',
    'proj-20': 'registry-explorer',
    'proj-21': 'saas-dashboard',
    'proj-22': 'workflow-builder',
    'proj-23': 'prompt-playground',
    'proj-24': 'kanban-workspace',
    'proj-25': 'developer-portfolio',
    'proj-26': 'device-previewer',
    'proj-27': 'tokens-generator',
    'proj-28': 'screenshot-gallery',
    'proj-29': 'pricing-builder',
    'proj-30': 'snippet-library'
  };

  const moduleKey = legacyMap[project.id];
  const renderedHtml = moduleKey ? (interactiveRendered as Record<string, string>)[moduleKey] : null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-main)', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Back Link & Breadcrumbs */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
            <Link
              href="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--accent-primary)',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              ← All 30 Projects
            </Link>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-secondary)' }}>{project.title}</span>
          </div>

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
            Route: {project.route}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
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
              Project #{project.num < 10 ? `0${project.num}` : project.num}
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
              Category: {project.categoryLabel}
            </span>
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            {project.title}
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '900px', margin: '0 0 1.5rem 0' }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {project.features.map((feat) => (
              <span
                key={feat}
                style={{
                  fontSize: '0.82rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  color: 'var(--text-muted)'
                }}
              >
                ✓ {feat}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <div>
              <strong>Inspiration:</strong> {project.inspiredBy}
            </div>
            <div>
              <strong>Export formats:</strong> {project.exportFormats.join(', ').toUpperCase()}
            </div>
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
            minHeight: '450px'
          }}
        >
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
              Live Workspace Engine
            </h2>
            <span style={{ fontSize: '0.82rem', color: 'var(--success, #10b981)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
              Verified Functional Tool
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
              <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.4rem' }}>{project.title}</h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
                Full interactive workspace available. Test components, customize theme tokens, adjust viewport constraints, and export production code.
              </p>
              <Link
                href="/playground"
                style={{
                  display: 'inline-block',
                  background: 'var(--accent-primary)',
                  color: '#fff',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                Launch Component Studio →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
