import React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showValueLabel?: boolean;
  variant?: 'primary' | 'success' | 'warning' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  label,
  showValueLabel = true,
  variant = 'primary',
  size = 'md',
  className,
  style,
  ...props
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

  const heightMap = {
    sm: '6px',
    md: '10px',
    lg: '16px'
  };

  const fillStyle: Record<string, string> = {
    primary: 'var(--accent-primary, #2563eb)',
    success: '#10b981',
    warning: '#f59e0b',
    gradient: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%', ...style }} className={className} {...props}>
      {(label || showValueLabel) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {label && (
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {label}
            </span>
          )}
          {showValueLabel && (
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 600 }}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          width: '100%',
          height: heightMap[size],
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
          border: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))'
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percentage}%`,
            background: fillStyle[variant],
            borderRadius: '9999px',
            transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </div>
    </div>
  );
};
