'use client';

import React from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '1rem', textAlign: 'center', padding: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--danger)' }}>Application Error Encountered</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', fontSize: '0.9rem' }}>
        {error.message || 'An unexpected rendering error occurred.'}
      </p>
      <button className="btn btn-primary" onClick={() => reset()} style={{ marginTop: '0.5rem' }}>
        Try Again
      </button>
    </div>
  );
}
