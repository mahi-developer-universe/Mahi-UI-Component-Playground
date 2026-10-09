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
      {onLaunch && (
        <button
          className="proj-action-btn"
          style={{ marginTop: 'auto' }}
          onClick={() => onLaunch(project.id)}
        >
          Launch Tool Preview
        </button>
      )}
    </div>
  );
};
