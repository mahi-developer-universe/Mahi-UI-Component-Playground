'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/clipboard';

interface CodePanelProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodePanel: React.FC<CodePanelProps> = ({ code, language = 'css', title = 'Code Snippet' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      style={{
        background: '#040711',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        marginTop: '1rem'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {title} ({language})
        </span>
        <button
          onClick={handleCopy}
          style={{
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            background: copied ? 'var(--success)' : 'rgba(255,255,255,0.08)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {copied ? '✓ Copied!' : 'Copy Code'}
        </button>
      </div>

      <pre
        style={{
          padding: '1rem',
          margin: 0,
          overflowX: 'auto',
          fontSize: '0.82rem',
          fontFamily: 'var(--font-mono)',
          color: '#e2e8f0',
          lineHeight: 1.5
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};
