'use client';

import React from 'react';
import { TypographyStudio } from '@/features/typography-studio';

export const TypographyPlaygroundWorkspace: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <TypographyStudio />
    </div>
  );
};
