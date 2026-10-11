# Testing Strategy: Mahi UI Component Playground

**Date:** 2026-10-11  
**Approach:** Multi-Layered Quality Verification Pipeline  

---

## 1. Verification Layers

The testing strategy implements 7 distinct, non-overlapping verification gates:

```
[ Gate 1: AST Linter & Security Scanner ]
                   ↓
[ Gate 2: Catalog Schema & URL Integrity ]
                   ↓
[ Gate 3: Ecosystem & DOM Integration ]
                   ↓
[ Gate 4: WCAG Luminance Contrast Unit Tests ]
                   ↓
[ Gate 5: Security & Input Regression Suite ]
                   ↓
[ Gate 6: Accessibility Landmark Audit ]
                   ↓
[ Gate 7: End-to-End User Journey Simulation ]
                   ↓
[ Final: TypeScript Typecheck & Next.js Production Build ]
```

---

## 2. Automated Commands

All test scripts are configured directly in `package.json`:

```bash
# Full test suite execution
npm test

# Specialized test runners
npm run lint           # Strict AST security scan
npm run typecheck      # TypeScript compilation check
npm run test:catalog   # Resource and project schema validation
npm run test:unit      # Mathematical contrast ratio calculations
npm run test:a11y      # WCAG landmark and focus token checks
npm run test:ecosystem # Studio & interactive module mounts
npm run test:e2e       # Simulated multi-step user workflows
npm run build          # Production compiler & static page generator
```

---

## 3. Strict Failure Policy

- In accordance with production reliability standards, all test scripts return a **non-zero exit code (`1`)** on any failure.
- Fallback bypasses (such as `|| echo "passed"`) are strictly forbidden and barred by CI lint rules.
