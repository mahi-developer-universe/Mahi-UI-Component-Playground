import React from 'react';
import { FrontendProject } from '@/types';

interface ProjectCardProps {
  project: FrontendProject;
  onLaunch?: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onLaunch }) => {
  return (
    <div className="project-item-card">
      <div className="proj-header">
        <span className="proj-num-badge">#{project.num}</span>
        <span className={`proj-diff-badge diff-${project.difficulty.toLowerCase()}`}>
          {project.difficulty}
        </span>
      </div>
      <h3 className="proj-title">{project.title}</h3>
      <p className="proj-desc">{project.description}</p>
      <div className="proj-features-wrap">
        {project.features.map((f) => (
          <span key={f} className="proj-feature-chip">
            {f}
          </span>
        ))}
      </div>
      <div className="proj-inspiration-meta">
        <strong>Inspired by:</strong> {project.inspiredBy}
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
        {onLaunch ? (
          <button
            className="proj-action-btn"
            style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            onClick={() => onLaunch(project.id)}
          >
            <span className="human-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
              </svg>
            </span>
            <span>Launch Interactive Tool</span>
          </button>
        ) : (
          <a
            href={project.route || `/projects/${project.id}`}
            className="proj-action-btn"
            style={{ flex: 1, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <span className="human-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
              </svg>
            </span>
            <span>Launch Interactive Tool</span>
          </a>
        )}
        <a
          href={project.route || `/projects/${project.id}`}
          className="action-btn"
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '0.8rem',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-main)',
            border: '1px solid var(--border-color)'
          }}
          title="Open Dedicated Page"
        >
          ↗
        </a>
      </div>
    </div>
  );
};
