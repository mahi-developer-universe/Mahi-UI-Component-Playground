# Codebase Naming Conventions

To maintain a consistent, intuitive, and professional developer experience across the **Mahi UI Component Playground** codebase, adhere strictly to the following naming conventions.

---

## 1. File & Directory Naming

| Category | Convention | Examples |
| :--- | :--- | :--- |
| **React Components** | `PascalCase.tsx` | `Button.tsx`, `CommandPalette.tsx`, `AppShell.tsx` |
| **Custom Hooks** | `camelCase.ts` starting with `use` | `useMounted.ts`, `useMediaQuery.ts`, `useTheme.ts` |
| **Pure Utilities** | `camelCase.ts` | `color.ts`, `clipboard.ts`, `formatters.ts` |
| **Infrastructure / Lib** | `camelCase.ts` | `exporter.ts`, `rateLimit.ts`, `sessionSecurity.ts` |
| **Zustand Stores** | `camelCase.ts` ending with `Store` | `appStore.ts`, `bookmarkStore.ts`, `preferencesStore.ts` |
| **TypeScript Types** | `camelCase.types.ts` or `domain.ts` | `project.types.ts`, `theme.types.ts`, `registry.ts` |
| **JSON Catalogs** | `lowercase-plural.json` | `resources.json`, `projects.json`, `components.json` |
| **Unit Tests** | `[target].test.ts(x)` or `[target].test.js` | `contrast-calculator.test.js`, `Button.test.tsx` |
| **Playwright E2E Specs**| `[feature].spec.ts` | `navigation.spec.ts`, `playground.spec.ts`, `export.spec.ts` |
| **Feature Directories** | `kebab-case` | `features/code-playground/`, `features/three-d-studio/` |
| **Next.js App Routes** | `kebab-case` (App Router standards) | `app/projects/`, `app/studios/`, `app/favorites/` |

---

## 2. Code Element Naming

### 2.1 React Components & Props
- Component functions must be named in `PascalCase`:
  ```tsx
  export function ProjectCard({ project, onSelect }: ProjectCardProps) { ... }
  ```
- Component interfaces/types must be suffixed with `Props`:
  ```tsx
  export interface ProjectCardProps {
    project: Project;
    onSelect?: (id: string) => void;
  }
  ```

### 2.2 Hooks
- Always prefix with `use`:
  ```ts
  export function useMediaQuery(query: string): boolean { ... }
  ```

### 2.3 Constants & Configs
- True compile-time primitives/constants must be in `SCREAMING_SNAKE_CASE`:
  ```ts
  export const MAX_EXPORT_SIZE_BYTES = 50 * 1024 * 1024;
  export const DEFAULT_THEME_ID = 'emerald';
  ```
- Configuration objects can use `camelCase`:
  ```ts
  export const siteConfig = {
    name: 'Mahi UI Component Playground',
    version: '1.0.0',
  };
  ```

### 2.4 TypeScript Types & Interfaces
- Types, interfaces, and enums must use `PascalCase`:
  ```ts
  export type ThemeMode = 'dark' | 'light' | 'emerald' | 'cyberpunk' | 'sunset';
  export interface ResourceItem { ... }
  ```
- Do not prefix interfaces with `I` (e.g. use `ComponentMetadata`, not `IComponentMetadata`).

---

## 3. Ambiguous Filenames Strictly Prohibited

Never introduce vague, catch-all filenames that obscure responsibility:
- ❌ `helpers.ts` → Use domain names: `urlUtils.ts`, `stringUtils.ts`.
- ❌ `common.ts` → Use explicit names: `designTokens.ts`, `sharedTypes.ts`.
- ❌ `temp.ts` or `test.ts` → Name by target unit: `exporter.test.ts`.
- ❌ `misc.ts` → Split into dedicated functions or integrate into owning feature.
