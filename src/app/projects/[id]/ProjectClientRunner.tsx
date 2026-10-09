'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

interface ProjectClientRunnerProps {
  renderedHtml: string | null;
  projectId: string;
}

export const ProjectClientRunner: React.FC<ProjectClientRunnerProps> = ({ renderedHtml, projectId }) => {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleContainerClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const button = target.closest('button') as HTMLButtonElement | null;
    if (!button) return;

    const text = button.innerText.trim();

    // If button is a copy action
    if (text.toLowerCase().includes('copy')) {
      const success = await copyToClipboard(button.getAttribute('data-code') || text);
      showToast(success ? `Copied: ${text}` : 'Copied to clipboard');
      return;
    }

    // Default action feedback
    showToast(`Action Triggered: ${text || 'Interactive Control'}`);
  };

  if (!renderedHtml) {
    return null;
  }

  return (
    <>
      {toastMsg && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
          <div className="toast">
            <span className="toast-icon">✓</span>
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      <div
        className="interactive-mount-wrapper"
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
        onClick={handleContainerClick}
      />
    </>
  );
};
