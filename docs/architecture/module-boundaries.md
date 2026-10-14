# Module Boundaries & Architecture Rules

This document establishes strict boundaries between layers and features within **Mahi UI Component Playground** to guarantee long-term maintainability, avoid circular dependencies, and ensure scalable growth.

---

## 1. Architectural Layers & Dependency Hierarchy

Dependencies must flow strictly downward through the architecture layers:

```mermaid
graph TD
    App[1. App Layer (src/app)] --> Features[2. Feature Modules (src/features)]
    App --> Components[3. Shared Components (src/components)]
    Features --> Components
    Features --> Stores[4. State Management (src/stores)]
    Features --> Hooks[5. Shared Hooks (src/hooks)]
    Components --> Hooks
    Features --> Lib[6. Infrastructure & Adapters (src/lib)]
    Features --> Utils[7. Pure Utilities (src/utils)]
    Components --> Utils
    Lib --> Utils
    Stores --> Types[8. Types & Contracts (src/types)]
    Utils --> Types
    Features --> Data[9. Data Catalogs (src/data)]
```

---

## 2. Layer Definitions & Contracts

### 1. `src/app/` (Next.js App Router)
- **Role**: Route resolution, server-side data fetching, page composition, dynamic route mapping (`/projects/[id]`, `/studios`).
- **Imports Allowed**: Any exported module from `features/`, `components/`, `stores/`, `lib/`, `data/`, `config/`.
- **Prohibitions**:
  - No low-level DOM manipulations or business logic inside page components.
  - Never import from a feature's internal subfolder (`features/foo/components/internal`); only import from the feature root or public exports.

### 2. `src/features/` (Domain Features)
- **Role**: Encapsulated business capability (e.g., `code-playground`, `three-d-studio`, `theme-studio`, `project-workspace`).
- **Internal Structure**:
  ```
  features/my-feature/
  ├── components/          # Private components used only within this feature
  ├── hooks/               # Feature-specific hooks
  ├── types/               # Feature-specific types
  ├── utils/               # Feature-specific helper math or formatting
  └── index.ts             # Public export barrier
  ```
- **Prohibitions**:
  - Sibling cross-imports are strictly forbidden. Feature A must never import from `features/feature-b/components/PrivateWidget.tsx`.
  - Never import from `src/app/`.

### 3. `src/components/` (Shared UI System)
- **Role**: Reusable, presentation-focused UI widgets adhering to the Mahi UI Design System.
- **Sub-packages**:
  - `ui/`: Primitive building blocks (`Button`, `Modal`, `Tabs`, `Input`, `Card`).
  - `layout/`: Top-level wireframe components (`Header`, `Sidebar`, `Footer`, `AppShell`).
  - `navigation/`: Central navigation links and menus.
  - `shared/`: Generic multi-page widgets (`FAQAccordion`, `HeroSection`, `CookieBanner`).
- **Prohibitions**:
  - `components/ui/` primitives must be headless/stateless or purely presentational. They must NEVER import from `src/features/` or `src/app/`.

### 4. `src/stores/` (Zustand Micro-Stores)
- **Role**: Reactive client-side application state.
- **Prohibitions**:
  - Stores must never import React components.
  - Stores must only interact with storage via `lib/storage.ts` or pure helpers.

### 5. `src/lib/` (Infrastructure & Adapters)
- **Role**: Heavyweight third-party library integrations, runtime platform abstractions, security mechanisms:
  - `exporter.ts`: JSZip project bundler.
  - `rateLimit.ts`: In-memory and cookie token-bucket rate limiter.
  - `security.ts`: Input sanitization and XSS protection.
  - `sessionSecurity.ts`: CSRF and session token lifecycle.

### 6. `src/utils/` (Pure Helper Functions)
- **Role**: Deterministic, framework-free functions:
  - Color math (HEX to HSL, WCAG contrast calculation).
  - String manipulation, formatting, and date math.
  - Array partitioning and sorting.
- **Prohibitions**:
  - No side effects, no React imports, no global state dependencies.

---

## 3. Circular Dependency Prevention

1. **Top-level barrel files (`index.ts`)**:
   - Keep barrel files clean and avoid self-referencing re-exports.
2. **Type-only imports**:
   - Always use `import type { Foo } from '@/types'` for TypeScript types to eliminate circular runtime graph creation.
3. **Automated Verification**:
   - CI runs `tsc --noEmit` and our custom code quality validator (`scripts/lint.js`) to guarantee clean module resolution across all files.
