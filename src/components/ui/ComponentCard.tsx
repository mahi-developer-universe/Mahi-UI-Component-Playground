import React from 'react';
import { ComponentSuite } from '@/types';

interface ComponentCardProps {
  component: ComponentSuite;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ component }) => {
  return (
    <article className="component-card" id={`card-${component.id}`}>
      <div className="card-header">
        <div className="header-left">
          <span className="card-category-tag">{component.category}</span>
          <h2 className="component-title">{component.title}</h2>
        </div>
      </div>
      <p className="card-description">{component.description}</p>
      <div className="card-tags-row">
        {component.tags.map((t) => (
          <span key={t} className="tag-pill">
            {t}
          </span>
        ))}
      </div>
      <div
        className="preview-viewport"
        dangerouslySetInnerHTML={{ __html: component.previewHtml }}
      />
    </article>
  );
};
