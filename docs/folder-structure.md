# Folder Structure & Architectural Blueprint

This document outlines the directory structure and responsibilities of **Mahi UI Component Playground**. The repository is architected following a scalable, production-grade Next.js App Router and feature-driven design pattern.

---

## 📁 Repository Overview

```
Mahi-UI-Component-Playground/
├── public/                 # Static assets, fonts, icons, showcase images
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── demos/
├── src/
│   ├── app/                # Next.js App Router (pages, layouts, routes, error boundaries)
│   │   ├── layout.tsx      # Root application layout with theme provider
│   │   ├── page.tsx        # Playground hub & interactive ecosystem dashboard
│   │   ├── globals.css     # Core style layer & CSS baseline
│   │   ├── not-found.tsx   # 404 handler
│   │   ├── loading.tsx     # Suspense fallbacks
│   │   └── error.tsx       # Global error boundary
│   ├── components/         # Reusable presentation primitives
│   │   ├── ui/             # General atomic UI elements (Card, Button, Badge, Modal)
│   │   ├── layout/         # Shared headers, navigation bars, footers, sidebars
│   │   ├── navigation/     # Tabs, breadcrumbs, search bars
│   │   ├── forms/          # Input controls, color pickers, sliders
│   │   ├── feedback/       # Alerts, toasts, tooltips
│   │   └── providers/      # React context & client providers
│   ├── features/           # Domain-driven feature modules
│   │   ├── component-playground/   # Interactive suite sandbox & live code generator
│   │   ├── theme-studio/           # Real-time theme generator & token exporter
│   │   ├── color-palette-studio/   # Accessible color palette tools & contrast inspector
│   │   ├── background-studio/      # Dynamic mesh, radial & aurora gradient generator
│   │   ├── typography-studio/      # Modular scale & font pairing workbench
│   │   ├── design-system/          # Design tokens & component specifications
│   │   ├── animation-lab/          # CSS & Motion animation laboratory
│   │   ├── three-d-lab/            # Three.js 3D spatial viewport with geometry controls
│   │   ├── responsive-preview/     # Multi-device viewport emulator
│   │   ├── code-playground/        # Web code editor & live preview sandbox
│   │   ├── project-gallery/        # 30 frontend developer projects inspired by resources
│   │   ├── resource-explorer/      # 459+ verified design & dev resources catalog
│   │   └── accessibility-lab/      # WCAG 2.2 contrast inspector & a11y auditor
│   ├── data/               # Domain-specific datasets & source of truth
│   │   ├── components/     # Component catalog & definitions
│   │   ├── projects/       # 30 frontend project definitions
│   │   ├── resources/      # 459 curated resources registry
│   │   ├── themes/         # Preset color themes & dark/light palettes
│   │   └── index.ts        # Typed exports for all data records
│   ├── hooks/              # Custom reusable React hooks
│   ├── lib/                # Pure utility helpers (cn, clipboard, contrast calculations)
│   ├── services/           # External API & service integrations
│   ├── stores/             # Client-side state management (Zustand)
│   ├── styles/             # Modular CSS layers
│   │   ├── tokens.css      # Design tokens (colors, radiuses, shadows, transitions)
│   │   ├── themes.css      # CSS custom properties for 5 theme presets
│   │   └── utilities.css   # Modern utility helper classes
│   ├── types/              # TypeScript types & interface contracts
│   └── config/             # Navigation links, metadata & app configuration
├── tests/                  # Automated verification & testing suites
│   ├── unit/               # Component & unit tests
│   ├── integration/        # Module & catalog integration tests
│   ├── accessibility/      # a11y & contrast tests
│   └── e2e/                # Browser-level end-to-end simulations
├── scripts/                # Maintenance, validation, and ecosystem check scripts
│   ├── validate-catalog.js # Resource & project schema validator
│   ├── test-ecosystem.js   # Integrity checker across datasets
│   └── cleanup-urls.js     # URL sanitizer and redirect handler
└── docs/                   # Architectural & contributor documentation
    ├── architecture.md     # Architecture decisions & principles
    ├── folder-structure.md # This guide
    ├── migration.md        # Migration report from vanilla HTML/JS to Next.js
    └── testing.md          # Testing workflows & validation guide
```

---

## 🚀 Adding New Capabilities

### Adding a New UI Component
1. Place atomic, reusable UI elements in `src/components/ui/`.
2. Follow TypeScript interfaces defined in `src/types/index.ts`.
3. Style components using CSS Modules or standard CSS custom properties defined in `src/styles/tokens.css`.

### Adding a New Feature Module
1. Create a dedicated folder in `src/features/<feature-name>/`.
2. Encapsulate components, sub-hooks, and specific types within that module.
3. Expose the feature to the Next.js App Router under `src/app/` if it requires a direct route.

### Updating Catalogs & Resources
1. Add or edit resource records in `src/data/resources/resources.json`.
2. Run `node scripts/validate-catalog.js` and `npm test` to verify URL syntax, unique IDs, and tag validity.
