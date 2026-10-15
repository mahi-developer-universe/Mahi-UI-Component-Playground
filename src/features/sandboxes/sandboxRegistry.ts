import React from 'react';

export interface SandboxItem {
  id: string;
  title: string;
  description: string;
  category: 'studios' | 'fx-labs' | 'dev-tools' | 'projects';
  categoryLabel: string;
  badge: string;
  icon: string;
  keywords: string[];
  type: 'component' | 'interactive-html' | 'project';
  projectId?: string;
  interactiveModule?: string;
}

export const SANDBOX_REGISTRY: SandboxItem[] = [
  // 1. Creative Studios & Design System Labs
  {
    id: 'studio-colors',
    title: 'Color Palette & WCAG Contrast Studio',
    description: 'Dynamic 10-step tonal scales, real-time APCA & WCAG 2.1 AAA contrast calculations, accessible text suggester, and CSS/Tailwind exports.',
    category: 'studios',
    categoryLabel: 'Design Systems',
    badge: 'WCAG AAA Verified',
    icon: '🎨',
    keywords: ['color', 'contrast', 'wcag', 'palette', 'tailwind', 'tokens', 'accessibility'],
    type: 'component'
  },
  {
    id: 'studio-themes',
    title: 'Theme Engine & DTCG Token Studio',
    description: 'Real-time design token calibrator for border radiuses, glassmorphism blurs, theme anchors, and W3C DTCG standard JSON exports.',
    category: 'studios',
    categoryLabel: 'Design Systems',
    badge: 'DTCG Export',
    icon: '⚙️',
    keywords: ['theme', 'tokens', 'dtcg', 'radius', 'glassmorphism', 'presets', 'dark mode'],
    type: 'component'
  },
  {
    id: 'studio-typography',
    title: 'Typographic Rhythm & Scale Studio',
    description: 'Mathematical typographic scales (Major Third, Golden Ratio, etc.), variable font weights, tracking/leading calibration, and live paired preview.',
    category: 'studios',
    categoryLabel: 'Creative Tools',
    badge: 'Typographic Engine',
    icon: 'Aa',
    keywords: ['typography', 'fonts', 'scale', 'inter', 'outfit', 'line height', 'golden ratio'],
    type: 'component'
  },
  {
    id: 'studio-icons',
    title: 'Icon Explorer & Vector Inspector',
    description: 'Search and inspect over 40+ curated Lucide SVG vectors with live stroke-width sliders, color tints, copyable JSX & clean SVGs.',
    category: 'studios',
    categoryLabel: 'Creative Tools',
    badge: 'Lucide Vectors',
    icon: '✦',
    keywords: ['icons', 'svg', 'lucide', 'vectors', 'stroke', 'copy'],
    type: 'component'
  },
  {
    id: 'studio-backgrounds',
    title: 'Backgrounds & Generative Pattern Studio',
    description: 'Live angle-controlled CSS gradients, geometric dot matrix patterns, blueprint grids, and glassmorphic mesh blur generators.',
    category: 'studios',
    categoryLabel: 'Creative Tools',
    badge: 'CSS Generators',
    icon: '▦',
    keywords: ['background', 'gradients', 'patterns', 'dots', 'grid', 'mesh', 'css'],
    type: 'component'
  },
  {
    id: 'studio-motion',
    title: 'Motion Physics & Easing Transition Lab',
    description: 'Calibrate cubic-bezier easing curves, duration timings, bouncy spring presets, and copy production-ready transition rules.',
    category: 'fx-labs',
    categoryLabel: 'Animations & FX',
    badge: 'Spring Physics',
    icon: '▶',
    keywords: ['motion', 'animation', 'easing', 'cubic-bezier', 'spring', 'transitions'],
    type: 'component'
  },
  {
    id: 'studio-pagebuilder',
    title: 'Visual Canvas & Page Section Builder',
    description: 'Drag & reorder hero, features, stats, CTA, and footer sections. Toggle viewports, edit live headlines, and export composite React JSX.',
    category: 'dev-tools',
    categoryLabel: 'Dev Productivity',
    badge: 'Page Composer',
    icon: '📐',
    keywords: ['page builder', 'canvas', 'sections', 'hero', 'cta', 'layout', 'responsive'],
    type: 'component'
  },
  {
    id: 'studio-recipes',
    title: 'Compound Component Recipe Builder',
    description: 'Pre-assembled enterprise compound patterns: Auth Cards, KPI Header bars, Multi-filter Toolbars, and Dismissable Status Banners.',
    category: 'studios',
    categoryLabel: 'Design Systems',
    badge: 'Compound UI',
    icon: '🧩',
    keywords: ['recipes', 'compound', 'auth card', 'kpi', 'filter bar', 'patterns'],
    type: 'component'
  },
  {
    id: 'studio-charts',
    title: 'Accessible SVG & Donut Chart Studio',
    description: 'High-contrast accessible bar, line, and donut data visualizations with automatic screen-reader fallback data tables.',
    category: 'dev-tools',
    categoryLabel: 'Dev Productivity',
    badge: 'Accessible Data',
    icon: '📊',
    keywords: ['charts', 'svg', 'accessible', 'bar chart', 'donut', 'telemetry', 'analytics'],
    type: 'component'
  },
  {
    id: 'studio-threed',
    title: 'Three.js 3D WebGL Spatial Lab',
    description: 'Hardware-accelerated 3D WebGL spatial view with live geometric shape swapping, wireframes, orbit spin rates, and lights.',
    category: 'fx-labs',
    categoryLabel: 'Animations & FX',
    badge: 'WebGL Three.js',
    icon: '🧊',
    keywords: ['threejs', '3d', 'webgl', 'torus', 'cube', 'mesh', 'lighting'],
    type: 'component'
  },
  {
    id: 'studio-reactnative',
    title: 'Universal React Native & Mobile Studio',
    description: 'Interactive cross-platform mobile component builder with native StyleSheet generation, touch haptics, spring animations, and iOS/Android simulators.',
    category: 'studios',
    categoryLabel: 'Mobile & Native',
    badge: 'iOS & Android',
    icon: '📱',
    keywords: ['react native', 'mobile', 'ios', 'android', 'stylesheet', 'touchable', 'spring', 'expo'],
    type: 'component'
  },

  // 2. Interactive Tool Sandboxes (from 30 Projects)
  {
    id: 'proj-button-gallery',
    title: 'CSS Button FX & Shimmer Lab',
    description: 'Magnetic hover buttons, neon borders, holographic gradients, and animated shimmer sweeps with one-click CSS copy.',
    category: 'fx-labs',
    categoryLabel: 'Animations & FX',
    badge: 'Project #2',
    icon: '🔘',
    keywords: ['buttons', 'shimmer', 'ripple', 'gradient', 'hover', 'css'],
    type: 'interactive-html',
    projectId: 'button-gallery',
    interactiveModule: 'button-gallery'
  },
  {
    id: 'proj-loader-lab',
    title: 'Animated Loaders & Skeleton Screen Lab',
    description: 'Preview content skeleton pulse placeholders, orbital CSS spinners, ping dots, and export lightweight keyframes.',
    category: 'fx-labs',
    categoryLabel: 'Animations & FX',
    badge: 'Project #4',
    icon: '⏳',
    keywords: ['skeleton', 'loader', 'spinner', 'pulse', 'keyframes', 'css'],
    type: 'interactive-html',
    projectId: 'loader-lab',
    interactiveModule: 'loader-lab'
  },
  {
    id: 'proj-chart-playground',
    title: 'Reactive Chart SVG Playground',
    description: 'Zero-dependency reactive SVG chart bars. Randomize datasets live and export vector SVGs for production dashboards.',
    category: 'dev-tools',
    categoryLabel: 'Dev Productivity',
    badge: 'Project #5',
    icon: '📈',
    keywords: ['chart', 'svg', 'reactive', 'telemetry', 'bar graph'],
    type: 'interactive-html',
    projectId: 'chart-playground',
    interactiveModule: 'chart-playground'
  },
  {
    id: 'proj-gradient-studio',
    title: 'Gradient Angle & Color Stop Studio',
    description: 'Interactive gradient screen with continuous 360° angle rotary slider, cyberpunk/sunset presets, and direct CSS export.',
    category: 'studios',
    categoryLabel: 'Creative Tools',
    badge: 'Project #6',
    icon: '🌈',
    keywords: ['gradient', 'angle', 'colors', 'cyberpunk', 'sunset', 'css'],
    type: 'interactive-html',
    projectId: 'gradient-studio',
    interactiveModule: 'gradient-studio'
  },
  {
    id: 'proj-pattern-studio',
    title: 'SVG Pattern & Blueprint Grid Lab',
    description: 'Mathematical SVG background pattern engine with configurable dot matrix pitches and architectural grid lines.',
    category: 'studios',
    categoryLabel: 'Creative Tools',
    badge: 'Project #7',
    icon: '🏁',
    keywords: ['patterns', 'blueprint', 'grid', 'dot matrix', 'svg'],
    type: 'interactive-html',
    projectId: 'pattern-studio',
    interactiveModule: 'pattern-studio'
  },
  {
    id: 'proj-dither-studio',
    title: 'Bayer Matrix Dither & Halftone Canvas',
    description: 'Real-time HTML5 Canvas pixel processor creating vintage Bayer retro dithering and dot halftone print textures.',
    category: 'studios',
    categoryLabel: 'Creative Tools',
    badge: 'Project #8',
    icon: '👾',
    keywords: ['dither', 'halftone', 'bayer', 'canvas', 'retro', 'pixel'],
    type: 'interactive-html',
    projectId: 'dither-studio',
    interactiveModule: 'dither-studio'
  },
  {
    id: 'proj-logo-maker',
    title: 'Vector Brand Mark & Logo Generator',
    description: 'Synthesize clean vector brand marks with randomized gradient accents and semantic human geometry.',
    category: 'studios',
    categoryLabel: 'Creative Tools',
    badge: 'Project #10',
    icon: '🏷️',
    keywords: ['logo', 'brand', 'vector', 'svg', 'typography'],
    type: 'interactive-html',
    projectId: 'logo-maker',
    interactiveModule: 'logo-maker'
  },
  {
    id: 'proj-css-generator',
    title: 'Elevation Shadow & Glassmorphism Lab',
    description: 'Layered multi-stop box-shadow builder, depth elevation levels, and backdrop blur glassmorphism sandbox.',
    category: 'dev-tools',
    categoryLabel: 'Dev Productivity',
    badge: 'Project #13',
    icon: '📦',
    keywords: ['box-shadow', 'glassmorphism', 'blur', 'depth', 'elevation', 'css'],
    type: 'interactive-html',
    projectId: 'css-generator',
    interactiveModule: 'css-generator'
  },
  {
    id: 'proj-a11y-checker',
    title: 'WCAG Contrast Ratio Validator',
    description: 'Instant compliance checking for text colors against light and dark surfaces with AA and AAA rating indicators.',
    category: 'dev-tools',
    categoryLabel: 'Design Systems',
    badge: 'Project #14',
    icon: '🛡️',
    keywords: ['a11y', 'wcag', 'contrast', 'validator', 'accessibility'],
    type: 'interactive-html',
    projectId: 'a11y-checker',
    interactiveModule: 'a11y-checker'
  },
  {
    id: 'proj-saas-dashboard',
    title: 'SaaS Analytics & Telemetry Simulator',
    description: 'Live KPI metric cards, MRR streams, active developer seats, and downloadable telemetry CSV reports.',
    category: 'dev-tools',
    categoryLabel: 'Dev Productivity',
    badge: 'Project #15',
    icon: '📉',
    keywords: ['saas', 'analytics', 'telemetry', 'kpi', 'mrr', 'csv'],
    type: 'interactive-html',
    projectId: 'saas-dashboard',
    interactiveModule: 'saas-dashboard'
  },
  {
    id: 'proj-kanban-workspace',
    title: 'Sprint Kanban Task Board Workspace',
    description: 'Interactive sprint board columns with priority badges, status trackers, and human task assignee avatars.',
    category: 'dev-tools',
    categoryLabel: 'Dev Productivity',
    badge: 'Project #16',
    icon: '📋',
    keywords: ['kanban', 'sprint', 'tasks', 'board', 'productivity'],
    type: 'interactive-html',
    projectId: 'kanban-workspace',
    interactiveModule: 'kanban-workspace'
  },
  {
    id: 'proj-pricing-builder',
    title: 'Dynamic Pricing Page & Discount Calculator',
    description: 'Interactive monthly/annual billing cycle toggle with automatic discount calculations and tier comparisons.',
    category: 'dev-tools',
    categoryLabel: 'Dev Productivity',
    badge: 'Project #17',
    icon: '💳',
    keywords: ['pricing', 'billing', 'discounts', 'tiers', 'subscription'],
    type: 'interactive-html',
    projectId: 'pricing-builder',
    interactiveModule: 'pricing-builder'
  },
  {
    id: 'proj-device-previewer',
    title: 'Responsive Hardware Bezel Simulator',
    description: 'Realistic hardware bezels across Mobile (375px), Tablet (680px), and Desktop viewports for live responsive audits.',
    category: 'dev-tools',
    categoryLabel: 'Dev Productivity',
    badge: 'Project #26',
    icon: '📱',
    keywords: ['device', 'bezel', 'mobile', 'tablet', 'responsive', 'simulator'],
    type: 'interactive-html',
    projectId: 'device-previewer',
    interactiveModule: 'device-previewer'
  },
  {
    id: 'proj-tokens-generator',
    title: 'Design System Token Ramp Studio',
    description: 'Mathematical 10-step tonal scale generation from any hex color with instant CSS Variables and Tailwind config exports.',
    category: 'studios',
    categoryLabel: 'Design Systems',
    badge: 'Project #27',
    icon: '🧪',
    keywords: ['tokens', 'ramp', 'tailwind', 'css variables', 'color scale'],
    type: 'interactive-html',
    projectId: 'tokens-generator',
    interactiveModule: 'tokens-generator'
  }
];
