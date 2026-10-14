# Architecture & Folder Structure Guide

**Mahi UI Component Playground** follows a modern, scalable, feature-first architecture built on Next.js 16 (App Router), React 19, and TypeScript.

---

## 1. Directory Tree & Architecture Overview

```
Mahi-UI-Component-Playground/
├── .github/                      # Continuous Integration, Issue & PR templates
│   ├── workflows/
│   │   ├── ci.yml                # Typecheck, lint, full test matrix, next build
│   │   ├── deploy.yml            # Production deployment pipeline
│   │   └── link-audit.yml        # Concurrency-pooled link validation
│   └── ISSUE_TEMPLATE/
├── bin/                          # Terminal CLI tools
│   └── mahi-ui.js                # Interactive component and catalog CLI
├── docs/                         # Architecture, security, testing, and developer guides
│   ├── architecture/             # Structural designs, audit reports, module boundaries
│   └── development/              # Contribution guidelines, naming rules, creation recipes
├── public/                       # Static public assets
│   ├── demos/                    # Static preview artifacts
│   ├── fonts/                    # Typography web fonts
│   ├── icons/                    # App and brand SVGs
│   ├── images/                   # Screenshots, og-images, thumbnails
│   ├── preview-sandbox.html      # Sandboxed iframe environment for live code preview
│   └── sw.js                     # Service worker offline caching
├── scripts/                      # Build-time and CI maintenance automation
│   ├── audit-links.js            # Network link validator for external resources
│   ├── clean-urls.js             # Utility to sanitize tracking params from URLs
│   ├── lint.js                   # High-speed static quality and security auditor
│   ├── scaffold-starter.js       # Boilerplate generator for new projects
│   ├── test-ecosystem.js         # Integration tests for workspace bindings
│   └── validate-catalog.js       # JSON schema and integrity auditor for datasets
├── src/                          # Modern Next.js application source
│   ├── app/                      # Next.js App Router (pages, layouts, route handlers)
│   ├── components/               # Application-wide UI building blocks
│   │   ├── ui/                   # Reusable primitive controls (Buttons, Badges, Modals)
│   │   ├── layout/               # Header, Sidebar, Footer, AppShell layout
│   │   ├── navigation/           # Central navigation bar & mobile menus
│   │   ├── playground/           # Live preview frames, code panels, viewport toolbars
│   │   ├── search/               # Command palette, spotlight search
│   │   └── shared/               # Cross-cutting sections (FAQ, Hero, CookieBanner)
│   ├── config/                   # Global configuration and platform metadata
│   ├── data/                     # Validated JSON catalogs (components, projects, resources)
│   ├── features/                 # Modular, feature-encapsulated capabilities
│   ├── hooks/                    # Shared, cross-feature React hooks
│   ├── lib/                      # Infrastructure, exporters, rate limiters, storage
│   ├── services/                 # Cross-cutting runtime application services
│   ├── stores/                   # State management stores (Zustand)
│   ├── styles/                   # CSS custom properties, tokens, themes, utilities
│   ├── types/                    # Shared TypeScript contracts and schema interfaces
│   ├── utils/                    # Pure, framework-agnostic helper functions
│   └── middleware.ts             # Edge request filtering and security header injection
└── tests/                        # Comprehensive automated test suites
    ├── accessibility/            # Automated WCAG 2.1 AA a11y tests
    ├── e2e/                      # Playwright real-browser end-to-end tests
    ├── integration/              # Ecosystem and multi-module integration tests
    └── unit/                     # Focused unit tests (contrast, security, schemas)
```

---

## 2. Directory Responsibilities

### `src/app/`
Contains routes, layouts, error boundaries, and loading states for the Next.js App Router.
- Pages remain lean: they extract URL search parameters, configure SEO metadata, and assemble feature containers.
- Does not contain heavy business logic or state mutations directly.

### `src/components/`
Contains shared, design-system aligned visual elements.
- **`ui/`**: Pure UI controls (e.g. `Button`, `Modal`, `Tabs`, `Input`).
- **`layout/`**: Structural scaffolding (`Header`, `Sidebar`, `Footer`, `AppShell`).
- **`shared/`**: Generic reusable page sections (`FAQAccordion`, `LandingHeroSection`, `CookieBanner`).
- **`playground/`**: Workspace-specific layout primitives (`CodePanel`, `LivePreview`, `ViewportToolbar`).
- **`search/`**: Global spotlight search (`CommandPalette`).

### `src/features/`
Self-contained business modules representing individual studios, workspaces, and tools.
- Each feature encapsulates its own private subcomponents, internal hooks, and state.
- Features communicate outward using the shared stores (`src/stores/`) or shared utilities (`src/utils/`).

### `src/hooks/`
Shared, reusable React hooks that are completely independent of any single feature:
- `useMounted`: Hydration-safe client-side mounting detection.
- `useMediaQuery`: Responsive viewport query listener.

### `src/lib/` vs `src/utils/`
- **`src/lib/`**: Heavy-weight integrations, platform adapters, encryption/security utilities, and export engines (`exporter.ts`, `rateLimit.ts`, `storage.ts`, `security.ts`).
- **`src/utils/`**: Pure, deterministic, side-effect-free helper functions (color conversion math, string capitalization, array partitioning).

### `src/stores/`
Client-side micro-stores powered by Zustand:
- `appStore`: Active tab, active theme, search query, sidebar expanded state.
- `bookmarkStore`: LocalStorage-persisted bookmarks for components, projects, and resources.
- `preferencesStore`: Developer preferences (editor font size, sandbox auto-run, analytics opt-out).

### `src/data/`
Canonical data catalogs in structured JSON format with accompanying TypeScript definitions:
- `components/components.json`: Component catalog and code examples.
- `projects/projects.json`: 30 frontend project definitions, tags, and workspace bindings.
- `resources/resources.json`: 459 curated developer resources.
- `themes/themes.json`: 5 design system color themes and token configurations.

---

## 3. Core Architectural Rules

1. **Unidirectional Dependency Flow**:
   - `app/` (Routes) → `features/` → `components/` → `lib/` / `utils/` → `types/`.
   - Never import from `app/` into `components/` or `features/`.
2. **Path Aliasing**:
   - Always use `@/*` configured in `tsconfig.json` (e.g. `@/components/ui`, `@/lib/utils`, `@/stores/appStore`).
   - Avoid long, fragile relative paths like `../../../../components/ui/Button`.
3. **Encapsulation**:
   - Features must not reach into the private internals of another feature. Use shared utilities or export public APIs via the feature's `index.ts`.
