'use client';

import React from 'react';
import { sanitizeErrorMessage } from '@/lib/errorSecurity';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const safe = sanitizeErrorMessage(error);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        padding: '2rem',
      }}
    >
      <div
        style={{
          maxWidth: '520px',
          width: '100%',
          background: 'var(--card-bg, #090d16)',
          border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
          borderRadius: '16px',
          padding: '36px',
          textAlign: 'center',
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ef4444',
          }}
        >
          <AlertCircle size={28} />
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#fff' }}>
          {safe.title}
        </h2>

        <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
          {safe.userMessage}
        </p>

        <div
          style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '8px',
            padding: '8px 14px',
            fontSize: '11px',
            fontFamily: 'monospace',
            color: '#64748b',
            display: 'flex',
            gap: '12px',
          }}
        >
          <span>REF: {safe.errorId}</span>
          <span>{safe.timestamp.split('T')[0]}</span>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '12px', width: '100%' }}>
          <Link
            href="/"
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: '13px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <Home size={15} /> Back to Overview
          </Link>

          <button
            onClick={() => reset()}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              background: 'var(--primary-color, #10b981)',
              border: 'none',
              color: '#000',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <RotateCcw size={15} /> Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
