# Mahi UI Component Playground 🚀

A comprehensive, production-oriented frontend developer platform, UI component showcase, and interactive 3D laboratory built on **Next.js App Router (Turbopack), React 19, TypeScript, Three.js, Lucide Icons, and Zustand**. Inspired by **Cult UI, Forge UI, 21st.dev, Magic UI, Aceternity UI, and Evil Charts**.

---

## 🛠️ Technology Stack & Architecture

- **Primary Application Framework**: Next.js 16 (App Router + Turbopack)
- **UI Engine**: React 19 + TypeScript (Strict Type Safety)
- **3D Spatial Graphics**: Three.js WebGL Engine (Interactive Geometry & React Three Fiber Code Exporter)
- **Client State Management**: Zustand (`src/stores/appStore.ts`)
- **Schema Validation & Integrity**: Zod (`src/types/index.ts`)
- **Styling & Design Tokens**: CSS Custom Properties (`src/styles/tokens.css`, `themes.css`) with 5 Curated Themes
- **Icons**: Lucide React + Human Vector SVG Artisans (No generic emojis)
- **Quality Gates**: Node.js Automated E2E, Catalog Auditing, and TypeScript Verification (`npm test`, `npm run typecheck`)
- **Backwards Compatibility**: Preserved legacy static server fallback (`npm run legacy:serve`)

---

## ✨ Features

- **7 Core Interactive Component Suites**:
  - Buttons (Glowing borders, micro-press, gradients, shimmers)
  - Badges & Status Chips (Pills, live indicators, gradient glows)
  - Bento Grid & Feature Cards (Glassmorphism, spotlights, metrics)
  - Tooltips & Hover Annotations (Directions, micro-animations)
  - Modals & Action Dialogs (Glassmorphic backdrops, confirmation panels)
  - Interactive Tab Switchers (Smooth slide indicators)
  - Action Dropdowns & Menus (Keyboards, user profile actions)
- **Modern Frontend Ecosystem Studios**:
  - 🌐 **Three.js 3D Spatial Geometry Lab**: Client WebGL viewport with geometry switching (Torus Knot, Cube, Sphere, Icosahedron, Octahedron), wireframe modes, dynamic lighting, and React Three Fiber (R3F) code generator.
  - 🎨 **Design System Token & Ramp Studio**: 10-step mathematical color ramp generator with instant CSS Custom Properties and `tailwind.config.js` export.
  - 📱 **Responsive Hardware Device Previewer**: Multi-device viewport bezel simulator (Mobile 375px, Tablet 680px, Desktop 100%) with orientation and touch testing.
  - 📦 **Multi-Stack Code Exporter**: Instant toggles between React + TypeScript, Vanilla CSS, and Tailwind CSS component code.
- **5 Canonical Design System Themes**:
  - 🌲 `emerald`: Emerald Forest (Primary brand preset)
  - 🌙 `dark`: Midnight Dark
  - ☀️ `light`: Clean Light
  - ⚡ `cyberpunk`: Cyberpunk Neon
  - 🌅 `sunset`: Sunset Warmth / Amber Glow
- **30 Frontend Developer Projects**:
  - Complete curriculum across 6 industry-grade categories (UI & Animation, Tools & Generators, Inspiration & Discovery, Productivity, Portfolio Apps, and Creative Experiments).
  - Built-in interactive sandboxes: Button FX Lab, Cubic-Bezier Easing Lab, Animated Loaders, Live Interactive Charts, Mesh Gradient Studio, Halftone Dither Canvas, SVG Logo Maker, Color Contrast/A11y Inspector, SaaS Metric Dashboard, Kanban Board, Dynamic Pricing Calculator, and more.
- **459 Curated Resources Directory**:
  - Searchable, categorized repository of design systems, AI tools, animation libraries, inspiration galleries, and developer utilities.
  - Zero duplicate URLs, zero invalid links, category filters, live search, and local bookmarking/favorites.
- **Dedicated `/human` Collective Hub**:
  - Philosophy and community showcase featuring human vector icons (avatars, teammates, handcraft icons — no generic robotic emojis).
- **High-Impact CTA & Quick Integration**:
  - Fast-start developer callouts and one-click code copy across all components and tools.

---

## 📁 Project Structure

For complete architectural details, see [docs/folder-structure.md](./docs/folder-structure.md) and [docs/architecture.md](./docs/architecture.md).

```text
Mahi-UI-Component-Playground/
├── public/                 # Static public assets (images, icons, fonts)
├── src/
│   ├── app/                # Next.js App Router (layout.tsx, page.tsx, globals.css)
│   ├── components/         # Reusable atomic UI elements (ComponentCard, ProjectCard, ResourceCard)
│   ├── features/           # Feature domains (ThreeLab, Component Playground, Theme Studio, etc.)
│   ├── data/               # Curated single source of truth (components, projects, resources, themes)
│   ├── stores/             # Zustand state management (theme, activeTab, favorites, 3D modal)
│   ├── styles/             # Design tokens, theme variables, and CSS utilities
│   ├── lib/                # Utility helpers (cn, copyToClipboard, calculateContrastRatio)
│   ├── config/             # Navigation and app settings
│   └── types/              # TypeScript definitions and contracts
├── tests/                  # Automated verification & testing suites
├── scripts/                # Validation and ecosystem scripts
└── docs/                   # Architecture, migration, folder structure & contributor guides
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/mahi-developer-universe/Mahi-UI-Component-Playground.git
cd Mahi-UI-Component-Playground
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the Development Server (Next.js)
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

### 5. Legacy Fallback (Optional)
If running without Node/Next.js build tools:
```bash
npm run legacy:serve
```

---

## 🧪 Quality Gates & Verification

Run the full automated test suite (verifies all 459 resources, 30 projects, 7 component suites, E2E simulated user journeys, and runs TypeScript type checking):

```bash
npm test
```

Individual checks:
```bash
# Typecheck with TypeScript
npm run typecheck

# Validate catalog schemas & verify 0 broken resource links
npm run test:catalog

# Test interactive ecosystem integrations
npm run test:ecosystem

# Run simulated E2E user journeys
npm run test:e2e
```

---

## 🎨 Theme System & Customization

Mahi UI uses CSS Custom Properties defined in [src/styles/tokens.css](./src/styles/tokens.css) and [src/styles/themes.css](./src/styles/themes.css):

```css
:root {
  --bg-primary: #090d16;
  --bg-card: rgba(18, 24, 38, 0.7);
  --accent-primary: #10b981;
  --accent-secondary: #06b6d4;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border-color: rgba(255, 255, 255, 0.1);
  --glass-blur: 16px;
}
```

Themes can be switched programmatically via `document.documentElement.setAttribute('data-theme', themeName)` or via the Zustand store `useAppStore.getState().setTheme(themeName)`.

---

## 🤝 Community & Contributing

Contributions are warmly welcomed! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) to learn how to add new components, interactive tools, or resources.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.