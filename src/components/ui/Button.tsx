import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'shimmer';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}) => {
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    gradient: 'btn-gradient',
    shimmer: 'btn-shimmer'
  }[variant];

  const sizeStyle: Record<string, React.CSSProperties> = {
    sm: { padding: '0.35rem 0.75rem', fontSize: '0.8rem' },
    md: { padding: '0.6rem 1.25rem', fontSize: '0.875rem' },
    lg: { padding: '0.8rem 1.75rem', fontSize: '1rem' }
  };

  return (
    <button
      className={cn('btn', variantClass, className)}
      style={sizeStyle[size]}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg
            className="animate-spin"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{ animation: 'spin 1s linear infinite' }}
          >
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
