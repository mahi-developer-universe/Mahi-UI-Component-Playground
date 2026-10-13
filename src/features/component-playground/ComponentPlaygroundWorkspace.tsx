'use client';

import React from 'react';
import { InteractiveComponentPlayground } from '@/features/code-playground';

export const ComponentPlaygroundWorkspace: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <InteractiveComponentPlayground />
    </div>
  );
};
