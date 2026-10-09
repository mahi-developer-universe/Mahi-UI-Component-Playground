# Product Roadmap, Gaps & Future Enhancements

This document provides a comprehensive audit of solved challenges, current gaps, and planned future enhancements for **Mahi UI Component Playground**.

---

## 🏆 1. Summary of Completed Improvements (Sprint 1 & 2)

- [x] **Architecture Modernization**: Transitioned into a Next.js App Router (Turbopack) + React 19 + TypeScript architecture while preserving offline fallback.
- [x] **Working Project Launchers**: Replaced placeholder toast triggers with functional in-app modal workbenches (`ProjectModal.tsx`) and dedicated dynamic routes (`/projects/[id]`).
- [x] **Zero Data Loss**: 100% preservation of:
  - 7 interactive component suites
  - 30 frontend developer projects
  - 459 verified resources (0 broken links, 0 duplicate URLs)
  - 5 canonical themes (`emerald`, `dark`, `light`, `cyberpunk`, `sunset`)
- [x] **Client-Side State Persistence**: Configured Zustand with `localStorage` persistence under `mahi-ui-storage` for theme selection, bookmarked favorites, and recent project history.
- [x] **Automated CI & Quality Gates**: CI pipeline enforcing catalog checks, ecosystem integration, E2E simulation, `tsc --noEmit`, and `next build`.
- [x] **Security Hardening**: Replaced `eval()` with safe `JSON.parse` across catalog validation scripts.
- [x] **IDE Watcher Hygiene**: Excluded `node_modules` (including `meshoptimizer`) and `.next` in `.vscode/settings.json`.

---

## 🔍 2. Audit of Known Gaps & Current Limitations

| Area | Current Limitation | Impact | Planned Resolution |
|---|---|---|---|
| **Syntax Highlighting** | Code snippets use standard mono styling rather than dynamic syntax tokenizers. | Minor visual | Integrate lightweight syntax highlighter (`prismjs` or `shiki`). |
| **Component Playground Live Code Editing** | Code snippets are copyable, but in-place code editing is previewed via preset props rather than a live WebContainer / sandboxed iframe. | Moderate developer capability | Build a sandboxed live JSX editor using `react-live` or `@monaco-editor/react`. |
| **End-to-End Browser Testing** | Tests run via Node.js script simulation (`tests/e2e-simulation.js`) rather than headless browser engines. | Testing coverage | Configure Playwright (`@playwright/test`) for headless Chromium / WebKit testing. |
| **Resource Broken Link Auto-Auditing** | External link health is checked for URL protocol syntax and duplicate hashes, but live HTTP status codes are not polled during builds to avoid rate limits. | Catalog maintenance | Create an optional background script (`scripts/audit-link-health.js`) with batch concurrency and rate limiting. |

---

## 🚀 3. Future Enhancements Roadmap

### Phase 1: Interactive Devtools & Advanced Studios (P1)
- [ ] **Live Component Property Workbench**:
  - Direct prop controls (padding, variant, border-radius, color scale) that immediately update live previews and generate synchronized Tailwind CSS and JSX snippets.
- [ ] **Design Token Studio v2**:
  - Full color harmony generator (complementary, triadic, analogous).
  - One-click export to `tokens.json`, `tailwind.config.ts`, and CSS variables.
- [ ] **Enhanced Three.js Spatial Lab**:
  - Custom 3D model loader (`.gltf` / `.glb` drag-and-drop).
  - OrbitControls panning, camera presets, environment lighting HDR maps, and exportable R3F scenes.

### Phase 2: Collaboration & Developer Productivity (P2)
- [ ] **Custom Snippet & Bookmark Export**:
  - JSON import/export capability for user-curated resources and custom design bookmarks.
- [ ] **Accessible Contrast Inspector v2**:
  - Real-time color picker with auto-suggested nearest compliant color alternatives for WCAG 2.2 AAA thresholds.
- [ ] **Device Frame Emulator Enhancements**:
  - Hardware device frames with orientation toggles, network throttling presets, and touch event emulation.

### Phase 3: Open-Source Governance & Ecosystem (P3)
- [ ] **Playwright Cross-Browser Testing Suite**:
  - Automated smoke tests across desktop Chrome, Safari, and mobile viewports.
- [ ] **Interactive Community Submissions**:
  - GitHub Issue Template workflow for automated PR validation of newly submitted resources or UI components.
