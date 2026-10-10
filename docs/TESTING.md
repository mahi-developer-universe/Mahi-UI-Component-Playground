# Testing Strategy & Quality Assurance Guide

**Repository:** Mahi UI Component Playground  
**Test Frameworks:** Node.js Assert, TypeScript Compiler (`tsc`), WCAG 2.1 Contrast Testing, Next.js Production Build Validation.

---

## 1. Test Command Overview

```bash
# Run complete test verification pipeline
npm test

# Run TypeScript static type checking
npm run typecheck

# Run Next.js production build verification
npm run build

# Run catalog link and resource validation
npm run test:catalog

# Run accessibility WCAG standards audit
npm run test:a11y

# Run color contrast ratio unit tests
npm run test:unit
```

---

## 2. Test Suites Detailed Breakdown

### A. Catalog & Project Integrity (`scripts/validate-catalog.js`)
- Validates all 459 resource URLs against strict URI standards.
- Confirms zero duplicate URLs, zero broken schemes, and safe JSON parsing.
- Verifies all 30 frontend projects and 7 component suites.

### B. Modern Frontend Ecosystem Integration (`scripts/test-ecosystem.js`)
- Asserts package.json scripts and metadata consistency.
- Tests that all 30 roadmap projects link to callable interactive modules.
- Confirms Three.js WebGL canvas and spatial studio DOM architecture.
- Validates 5 design themes in CSS tokens.

### C. Contrast Ratio Unit Tests (`tests/unit/contrast-calculator.test.js`)
- Asserts mathematical correctness of WCAG 2.1 relative luminance algorithm:
  - Black on White (21:1)
  - White on Black (21:1)
  - Brand accents against dark and light theme backgrounds (≥ 4.5:1 AA, ≥ 7:1 AAA).

### D. Accessibility & WCAG Standards Audit (`tests/accessibility/a11y-check.test.js`)
- Verifies HTML `lang="en"`, font preconnects, and semantic landmark tags (`<header>`, `<aside>`, `<main>`).
- Asserts visible focus ring CSS tokens across all themes.

### E. End-to-End Simulation (`tests/e2e-simulation.js`)
- Verifies critical interactive DOM IDs in index.html.
- Validates runtime event handlers (theme switcher, viewport resize, code copy, catalog filter).
- Confirms governance files (`SECURITY.md`, `LICENSE`, `CONTRIBUTING.md`).
