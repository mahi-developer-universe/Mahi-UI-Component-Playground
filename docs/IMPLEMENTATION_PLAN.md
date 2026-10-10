# Implementation Plan

**Project:** Mahi UI Component Playground  
**Target:** Production-Grade Frontend Developer Platform  
**Architecture:** Next.js App Router, React 19, TypeScript, Zustand, Zod, Vanilla CSS custom properties.

---

## Stage 1: Component Registry & Schema Architecture (P0)
1. **Schema Contracts (`src/types/registry.ts`)**:
   - Define Zod schemas for components, props, prop types (boolean, string, number, select/enum, color), variants, and code export templates.
2. **Canonical Registry (`src/data/components/registry.ts`)**:
   - Provide typed, validated component definitions for all suites (Buttons, Badges, Cards, Tooltips, Modals, Tabs, Dropdowns, Inputs, Switches, Sliders).
3. **Core UI Primitives (`src/components/ui/`)**:
   - Build reusable primitives: `Button.tsx`, `Badge.tsx`, `Input.tsx`, `Select.tsx`, `Slider.tsx`, `Switch.tsx`, `Tabs.tsx`, `Dialog.tsx`, `Tooltip.tsx`, `CopyButton.tsx`.

---

## Stage 2: Interactive Component Playground Feature (P0)
1. **Live Property Editor (`src/features/code-playground/PropertyEditor.tsx`)**:
   - Dynamically render controls based on component prop definitions (text inputs, selects, toggles, color pickers, sliders).
2. **Preview Canvas (`src/features/code-playground/PreviewCanvas.tsx`)**:
   - Render the component live in mobile (380px), tablet (720px), and desktop (100%) viewport modes.
3. **Synchronized Code Generator (`src/features/code-playground/CodeExporter.tsx`)**:
   - Generate exact, matching output for React + TypeScript, HTML + CSS, and Tailwind CSS based on currently selected props.
4. **Playground Route / Module (`src/features/code-playground/index.tsx`)**:
   - Integrate property editor, preview canvas, and code viewer into a seamless experience.

---

## Stage 3: Design System & Token Studio (P1)
1. **Color Palette Generator (`src/features/color-palette-studio/`)**:
   - Generate 10-step tonal color ramps (50-950) from any base hex.
   - Calculate WCAG 2.1 AAA & AA contrast against light and dark backgrounds.
2. **Token Exporter (`src/features/theme-studio/`)**:
   - Export active tokens as CSS Custom Properties, Tailwind configuration, and JSON.
3. **Typography & Spacing Scale Explorer**:
   - Interactive scale previews with font pairings and rem/px measurements.

---

## Stage 4: Creative Labs & Integration (P1)
1. **Three.js 3D Spatial Geometry Lab (`src/features/three-d-lab/`)**:
   - Modularize the 3D lab into clean React component with canvas lifecycle management, wireframe toggles, and R3F code export.
2. **Animation & Easing Studio (`src/features/animation-lab/`)**:
   - Interactive cubic-bezier curve editor, keyframe animation presets, and live preview.

---

## Stage 5: Testing, Documentation & CI (P0)
1. **Automated Unit & Integration Tests**:
   - Test Zod registry schema validation, prop defaults, and code generator output.
2. **Documentation**:
   - Keep `IMPLEMENTATION_PROGRESS.md` and `TESTING.md` up to date.
3. **Build & Release Verification**:
   - Verify `npm run typecheck`, `npm test`, and `npm run build`.
