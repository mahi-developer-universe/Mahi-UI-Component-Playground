# Folder Structure Audit Report

**Repository**: [mahi-developer-universe/Mahi-UI-Component-Playground](https://github.com/mahi-developer-universe/Mahi-UI-Component-Playground)  
**Role**: Senior Frontend Architect & Repository Maintainer  
**Date**: October 14, 2026  
**Status**: Comprehensive Baseline Completed & Architecture Rationalized  

---

## 1. Executive Summary

An exhaustive technical audit of the **Mahi UI Component Playground** repository was performed. The repository represents a rich, modern Web application and developer toolkit with 30 interactive frontend workspaces, 459 curated developer resources across 8 categories, 5 cohesive design system themes, 7 component suites (26 UI primitives), and a 3D WebGL Spatial Studio.

### Technology Stack Specifications
- **Framework**: Next.js 16.4.0 (App Router, Turbopack enabled)
- **UI Runtime**: React 19.3.0 & React DOM 19.3.0
- **Language**: TypeScript 7.0.2 / 5.8 (Target ES2022, bundler module resolution)
- **State Management**: Zustand 5.0.15 (Atomic micro-stores)
- **3D & Graphics**: Three.js 0.186.1 & `@types/three`
- **Validation**: Zod 4.6.5
- **Icons**: Lucide React 1.54.0
- **Packaging & Compression**: JSZip 3.10.2
- **Testing**: Playwright 1.64.0 (Real browser E2E), Custom Node Test Suite (Catalog, WCAG Contrast, Accessibility, Security regression, CI quality gates, E2E simulation)

---

## 2. Current Architecture & Identified Issues

### 2.1 File Organization Review

```
Mahi-UI-Component-Playground/
├── .github/                      # CI/CD Workflows (ci.yml, deploy.yml, link-audit.yml), Templates
├── bin/                          # CLI executable (mahi-ui.js)
├── docs/                         # Architecture, security, gap analysis, and roadmap documentation
├── public/                       # Static assets (fonts, icons, images, preview-sandbox.html, sw.js)
├── scripts/                      # Catalog validation, link audit, ecosystem checks, code quality lint
├── src/
│   ├── app/                      # Next.js App Router (12 routes + dynamic projects/studios, sitemap, robots)
│   ├── components/               # UI Primitives, layout, navigation, playground, search, shared
│   ├── config/                   # Global application metadata and configuration
│   ├── data/                     # Validated JSON catalogs (components, projects, resources, themes)
│   ├── features/                 # 42 domain-specific feature modules
│   ├── hooks/                    # Cross-feature shared hooks (useMounted, useMediaQuery)
│   ├── lib/                      # Infrastructure, exporters, rate limiters, token parsers, security
│   ├── services/                 # Cross-cutting runtime services (telemetry)
│   ├── stores/                   # Zustand stores (appStore, bookmarkStore, preferencesStore)
│   ├── styles/                   # Tokens, theme palettes, CSS utilities, global stylesheets
│   ├── types/                    # Shared TypeScript domain contracts
│   └── middleware.ts             # Security headers, rate limiting, and route protection
├── tests/                        # Accessibility, E2E browser tests, unit, integration, simulation
├── legacy root files             # (index.html, app.js, style.css, components-data.js, etc.)
├── package.json
└── tsconfig.json
```

### 2.2 Identified Issues & Architectural Debt

1. **Dual-Stack Legacy Artifacts in Root**:
   - The repository originated as a vanilla JS/CSS web app before transitioning to a full Next.js App Router project.
   - Files like `index.html`, `app.js`, `style.css`, `interactive-modules.js`, `components-data.js`, `resources-data.js`, and `all-projects-data.js` exist in the repository root.
   - *Risk/Dependency*: `scripts/test-ecosystem.js` and `tests/e2e-simulation.js` specifically assert the integrity of these static assets to allow running in zero-dependency environments or static previews (`npm run legacy:serve`).
   - *Resolution*: Keep these files intact and clean for full backward-compatibility with standalone static serving, while establishing `src/` as the single canonical source of truth for all modern features and build pipelines.

2. **Directory Role Differentiation (`src/lib/` vs `src/utils/`)**:
   - Pure functional helpers (e.g., color manipulation, clipboard, formatting) resided inside `src/lib/utils.ts` alongside heavier infrastructure (JSZip exporter, session security, rate limiter).
   - *Resolution*: Ensure pure utility functions are clearly separated or aliased via `src/utils/` while maintaining `src/lib/` for integrations, security, and storage drivers.

3. **Feature-Level Encapsulation**:
   - Some features directly cross-imported internal files from sibling features.
   - *Resolution*: Formalize public feature interfaces with `index.ts` barrel exports where applicable, strictly prohibiting private sub-path deep imports.

4. **Component Classification Boundaries**:
   - `src/components/ui/` grew to 26 primitives without categorical sub-grouping (e.g., feedback, forms, data-display).
   - *Resolution*: Provide structured sub-module categorization (`feedback/`, `forms/`, `data-display/`, `primitives/`) while preserving the top-level barrel `src/components/ui/index.ts` so zero existing imports break.

---

## 3. Target Architecture & Module Boundaries

### 3.1 Target Folder Layout

```
src/
├── app/                          # Next.js App Router: routes, layouts, error/loading boundaries
├── components/                   # Application-wide UI library
│   ├── ui/                       # Reusable UI primitives (Buttons, Badges, Modals, etc.)
│   ├── layout/                   # Structural layout (Header, Sidebar, Footer, AppShell)
│   ├── navigation/               # Route and menu navigation abstractions
│   ├── shared/                   # Cross-cutting UI sections (FAQ, CookieBanner, Hero, BackToTop)
│   ├── playground/               # Live code editor panels, preview canvases, toolbars
│   └── search/                   # Global Command Palette and spotlight filters
├── features/                     # Self-contained business features
│   ├── code-playground/          # Sandboxed live code runner, Monaco/CodeMirror integration
│   ├── component-playground/     # Interactive UI component testbed
│   ├── project-workspace/        # 30-workspace interactive runner and inspector
│   ├── resource-explorer/        # Filterable catalog of 459 developer resources
│   ├── theme-studio/             # Design token editor and live color-palette mixer
│   ├── three-d-studio/           # WebGL/Three.js spatial 3D showcase
│   └── [domain-feature]/         # Specific feature modules
├── hooks/                        # Generic cross-cutting React hooks
├── lib/                          # Infrastructure, security, rate-limiting, and exporters
├── utils/                        # Pure, framework-agnostic helper functions
├── services/                     # Application services (telemetry, logging)
├── stores/                       # Zustand atomic stores (appStore, bookmarkStore, preferencesStore)
├── styles/                       # Design tokens, theme CSS, utility definitions
├── types/                        # Core TypeScript domain models
└── data/                         # Validated JSON catalogs (components, projects, resources, themes)
```

### 3.2 Clear File Ownership Rules

| Layer | Responsibility | Allowed Dependencies | Prohibited Dependencies |
| :--- | :--- | :--- | :--- |
| **`app/`** | Route handlers, page composition, layouts, server metadata | `components/`, `features/`, `stores/`, `lib/`, `hooks/`, `data/` | Direct private implementation files of features |
| **`features/`** | Domain business logic, workspace implementations, studio tools | `components/ui/`, `hooks/`, `lib/`, `stores/`, `utils/`, `types/` | Sibling feature private internals, `app/` routes |
| **`components/ui/`** | Dumb, reusable UI building blocks | `clsx`, `lucide-react`, `utils/` | `stores/`, `features/`, `app/` |
| **`components/layout/`**| Shell, headers, sidebars, footer navigation | `components/ui/`, `stores/`, `config/`, `hooks/` | Specific feature business logic |
| **`lib/`** | Platform integrations, security, rate limiting, exporters | External packages (`jszip`, `zod`), `types/` | React components, UI elements |
| **`utils/`** | Pure, deterministic utility functions (color math, string transforms) | None (pure TS/JS) | React hooks, DOM manipulation, state stores |
| **`stores/`** | Client state management via Zustand | `types/`, `lib/storage.ts` | React components, router instances |
| **`data/`** | Verified static data and schema catalogs | Pure JSON, TypeScript schema types | Any runtime code or React hooks |

---

## 4. Migration Strategy & Risk Mitigation

1. **Non-Destructive Refactoring**:
   - Never remove or break existing module import paths.
   - Use forwarding re-exports (barrel exports) to ensure existing `@/components/ui`, `@/lib/utils`, etc., continue functioning flawlessly across all 201+ files.
2. **Catalog Integrity**:
   - Protect all 459 curated resource links and 30 project mappings. All IDs and route parameters (`/projects/[id]`, `/studios`) remain strictly immutable.
3. **Automated Verification Pipeline**:
   - Each phase is validated against:
     - `npm run typecheck` (`tsc --noEmit`)
     - `node scripts/lint.js`
     - `npm test` (Catalog verification, Ecosystem tests, WCAG contrast, Accessibility, Security regression, Quality gates, E2E simulation)
     - `npm run build` (Next.js production static export)

---

## 5. Validation Checklist

- [x] Initial full audit completed and documented.
- [x] Baseline zero-defect test pass confirmed (Task-592: 0 violations, all checks pass).
- [ ] Documentation suite established (`docs/architecture/`, `docs/development/`).
- [ ] Pure utility layer (`src/utils/`) formalized and linked with `src/lib/`.
- [ ] Component UI categories organized with backward-compatible index.
- [ ] Next.js production build (`npm run build`) verified clean with 0 prerender errors.
