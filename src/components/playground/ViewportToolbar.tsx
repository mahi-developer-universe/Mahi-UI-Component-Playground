'use client';

import React from 'react';
import { ViewportSize } from '@/types';

interface ViewportToolbarProps {
  currentViewport: ViewportSize;
  onViewportChange: (viewport: ViewportSize) => void;
  zoom?: number;
  onZoomChange?: (zoom: number) => void;
  onReset?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const ViewportToolbar: React.FC<ViewportToolbarProps> = ({
  currentViewport,
  onViewportChange,
  zoom = 100,
  onZoomChange,
  onReset,
  isFullscreen,
  onToggleFullscreen
}) => {
  return (
    <div
      className="viewport-toolbar"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 14px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '8px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '4px' }}>Viewport:</span>
        <button
          onClick={() => onViewportChange('mobile')}
          style={{
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            fontWeight: currentViewport === 'mobile' ? 600 : 400,
            background: currentViewport === 'mobile' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
            color: currentViewport === 'mobile' ? '#fff' : 'var(--text-secondary)',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          📱 Mobile (375px)
        </button>

        <button
          onClick={() => onViewportChange('tablet')}
          style={{
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            fontWeight: currentViewport === 'tablet' ? 600 : 400,
            background: currentViewport === 'tablet' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
            color: currentViewport === 'tablet' ? '#fff' : 'var(--text-secondary)',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          💻 Tablet (768px)
        </button>

        <button
          onClick={() => onViewportChange('desktop')}
          style={{
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            fontWeight: currentViewport === 'desktop' ? 600 : 400,
            background: currentViewport === 'desktop' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
            color: currentViewport === 'desktop' ? '#fff' : 'var(--text-secondary)',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          🖥️ Desktop (Full)
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {onReset && (
          <button
            onClick={onReset}
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.78rem',
              background: 'transparent',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer'
            }}
          >
            ↺ Reset
          </button>
        )}

        {onToggleFullscreen && (
          <button
            onClick={onToggleFullscreen}
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.78rem',
              background: 'transparent',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer'
            }}
          >
            {isFullscreen ? 'Exit Fullscreen' : '⛶ Fullscreen'}
          </button>
        )}
      </div>
    </div>
  );
};
