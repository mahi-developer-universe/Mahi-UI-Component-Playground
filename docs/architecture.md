# Mahi UI Component Playground — Architecture Blueprint & Migration Plan

## 1. Executive Summary & Architecture Paradigm

This document outlines the **production architecture, modular system boundary, and scalable directory layout** for **Mahi UI Component Playground**.

The system balances two powerful demands:
1. **Zero-Dependency Instant-Run Baseline**: A lightning-fast, zero-build client-side runtime serving all 7 component suites, 30 projects, Three.js 3D spatial geometry lab, and 459 verified resources without compilation friction.
2. **Next.js App Router + TypeScript + Tailwind Modular Blueprint**: A production-grade target structure separating routing (`src/app`), atomic design primitives (`src/components`), domain features (`src/features`), state machines (`src/stores`), and design tokens (`src/styles`).

```mermaid
graph TD
    App[src/app (Routing & Layouts)] --> Components[src/components (Reusable UI)]
    App --> Features[src/features (Domain Engines)]
    Features --> Lib[src/lib (Math, Contrast, Parsers)]
    Features --> Stores[src/stores (Zustand & Local)]
    Features --> Styles[src/styles (CSS Tokens & Themes)]
    Components --> Styles
```

---

## 2. Directory Layout & Responsibility Matrix

```text
mahi-ui-component-playground/
├── docs/                               # System guidelines and architecture
│   ├── architecture.md
│   ├── design-system.md
│   ├── component-guidelines.md
│   ├── accessibility.md
│   ├── resource-library.md
│   └── contributing.md
├── scripts/                            # Catalog validation, link checks, deduplication
│   ├── validate-catalog.js
│   ├── test-ecosystem.js
│   └── clean-urls.js
├── src/
│   ├── app/                            # Next.js App Router (Platform routing)
│   │   ├── (platform)/
│   │   │   ├── layout.tsx              # Universal app shell, navigation drawer
│   │   │   ├── page.tsx                # Hero banner & studio dashboard
│   │   │   ├── components/             # Reusable UI component catalog
│   │   │   ├── playground/             # Interactive live editor & viewport resizer
│   │   │   ├── themes/                 # 5 design system themes (CSS variables)
│   │   │   ├── 3d-lab/                 # Three.js / React Three Fiber spatial lab
│   │   │   ├── colors/                 # 10-step token generator & contrast checker
│   │   │   ├── typography/             # Font pairing & type-scale studio
│   │   │   ├── animations/             # Motion, GSAP easing, physics curve lab
│   │   │   ├── charts/                 # Recharts, ECharts, D3 interactive charts
│   │   │   ├── resources/              # 459 curated developer resources
│   │   │   └── human/                  # /human artisanal community showcase
│   │   ├── globals.css                 # CSS variables & ambient glow layers
│   │   └── layout.tsx                  # Root HTML shell & font providers
│   ├── components/                     # Atomic UI primitives
│   │   ├── ui/                         # Buttons, Cards, Badges, Modals, Tabs, Tooltips
│   │   ├── layout/                     # AppHeader, AppSidebar, AppFooter
│   │   └── shared/                     # SearchInput, Toast, CopyButton, Breadcrumbs
│   ├── features/                       # Independent domain business logic
│   │   ├── component-library/          # Registry, metadata, human vector icons
│   │   ├── three-d-studio/             # Three.js scene, geometry switcher, R3F generator
│   │   ├── design-tokens/              # Color scales, token generator, tailwind config
│   │   ├── animation-studio/           # Bezier motion runner, loaders, shimmer
│   │   └── resource-library/           # 459 curated directory, search, filter, favorites
│   ├── hooks/                          # Reusable hooks (useTheme, useClipboard, useDebounce)
│   ├── lib/                            # Pure utilities (contrast-ratio, color-mix, slugify)
│   ├── stores/                         # State persistence (theme, favorites, viewport)
│   ├── styles/                         # Design tokens, themes.css, animations.css
│   └── types/                          # TypeScript definitions for resources, projects, components
├── .github/workflows/ci.yml            # CI validation workflow
├── package.json                        # Scripts, dependencies, and metadata
├── index.html                          # Zero-build interactive entrypoint
├── style.css                           # Design tokens & theme definitions
└── README.md                           # Documentation
```

---

## 3. Technology Integration Rationale

| Layer | Selected Tech | Purpose & Value |
| :--- | :--- | :--- |
| **Framework** | Next.js App Router + React + TypeScript | Clean SSR/SSG for resource catalog SEO, client boundaries for 3D/canvas |
| **3D Engine** | Three.js + React Three Fiber + Drei | GPU-accelerated spatial geometry testing, parametric meshes, R3F export |
| **Styling** | CSS Variables + Tailwind CSS | High-speed responsive utilities with multi-theme runtime swapping |
| **Icons** | Custom Human Vector SVGs | 100% human-crafted avatars, teammates, and artisans (no generic emojis) |
| **Testing** | Node.js Test Suite + Vitest / Playwright | Fast CI catalog verification and end-to-end user journey assertions |

---

## 4. Phase Migration Protocol

1. **Phase 1 (Active)**: Zero-build modular HTML/JS/CSS application serving all 459 resources, 30 projects, and Three.js 3D lab.
2. **Phase 2 (Scaffold)**: Scaffold type definitions (`src/types/`), data adapters, and modular features.
3. **Phase 3 (Next.js Hybrid)**: Wire Next.js App Router components while preserving static deployment outputs.
