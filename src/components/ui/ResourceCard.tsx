import React from 'react';
import { ResourceItem } from '@/types';

interface ResourceCardProps {
  resource: ResourceItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  isFavorite,
  onToggleFavorite
}) => {
  // Extract clean domain for display
  const domain = resource.url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');

  return (
    <div className="resource-card">
      <div className="resource-header-row">
        <span className="resource-tag-pill">{resource.tag || 'Resource'}</span>
        <button
          className={`resource-fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(resource.id)}
          title={isFavorite ? 'Remove from bookmarks' : 'Add to bookmarks'}
          aria-label={isFavorite ? 'Remove bookmark' : 'Add bookmark'}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </button>
      </div>

      <h4 className="resource-name" title={resource.name}>{resource.name}</h4>
      <div className="resource-category-label">{resource.category}</div>
      <div className="resource-url-display" title={resource.url}>{domain}</div>

      <div className="resource-footer-row">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="resource-visit-btn"
        >
          <span>Visit Resource</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    </div>
  );
};
