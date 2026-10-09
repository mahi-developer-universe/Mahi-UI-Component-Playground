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
  return (
    <div className="resource-card">
      <div className="resource-header-row">
        <span className="resource-tag-pill">{resource.tag}</span>
        <button
          className={`resource-fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(resource.id)}
          title="Bookmark"
        >
          ★
        </button>
      </div>
      <h4 className="resource-name">{resource.name}</h4>
      <div className="resource-url-display">{resource.url}</div>
      <div className="resource-footer-row">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="resource-visit-btn"
        >
          Visit Website →
        </a>
      </div>
    </div>
  );
};
