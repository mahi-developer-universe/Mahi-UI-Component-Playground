import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback = 'UI',
  size = 'md',
  status,
  style,
  ...props
}) => {
  const [hasError, setHasError] = React.useState(!src);

  const sizePx = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64
  }[size];

  const statusColor = {
    online: '#10b981',
    offline: '#64748b',
    busy: '#ef4444',
    away: '#f59e0b'
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${sizePx}px`,
        height: `${sizePx}px`,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid var(--border-color, rgba(255, 255, 255, 0.15))',
        color: 'var(--text-primary, #ffffff)',
        fontWeight: 700,
        fontSize: size === 'sm' ? '0.75rem' : size === 'lg' ? '1.1rem' : size === 'xl' ? '1.35rem' : '0.9rem',
        overflow: 'hidden',
        userSelect: 'none',
        ...style
      }}
      {...props}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <span>{fallback.slice(0, 2).toUpperCase()}</span>
      )}

      {status && (
        <span
          style={{
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            width: size === 'sm' ? '8px' : '10px',
            height: size === 'sm' ? '8px' : '10px',
            borderRadius: '50%',
            background: statusColor[status],
            border: '2px solid var(--bg-card, #0f172a)'
          }}
          title={`Status: ${status}`}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};
