import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

export interface CopyButtonProps {
  textToCopy?: string;
  text?: string;
  label?: string;
  className?: string;
  onCopied?: () => void;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  text,
  label = 'Copy',
  className = '',
  onCopied
}) => {
  const contentToCopy = textToCopy || text || '';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(contentToCopy);
    if (success) {
      setCopied(true);
      if (onCopied) onCopied();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`action-btn ${className}`}
      title={copied ? 'Copied to clipboard!' : 'Copy to clipboard'}
      aria-label="Copy code"
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--success)' }}>
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span style={{ color: 'var(--success)' }}>Copied!</span>
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
