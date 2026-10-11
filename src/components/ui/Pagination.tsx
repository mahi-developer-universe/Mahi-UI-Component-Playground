import React from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  const buttonStyle: React.CSSProperties = {
    minWidth: '32px',
    height: '32px',
    padding: '0 8px',
    borderRadius: 'var(--radius-sm, 6px)',
    border: '1px solid var(--border-color, rgba(255, 255, 255, 0.12))',
    background: 'rgba(255, 255, 255, 0.04)',
    color: 'var(--text-secondary, #94a3b8)',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease'
  };

  return (
    <nav aria-label="Pagination" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <button
        style={{
          ...buttonStyle,
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage === 1 ? 0.4 : 1
        }}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((p, idx) => {
        if (p === '...') {
          return (
            <span key={`ellipsis-${idx}`} style={{ color: 'var(--text-muted)', padding: '0 4px', fontSize: '0.85rem' }}>
              …
            </span>
          );
        }

        const isCurrent = p === currentPage;
        return (
          <button
            key={`page-${p}`}
            onClick={() => onPageChange(p as number)}
            aria-current={isCurrent ? 'page' : undefined}
            style={{
              ...buttonStyle,
              background: isCurrent ? 'var(--accent-primary, #2563eb)' : 'rgba(255, 255, 255, 0.04)',
              color: isCurrent ? '#ffffff' : 'var(--text-secondary, #94a3b8)',
              borderColor: isCurrent ? 'var(--accent-primary, #2563eb)' : 'var(--border-color, rgba(255, 255, 255, 0.12))'
            }}
          >
            {p}
          </button>
        );
      })}

      <button
        style={{
          ...buttonStyle,
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage === totalPages ? 0.4 : 1
        }}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
};
