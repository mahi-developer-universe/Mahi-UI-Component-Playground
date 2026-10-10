import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = '/'
}) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          fontSize: '0.85rem'
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {item.href && !item.isCurrent ? (
                <a
                  href={item.href}
                  style={{
                    color: 'var(--text-secondary, #94a3b8)',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.15s ease'
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={item.isCurrent || isLast ? 'page' : undefined}
                  style={{
                    color: 'var(--text-primary, #ffffff)',
                    fontWeight: 600
                  }}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span style={{ color: 'var(--border-color, rgba(255, 255, 255, 0.2))' }}>
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
