import { ComponentRegistryItem } from '@/types/registry';

export const COMPONENT_REGISTRY: ComponentRegistryItem[] = [
  {
    id: 'buttons',
    title: 'Interactive Buttons',
    category: 'actions',
    description: 'Polished interactive buttons with customizable variants, states, micro-press dynamics, and loader indicators.',
    tags: ['Button', 'Interactive', 'Action', 'Micro-interaction'],
    props: [
      {
        name: 'label',
        label: 'Button Label',
        type: 'string',
        defaultValue: 'Interactive Button',
        description: 'Text rendered inside the button'
      },
      {
        name: 'variant',
        label: 'Style Variant',
        type: 'select',
        defaultValue: 'primary',
        options: ['primary', 'secondary', 'outline', 'ghost', 'gradient', 'shimmer'],
        description: 'Visual treatment of the button'
      },
      {
        name: 'size',
        label: 'Size',
        type: 'select',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        description: 'Padding and font scale of the button'
      },
      {
        name: 'isLoading',
        label: 'Loading State',
        type: 'boolean',
        defaultValue: false,
        description: 'Whether to show the animated loading spinner'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        description: 'Disables user interactions and applies muted styling'
      }
    ],
    previewComponent: 'ButtonPreview',
    codeTemplates: {
      react: `import React from 'react';
import { Button } from '@/components/ui/Button';

export const CustomButton = () => {
  return (
    <Button
      variant="{{variant}}"
      size="{{size}}"
      isLoading={ {{isLoading}} }
      disabled={ {{disabled}} }
    >
      {{label}}
    </Button>
  );
};`,
      html: `<!-- Mahi UI Button -->
<button class="btn btn-{{variant}} size-{{size}}" {{#if disabled}}disabled{{/if}}>
  {{label}}
</button>`,
      tailwind: `<button className="px-5 py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md">
  {{label}}
</button>`
    },
    accessibility: {
      role: 'button',
      keyboardNavigation: 'Focusable via Tab; triggers on Space and Enter.',
      wcagNotes: 'Maintains minimum 4.5:1 text-to-background contrast.'
    }
  },
  {
    id: 'badges',
    title: 'Badges & Status Chips',
    category: 'feedback',
    description: 'Contextual notification chips, verification markers, and real-time status pulses.',
    tags: ['Badge', 'Chip', 'Status', 'Feedback'],
    props: [
      {
        name: 'label',
        label: 'Badge Text',
        type: 'string',
        defaultValue: 'Verified Status',
        description: 'Text displayed inside the badge'
      },
      {
        name: 'variant',
        label: 'Variant',
        type: 'select',
        defaultValue: 'primary',
        options: ['default', 'primary', 'success', 'warning', 'danger', 'pulse'],
        description: 'Color theme and pulse animation'
      }
    ],
    previewComponent: 'BadgePreview',
    codeTemplates: {
      react: `import React from 'react';
import { Badge } from '@/components/ui/Badge';

export const StatusIndicator = () => {
  return (
    <Badge variant="{{variant}}">
      {{label}}
    </Badge>
  );
};`,
      html: `<!-- Mahi UI Badge -->
<span class="badge badge-{{variant}}">
  {{label}}
</span>`,
      tailwind: `<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
  {{label}}
</span>`
    },
    accessibility: {
      role: 'status',
      wcagNotes: 'Communicates status with text labels, not color alone.'
    }
  },
  {
    id: 'cards',
    title: 'Cards & Bento Grid Layouts',
    category: 'layout',
    description: 'Versatile Bento-box feature cards, realtime metrics dashboards, and human team profiles.',
    tags: ['Card', 'Bento', 'Layout', 'Glassmorphism'],
    props: [
      {
        name: 'title',
        label: 'Card Title',
        type: 'string',
        defaultValue: 'Handcrafted by Engineers',
        description: 'Headline text of the card'
      },
      {
        name: 'description',
        label: 'Card Content',
        type: 'string',
        defaultValue: 'Every single line of layout code, animation timing curve, and token is authored with human attention to detail.',
        description: 'Description paragraph text'
      },
      {
        name: 'variant',
        label: 'Card Variant',
        type: 'select',
        defaultValue: 'bento',
        options: ['default', 'bento', 'glass', 'interactive'],
        description: 'Visual framing style of the card'
      }
    ],
    previewComponent: 'CardPreview',
    codeTemplates: {
      react: `import React from 'react';
import { Card } from '@/components/ui/Card';

export const FeatureCard = () => {
  return (
    <Card variant="{{variant}}">
      <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>{{title}}</h4>
      <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{{description}}</p>
    </Card>
  );
};`,
      html: `<div class="card card-{{variant}}">
  <h4>{{title}}</h4>
  <p>{{description}}</p>
</div>`,
      tailwind: `<div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
  <h4 className="text-lg font-bold text-white mb-2">{{title}}</h4>
  <p className="text-sm text-slate-400">{{description}}</p>
</div>`
    },
    accessibility: {
      role: 'region',
      wcagNotes: 'Semantic headings ensure clear document outline.'
    }
  },
  {
    id: 'tooltips',
    title: 'Tooltips & Hover Annotations',
    category: 'feedback',
    description: 'Multi-directional, butter-smooth tooltips with ease-out transitions and clear contrast positioning.',
    tags: ['Tooltip', 'Hover', 'Annotation', 'Micro-interaction'],
    props: [
      {
        name: 'content',
        label: 'Tooltip Content',
        type: 'string',
        defaultValue: 'View human profile 👤',
        description: 'Text string displayed within the tooltip floating box'
      },
      {
        name: 'position',
        label: 'Position',
        type: 'select',
        defaultValue: 'top',
        options: ['top', 'bottom', 'left', 'right'],
        description: 'Placement relative to anchor element'
      }
    ],
    previewComponent: 'TooltipPreview',
    codeTemplates: {
      react: `import React from 'react';
import { Tooltip } from '@/components/ui/Tooltip';
import { Button } from '@/components/ui/Button';

export const TooltipSample = () => {
  return (
    <Tooltip content="{{content}}" position="{{position}}">
      <Button variant="secondary">Hover Me</Button>
    </Tooltip>
  );
};`,
      html: `<div class="tooltip-wrapper tooltip-{{position}}">
  <button class="btn btn-secondary">Hover Me</button>
  <span class="tooltip-box">{{content}}</span>
</div>`,
      tailwind: `<div className="relative group inline-block">
  <button className="px-4 py-2 bg-slate-800 text-white rounded-lg">Hover Me</button>
  <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 bg-black text-xs text-white rounded">
    {{content}}
  </span>
</div>`
    },
    accessibility: {
      role: 'tooltip',
      keyboardNavigation: 'Shows on both mouse hover and keyboard focus.',
      wcagNotes: 'Dismissible and doesn’t block underlying content.'
    }
  },
  {
    id: 'modals',
    title: 'Modals & Action Dialogs',
    category: 'feedback',
    description: 'Backdrop-filtered focus dialogs with keyboard Escape support, customizable headers, and spring animations.',
    tags: ['Modal', 'Dialog', 'Overlay', 'Accessible'],
    props: [
      {
        name: 'title',
        label: 'Dialog Title',
        type: 'string',
        defaultValue: 'Confirm Action',
        description: 'Header text of the dialog'
      },
      {
        name: 'content',
        label: 'Dialog Message',
        type: 'string',
        defaultValue: 'Are you sure you want to deploy these design token changes to production?',
        description: 'Body explanation message'
      }
    ],
    previewComponent: 'ModalPreview',
    codeTemplates: {
      react: `import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export const DialogDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="{{title}}">
        <p>{{content}}</p>
      </Modal>
    </>
  );
};`,
      html: `<div class="modal-backdrop" role="dialog" aria-modal="true">
  <div class="modal-dialog">
    <div class="modal-header"><h3>{{title}}</h3></div>
    <div class="modal-body"><p>{{content}}</p></div>
  </div>
</div>`,
      tailwind: `<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
  <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 text-white">
    <h3 className="text-lg font-bold mb-2">{{title}}</h3>
    <p className="text-sm text-slate-300">{{content}}</p>
  </div>
</div>`
    },
    accessibility: {
      role: 'dialog',
      keyboardNavigation: 'Closes on Escape key; traps keyboard focus.',
      wcagNotes: 'Communicates dialog role and aria-modal attributes.'
    }
  },
  {
    id: 'tabs',
    title: 'Interactive Tab Switchers',
    category: 'navigation',
    description: 'Fluid pill tab navigation with smooth switching and isolated panel content.',
    tags: ['Tabs', 'Navigation', 'Pill', 'Switcher'],
    props: [
      {
        name: 'defaultTab',
        label: 'Active Tab Key',
        type: 'select',
        defaultValue: 'overview',
        options: ['overview', 'analytics', 'settings'],
        description: 'Default selected tab key'
      }
    ],
    previewComponent: 'TabsPreview',
    codeTemplates: {
      react: `import React from 'react';
import { Tabs } from '@/components/ui/Tabs';

export const NavigationTabs = () => {
  return (
    <Tabs
      defaultTab="{{defaultTab}}"
      items={[
        { id: 'overview', label: 'Overview', content: <p>Application Health & Telemetry.</p> },
        { id: 'analytics', label: 'Analytics', content: <p>12,480 Active Humans Online.</p> },
        { id: 'settings', label: 'Settings', content: <p>Manage API Keys and Themes.</p> }
      ]}
    />
  );
};`,
      html: `<div class="tabs-container">
  <div class="tab-list">
    <button class="tab-trigger active">Overview</button>
    <button class="tab-trigger">Analytics</button>
  </div>
</div>`,
      tailwind: `<div className="flex gap-1 p-1 bg-slate-800 rounded-lg">
  <button className="px-4 py-1.5 rounded-md text-sm font-semibold bg-blue-600 text-white">Overview</button>
  <button className="px-4 py-1.5 rounded-md text-sm font-semibold text-slate-400">Analytics</button>
</div>`
    },
    accessibility: {
      role: 'tablist',
      keyboardNavigation: 'Arrow keys switch tabs, Enter activates.',
      wcagNotes: 'aria-selected correctly set on active tab trigger.'
    }
  },
  {
    id: 'dropdowns',
    title: 'Action Dropdowns & Menus',
    category: 'navigation',
    description: 'Polished context menus with member actions, dividers, destructive triggers, and click-outside dismissal.',
    tags: ['Dropdown', 'Menu', 'Navigation', 'Actions'],
    props: [
      {
        name: 'label',
        label: 'Trigger Label',
        type: 'string',
        defaultValue: 'Member Actions',
        description: 'Button text to open the dropdown menu'
      }
    ],
    previewComponent: 'DropdownPreview',
    codeTemplates: {
      react: `import React from 'react';
import { Dropdown } from '@/components/ui/Dropdown';

export const ActionsMenu = () => {
  return (
    <Dropdown
      label="{{label}}"
      items={[
        { id: 'profile', label: 'View Human Profile', onClick: () => alert('Profile') },
        { id: 'invite', label: 'Invite Teammate', onClick: () => alert('Invite') },
        { id: 'remove', label: 'Remove from Workspace', onClick: () => alert('Remove'), isDanger: true }
      ]}
    />
  );
};`,
      html: `<div class="dropdown-wrapper">
  <button class="btn btn-secondary">{{label}}</button>
  <div class="dropdown-menu">
    <button class="dropdown-item">View Profile</button>
  </div>
</div>`,
      tailwind: `<div className="relative inline-block">
  <button className="px-4 py-2 bg-slate-800 text-white rounded-lg flex items-center gap-2">
    {{label}} <span>▼</span>
  </button>
</div>`
    },
    accessibility: {
      role: 'menu',
      keyboardNavigation: 'Esc closes menu, up/down arrows navigate items.',
      wcagNotes: 'Clear focus states and aria-haspopup indicated.'
    }
  },
  {
    id: 'inputs',
    title: 'Text Inputs & Form Fields',
    category: 'forms',
    description: 'Accessible form inputs with labels, validation feedback, and clear focus states.',
    tags: ['Input', 'Form', 'Controls', 'Accessible'],
    props: [
      {
        name: 'label',
        label: 'Field Label',
        type: 'string',
        defaultValue: 'Email Address',
        description: 'Label above the input field'
      },
      {
        name: 'placeholder',
        label: 'Placeholder Text',
        type: 'string',
        defaultValue: 'user@domain.com',
        description: 'Ghost placeholder value'
      },
      {
        name: 'hint',
        label: 'Helper Hint',
        type: 'string',
        defaultValue: 'We will never share your email.',
        description: 'Helpful guidance text below field'
      },
      {
        name: 'error',
        label: 'Validation Error',
        type: 'string',
        defaultValue: '',
        description: 'Optional error message string'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        description: 'Whether input is disabled'
      }
    ],
    previewComponent: 'InputPreview',
    codeTemplates: {
      react: `import React from 'react';
import { Input } from '@/components/ui/Input';

export const FormField = () => {
  return (
    <Input
      label="{{label}}"
      placeholder="{{placeholder}}"
      hint="{{hint}}"
      error="{{error}}"
      disabled={ {{disabled}} }
    />
  );
};`,
      html: `<div class="form-group">
  <label>{{label}}</label>
  <input type="text" placeholder="{{placeholder}}" class="input-field" {{#if disabled}}disabled{{/if}} />
  <span class="form-hint">{{hint}}</span>
</div>`,
      tailwind: `<div className="flex flex-col gap-1 w-full max-w-sm">
  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">{{label}}</label>
  <input type="text" placeholder="{{placeholder}}" className="px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
  <span className="text-xs text-slate-500">{{hint}}</span>
</div>`
    },
    accessibility: {
      role: 'textbox',
      keyboardNavigation: 'Focusable via Tab; accessible label association.',
      wcagNotes: 'Includes clear focus rings and aria-invalid support.'
    }
  },
  {
    id: 'switches',
    title: 'Toggle Switches',
    category: 'forms',
    description: 'Bistable switches for toggling binary application settings and preferences.',
    tags: ['Switch', 'Toggle', 'Setting', 'Form'],
    props: [
      {
        name: 'label',
        label: 'Toggle Label',
        type: 'string',
        defaultValue: 'Enable Notifications',
        description: 'Label shown beside the switch'
      },
      {
        name: 'checked',
        label: 'Active State',
        type: 'boolean',
        defaultValue: true,
        description: 'Checked/on status'
      },
      {
        name: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
        description: 'Disables switch interaction'
      }
    ],
    previewComponent: 'SwitchPreview',
    codeTemplates: {
      react: `import React, { useState } from 'react';
import { Switch } from '@/components/ui/Switch';

export const SettingsToggle = () => {
  const [enabled, setEnabled] = useState({{checked}});

  return (
    <Switch
      label="{{label}}"
      checked={enabled}
      onChange={setEnabled}
      disabled={ {{disabled}} }
    />
  );
};`,
      html: `<label class="switch-wrap">
  <input type="checkbox" role="switch" {{#if checked}}checked{{/if}} {{#if disabled}}disabled{{/if}}>
  <span class="slider"></span>
  <span class="label-text">{{label}}</span>
</label>`,
      tailwind: `<button role="switch" aria-checked="{{checked}}" className="w-11 h-6 rounded-full bg-blue-600 relative p-0.5 transition-colors">
  <span className="block w-5 h-5 rounded-full bg-white shadow-sm transform translate-x-5 transition-transform" />
</button>`
    },
    accessibility: {
      role: 'switch',
      keyboardNavigation: 'Space key toggles state when focused.',
      wcagNotes: 'Communicates checked status through aria-checked attribute.'
    }
  },
  {
    id: 'alerts',
    title: 'Contextual Alerts & Banners',
    category: 'feedback',
    description: 'High-visibility contextual notifications with semantic color coding, iconography, and dismiss actions.',
    tags: ['Alert', 'Banner', 'Feedback', 'Accessible'],
    props: [
      {
        name: 'variant',
        label: 'Variant',
        type: 'select',
        defaultValue: 'info',
        options: ['info', 'success', 'warning', 'danger'],
        description: 'Semantic intent and color treatment'
      },
      {
        name: 'title',
        label: 'Alert Title',
        type: 'string',
        defaultValue: 'Deployment Status',
        description: 'Headline text of the alert'
      },
      {
        name: 'message',
        label: 'Alert Message',
        type: 'string',
        defaultValue: 'All 37 static paths and security perimeter validations passed with zero violations.',
        description: 'Detail text rendered inside the alert'
      }
    ],
    previewComponent: 'AlertPreview',
    codeTemplates: {
      react: `import React from 'react';
import { Alert } from '@/components/ui/Alert';

export const StatusAlert = () => {
  return (
    <Alert
      variant="{{variant}}"
      title="{{title}}"
      onClose={() => console.log('dismissed')}
    >
      {{message}}
    </Alert>
  );
};`,
      html: `<div class="alert alert-{{variant}}" role="alert">
  <strong>{{title}}:</strong> {{message}}
</div>`,
      tailwind: `<div role="alert" className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
  <div className="font-bold text-sm">{{title}}</div>
  <div className="text-sm text-slate-300">{{message}}</div>
</div>`
    },
    accessibility: {
      role: 'alert',
      wcagNotes: 'Uses role="alert" with WCAG-compliant 4.5:1 text-to-background contrast.'
    }
  },
  {
    id: 'skeletons',
    title: 'Loading Skeletons',
    category: 'feedback',
    description: 'Smooth shimmer placeholders preserving layout flow during asynchronous data loading.',
    tags: ['Skeleton', 'Loading', 'Placeholder', 'Shimmer'],
    props: [
      {
        name: 'variant',
        label: 'Shape Variant',
        type: 'select',
        defaultValue: 'rectangular',
        options: ['rectangular', 'circular', 'text'],
        description: 'Geometry of the skeleton placeholder'
      },
      {
        name: 'width',
        label: 'Width',
        type: 'string',
        defaultValue: '100%',
        description: 'CSS width unit'
      },
      {
        name: 'height',
        label: 'Height',
        type: 'string',
        defaultValue: '64px',
        description: 'CSS height unit'
      }
    ],
    previewComponent: 'SkeletonPreview',
    codeTemplates: {
      react: `import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export const CardPlaceholder = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Skeleton variant="{{variant}}" width="{{width}}" height="{{height}}" />
      <Skeleton width="60%" height="16px" />
    </div>
  );
};`,
      html: `<div class="skeleton skeleton-{{variant}}" style="width: {{width}}; height: {{height}};"></div>`,
      tailwind: `<div className="w-full h-16 rounded-xl bg-slate-800 animate-pulse" />`
    },
    accessibility: {
      role: 'presentation',
      wcagNotes: 'Marked with aria-hidden="true" to prevent screen reader clutter during loads.'
    }
  },
  {
    id: 'breadcrumbs',
    title: 'Breadcrumb Navigation',
    category: 'navigation',
    description: 'Semantic hierarchical trails helping developers orient within nested route depths.',
    tags: ['Breadcrumb', 'Navigation', 'Hierarchy', 'Accessible'],
    props: [
      {
        name: 'separator',
        label: 'Separator Symbol',
        type: 'string',
        defaultValue: '/',
        description: 'Delimiter displayed between breadcrumb trail steps'
      }
    ],
    previewComponent: 'BreadcrumbsPreview',
    codeTemplates: {
      react: `import React from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const PageTrail = () => {
  return (
    <Breadcrumbs
      separator="{{separator}}"
      items={[
        { label: 'Platform', href: '/' },
        { label: 'Studios', href: '/studios' },
        { label: 'Workbench', isCurrent: true }
      ]}
    />
  );
};`,
      html: `<nav aria-label="Breadcrumb">
  <ol class="breadcrumb-trail">
    <li><a href="/">Platform</a></li>
    <li><span>{{separator}}</span></li>
    <li aria-current="page">Workbench</li>
  </ol>
</nav>`,
      tailwind: `<nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-400">
  <a href="/" className="hover:text-white">Platform</a>
  <span>{{separator}}</span>
  <span className="text-white font-semibold">Workbench</span>
</nav>`
    },
    accessibility: {
      role: 'navigation',
      keyboardNavigation: 'Focusable breadcrumb links with aria-current="page" on current target.',
      wcagNotes: 'Wraps ordered list inside nav element with aria-label="Breadcrumb".'
    }
  },
  {
    id: 'empty_states',
    title: 'Empty States & Fallbacks',
    category: 'feedback',
    description: 'Polished dashed placeholders providing actionable cues when zero items or records match.',
    tags: ['Empty State', 'Fallback', 'Layout', 'No Results'],
    props: [
      {
        name: 'title',
        label: 'Headline',
        type: 'string',
        defaultValue: 'No Bookmarks Found',
        description: 'Title of the zero-results container'
      },
      {
        name: 'description',
        label: 'Explanation Text',
        type: 'string',
        defaultValue: 'Try selecting a different filter category or import your saved JSON bookmarks collection.',
        description: 'Helpful guidance text'
      }
    ],
    previewComponent: 'EmptyStatePreview',
    codeTemplates: {
      react: `import React from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

export const SearchFallback = () => {
  return (
    <EmptyState
      title="{{title}}"
      description="{{description}}"
      action={<Button variant="primary">Browse All Resources</Button>}
    />
  );
};`,
      html: `<div class="empty-state">
  <h4>{{title}}</h4>
  <p>{{description}}</p>
</div>`,
      tailwind: `<div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/50">
  <h4 className="text-lg font-bold text-white mb-2">{{title}}</h4>
  <p className="text-sm text-slate-400 mb-4">{{description}}</p>
</div>`
    },
    accessibility: {
      role: 'region',
      wcagNotes: 'Clear contrast and readable guidance with interactive keyboard action slot.'
    }
  }
];
