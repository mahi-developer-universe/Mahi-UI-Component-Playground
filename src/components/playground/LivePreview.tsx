'use client';

import React from 'react';
import { ViewportSize } from '@/types';

interface LivePreviewProps {
  children: React.ReactNode;
  viewport?: ViewportSize;
  background?: string;
  minHeight?: string;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  children,
  viewport = 'desktop',
  background = 'var(--bg-card)',
  minHeight = '320px'
}) => {
  const getWidth = () => {
    switch (viewport) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#040711',
        padding: viewport === 'desktop' ? '1rem' : '2rem 1rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        minHeight
      }}
    >
      <div
        style={{
          width: getWidth(),
          maxWidth: '100%',
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          background,
          borderRadius: viewport === 'desktop' ? 'var(--radius-md)' : '16px',
          boxShadow: viewport === 'desktop' ? 'none' : '0 20px 40px rgba(0,0,0,0.6)',
          border: viewport === 'desktop' ? 'none' : '2px solid rgba(255,255,255,0.1)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {children}
      </div>
    </div>
  );
};
