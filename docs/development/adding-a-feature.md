# Guide: Adding a New Feature or Studio Workspace

This guide outlines the standard procedure for creating a new business feature, studio workspace, or generator within **Mahi UI Component Playground**.

---

## 1. Feature Architecture Directory Anatomy

Each major feature lives inside `src/features/[feature-name]/`. Only create the subfolders that the feature actually requires:

```
src/features/example-feature/
├── components/          # Feature-private React components
│   ├── ExampleCanvas.tsx
│   └── ExampleToolbar.tsx
├── hooks/               # Feature-specific state and logic hooks
│   └── useExampleEngine.ts
├── types/               # Feature-specific TypeScript contracts
│   └── example.types.ts
├── utils/               # Pure helper calculations for this feature
│   └── mathHelpers.ts
├── ExampleFeature.tsx   # Top-level feature container view
└── index.ts             # Public export barrier
```

---

## 2. Step-by-Step Implementation Workflow

### Step 2.1: Initialize Feature Directory
Choose a concise `kebab-case` name (e.g. `gradient-mesh-studio`):
```bash
mkdir -p src/features/gradient-mesh-studio/components
```

### Step 2.2: Implement the Feature View
Create `src/features/gradient-mesh-studio/GradientMeshStudio.tsx`:
```tsx
'use client';

import * as React from 'react';
import { Button, Card } from '@/components/ui';

export function GradientMeshStudio() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold">Gradient Mesh Studio</h2>
      <p className="text-sm text-neutral-400">Interactive WebGL gradient mesh editor.</p>
    </Card>
  );
}
```

### Step 2.3: Define Public Feature Exports (`index.ts`)
Create `src/features/gradient-mesh-studio/index.ts`:
```ts
export { GradientMeshStudio } from './GradientMeshStudio';
```

### Step 2.4: Mount in the App Router
If the feature has a dedicated route, create the page inside `src/app/studios/page.tsx` or `src/app/[route]/page.tsx`:
```tsx
import { GradientMeshStudio } from '@/features/gradient-mesh-studio';

export default function StudioPage() {
  return (
    <main className="container mx-auto py-8">
      <GradientMeshStudio />
    </main>
  );
}
```

### Step 2.5: Register Workspace in Projects Catalog
If the feature corresponds to one of the 30 interactive workspaces, register its metadata in `src/data/projects/projects.json`:
```json
{
  "id": "project-31",
  "name": "Gradient Mesh Studio",
  "category": "Creative Experiments",
  "description": "Multi-point mesh gradient generator with real-time CSS/SVG export.",
  "status": "stable",
  "workspaceUrl": "/studios?tab=mesh"
}
```

### Step 2.6: Validate Implementation
```bash
npm run typecheck
node scripts/lint.js
npm test
npm run build
```
