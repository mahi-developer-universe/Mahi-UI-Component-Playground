'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumbs, BreadcrumbItem } from '@/components/ui/Breadcrumbs';

export const GlobalBreadcrumbs: React.FC = () => {
  const pathname = usePathname();

  // Do not render breadcrumbs on root Home page
  if (!pathname || pathname === '/') {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ];

  let currentPath = '';
  segments.forEach((seg, index) => {
    currentPath += `/${seg}`;
    const isLast = index === segments.length - 1;

    // Format segment label nicely
    let formattedLabel = seg
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    // Clean up project IDs like "01 Component Playground" or "Proj 1"
    if (/^\d{2}\s/.test(formattedLabel)) {
      formattedLabel = `Project #${formattedLabel}`;
    }

    items.push({
      label: formattedLabel,
      href: isLast ? undefined : currentPath,
      isCurrent: isLast
    });
  });

  return (
    <div
      style={{
        padding: '0.85rem 1.75rem',
        borderBottom: '1px solid var(--border-color)',
        background: 'rgba(0, 0, 0, 0.15)',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Breadcrumbs items={items} separator="›" />
    </div>
  );
};
