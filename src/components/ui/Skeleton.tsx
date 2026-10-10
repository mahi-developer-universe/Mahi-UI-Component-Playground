import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  variant?: 'text' | 'rectangular' | 'circular';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '20px',
  borderRadius = 'var(--radius-sm, 6px)',
  variant = 'rectangular',
  style,
  ...props
}) => {
  const isCircle = variant === 'circular';

  return (
    <div
      aria-hidden="true"
      style={{
        width,
        height: isCircle ? width : height,
        borderRadius: isCircle ? '50%' : borderRadius,
        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.04) 25%, rgba(255, 255, 255, 0.08) 37%, rgba(255, 255, 255, 0.04) 63%)',
        backgroundSize: '400% 100%',
        animation: 'skeletonPulse 1.4s ease infinite',
        ...style
      }}
      {...props}
    />
  );
};
