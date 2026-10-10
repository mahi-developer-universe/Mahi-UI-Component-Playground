'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Tooltip } from '@/components/ui/Tooltip';
import { Modal } from '@/components/ui/Modal';
import { Tabs } from '@/components/ui/Tabs';
import { Dropdown } from '@/components/ui/Dropdown';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { Alert } from '@/components/ui/Alert';
import { Skeleton } from '@/components/ui/Skeleton';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { EmptyState } from '@/components/ui/EmptyState';

interface ComponentPreviewCanvasProps {
  componentId: string;
  propValues: Record<string, any>;
  viewport: 'desktop' | 'tablet' | 'mobile';
}

export const ComponentPreviewCanvas: React.FC<ComponentPreviewCanvasProps> = ({
  componentId,
  propValues,
  viewport
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const widthStyle: Record<string, string> = {
    desktop: '100%',
    tablet: '720px',
    mobile: '380px'
  };

  const renderActivePreview = () => {
    switch (componentId) {
      case 'buttons':
        return (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant={propValues.variant || 'primary'}
              size={propValues.size || 'md'}
              isLoading={Boolean(propValues.isLoading)}
              disabled={Boolean(propValues.disabled)}
              onClick={() => alert(`Clicked: ${propValues.label}`)}
            >
              {propValues.label || 'Action Button'}
            </Button>
          </div>
        );

      case 'badges':
        return (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Badge variant={propValues.variant || 'primary'}>
              {propValues.label || 'Status Badge'}
            </Badge>
          </div>
        );

      case 'cards':
        return (
          <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}>
            <Card variant={propValues.variant || 'bento'}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                {propValues.title || 'Card Headline'}
              </h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {propValues.description || 'Card descriptive text explaining the purpose of the feature or project.'}
              </p>
            </Card>
          </div>
        );

      case 'tooltips':
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 0' }}>
            <Tooltip
              content={propValues.content || 'Tooltip annotation'}
              position={propValues.position || 'top'}
            >
              <Button variant="secondary">Hover Or Focus Me</Button>
            </Tooltip>
          </div>
        );

      case 'modals':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <Button variant="primary" onClick={() => setModalOpen(true)}>
              Trigger Demo Dialog
            </Button>
            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              title={propValues.title || 'Action Confirmation'}
            >
              <p style={{ margin: '0 0 1.25rem 0' }}>
                {propValues.content || 'Are you sure you want to proceed with this operation?'}
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <Button variant="ghost" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => { setModalOpen(false); alert('Confirmed!'); }}>
                  Confirm
                </Button>
              </div>
            </Modal>
          </div>
        );

      case 'tabs':
        return (
          <div style={{ width: '100%', maxWidth: '460px', margin: '0 auto' }}>
            <Tabs
              defaultTab={propValues.defaultTab || 'overview'}
              items={[
                { id: 'overview', label: 'Overview', content: <p style={{ margin: 0 }}>System health optimal with 12ms edge response.</p> },
                { id: 'analytics', label: 'Analytics', content: <p style={{ margin: 0 }}>12,480 Active designers and developers online.</p> },
                { id: 'settings', label: 'Settings', content: <p style={{ margin: 0 }}>Authentication tokens & security preferences.</p> }
              ]}
            />
          </div>
        );

      case 'dropdowns':
        return (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
            <Dropdown
              label={propValues.label || 'Member Actions'}
              items={[
                { id: 'profile', label: 'View Profile', onClick: () => alert('View Profile') },
                { id: 'invite', label: 'Invite Teammate', onClick: () => alert('Invite Teammate') },
                { id: 'remove', label: 'Remove Member', onClick: () => alert('Removed'), isDanger: true }
              ]}
            />
          </div>
        );

      case 'inputs':
        return (
          <div style={{ width: '100%', maxWidth: '360px', margin: '0 auto' }}>
            <Input
              label={propValues.label || 'Email'}
              placeholder={propValues.placeholder || 'name@domain.com'}
              hint={propValues.hint}
              error={propValues.error}
              disabled={Boolean(propValues.disabled)}
            />
          </div>
        );

      case 'switches':
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Switch
              label={propValues.label || 'Toggle Setting'}
              checked={Boolean(propValues.checked)}
              onChange={() => {}}
              disabled={Boolean(propValues.disabled)}
            />
          </div>
        );

      case 'alerts':
        return (
          <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}>
            <Alert
              variant={propValues.variant || 'info'}
              title={propValues.title || 'System Notification'}
              onClose={() => alert('Dismissed')}
            >
              {propValues.message || 'Important operational message or update notice.'}
            </Alert>
          </div>
        );

      case 'skeletons':
        return (
          <div style={{ width: '100%', maxWidth: '380px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Skeleton
              variant={propValues.variant || 'rectangular'}
              width={propValues.width || '100%'}
              height={propValues.height || '64px'}
              borderRadius="12px"
            />
            <Skeleton width="70%" height="20px" />
            <Skeleton width="45%" height="16px" />
          </div>
        );

      case 'breadcrumbs':
        return (
          <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)' }}>
            <Breadcrumbs
              separator={propValues.separator || '/'}
              items={[
                { label: 'Ecosystem', href: '/' },
                { label: 'Studios', href: '/studios' },
                { label: 'Component Workbench', isCurrent: true }
              ]}
            />
          </div>
        );

      case 'empty_states':
        return (
          <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}>
            <EmptyState
              title={propValues.title || 'No Bookmarks Found'}
              description={propValues.description || 'Try selecting a different filter category or import your saved JSON bookmarks collection.'}
              action={<Button variant="primary" size="sm">Browse Directory</Button>}
            />
          </div>
        );

      default:
        return <div>Select a component to preview</div>;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2.5rem 1.5rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        minHeight: '260px',
        width: '100%',
        overflowX: 'auto',
        transition: 'all 0.25s ease'
      }}
    >
      <div
        style={{
          width: widthStyle[viewport],
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {renderActivePreview()}
      </div>
    </div>
  );
};
