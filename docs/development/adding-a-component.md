# Guide: Adding a New Component

This guide provides step-by-step instructions for adding a new UI component to the **Mahi UI Component Playground** design system.

---

## 1. Determine Component Scope

Before writing code, decide where the component belongs:
1. **Generic Primitive (`src/components/ui/`)**: Reusable across multiple pages, headless or purely presentational, zero business logic (e.g. `Tag`, `DatePicker`, `Accordion`).
2. **Layout Element (`src/components/layout/`)**: Application scaffolding (e.g. `Navbar`, `Drawer`).
3. **Feature-Specific Component (`src/features/[feature]/components/`)**: Exclusively used by a specific studio or workspace.

---

## 2. Step-by-Step Implementation Workflow

### Step 2.1: Create Component File
Create the component in `src/components/ui/[ComponentName].tsx`:

```tsx
'use client';

import * as React from 'react';
import { clsx } from 'clsx';

export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'mahi-component-name',
          `mahi-component-name--${variant}`,
          `mahi-component-name--${size}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

### Step 2.2: Export from the UI Barrel
Open `src/components/ui/index.ts` and add the re-export:
```ts
export * from './ComponentName';
```

### Step 2.3: Register in the Component Catalog
If this component should appear in the Component Catalog / Playground, add an entry to `src/data/components/components.json`:
```json
{
  "id": "component-name",
  "name": "Component Name",
  "category": "feedback",
  "description": "Accessible and responsive description of the component.",
  "code": "<ComponentName variant=\"primary\">Click me</ComponentName>",
  "tags": ["ui", "feedback", "accessible"]
}
```

### Step 2.4: Add Tests
Create a unit or a11y test in `tests/`:
- Test keyboard interactions and ARIA attributes.
- Ensure color contrast ratios conform to WCAG 2.1 AA (4.5:1 for normal text).

### Step 2.5: Run Quality Checks
```bash
npm run typecheck
node scripts/lint.js
npm test
```
