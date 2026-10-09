# Mahi UI Component Playground 🚀

A comprehensive, production-oriented frontend developer platform and interactive 3D laboratory built on **Next.js App Router, React 19, TypeScript, Three.js, and Lucide Icons**. Inspired by **Cult UI, Forge UI, 21st.dev, Magic UI, Aceternity UI, and Evil Charts**.

---

## 🛠️ Technology Stack & Architecture

- **Primary Application Framework**: Next.js 16 (App Router + Turbopack)
- **UI Engine**: React 19 + TypeScript
- **3D Spatial Graphics**: Three.js WebGL Engine (Interactive Geometry & React Three Fiber Exporter)
- **State Management**: React Client Boundaries + Zustand
- **Schema Validation**: Zod
- **Styling & Design Tokens**: CSS Custom Properties (5 Curated Themes) + Tailwind Token Export
- **Icons**: Lucide React + Human Vector SVG Artisans (No generic emojis)
- **Testing & Auditing**: Node.js Automated E2E & Catalog Audit Suite (`npm test`)

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
  - 🌐 **Three.js 3D Spatial Geometry Lab**: Client WebGL viewport with geometry switching (Torus Knot, Cube, Sphere, Cone), wireframe modes, dynamic lighting, and React Three Fiber (R3F) code generator.
  - 🎨 **Design System Token & Ramp Studio**: 10-step mathematical color ramp generator with instant CSS Custom Properties and `tailwind.config.js` export.
  - 📱 **Responsive Hardware Device Previewer**: Multi-device viewport bezel simulator (Mobile 375px, Tablet 680px, Desktop 100%) with orientation and touch testing.
  - 📦 **Multi-Stack Code Exporter**: Instant toggles between React + TypeScript, Vanilla CSS, and Tailwind CSS component code.
- **Viewport Testing Engine**:
  - Live preview resizers: Mobile (`380px`), Tablet (`720px`), and Desktop (`100%`).
- **5 Dynamic Design System Themes**:
  - 🌙 Midnight Dark
  - ☀️ Clean Light
  - ⚡ Cyberpunk Neon
  - 🌲 Emerald Forest
  - 🌅 Sunset Violet
- **30 Frontend Developer Projects**:
  - Complete curriculum across 6 industry-grade categories (UI & Animation, Tools & Generators, Inspiration & Discovery, Productivity, Portfolio Apps, and Creative Experiments).
  - Built-in interactive sandboxes: Button FX Lab, Cubic-Bezier Easing Lab, Animated Loaders, Live Interactive Charts, Mesh Gradient Studio, Halftone Dither Canvas, SVG Logo Maker, Color Contrast/A11y Inspector, SaaS Metric Dashboard, Kanban Board, Dynamic Pricing Calculator, and more.
- **459 Curated Resources Directory**:
  - Searchable, categorized repository of design systems, AI tools, animation libraries, inspiration galleries, and developer utilities.
  - Category filters, live search, and local bookmarking/favorites.
- **Dedicated `/human` Collective Hub**:
  - Philosophy and community showcase with **exclusively human vector icons** (avatars, teammates, handcraft icons — no generic robotic emojis).
- **High-Impact CTA & Quick Integration**:
  - Fast-start developer callouts and one-click code copy across all components and tools.

---

## 🛠️ Project Structure

```text
Mahi-UI-Component-Playground/
├── index.html               # Main application shell with navbar, sidebar, hero, playground & modals
├── style.css                # Global design tokens (5 themes), glassmorphic styling, responsive layout
├── components.css           # Component styles for buttons, cards, badges, tabs, tooltips, modals, etc.
├── components-data.js       # Component definitions, preview markup, and copyable snippets (human icons)
├── all-projects-data.js     # Registry of 30 frontend developer projects across 6 categories
├── interactive-modules.js   # Live interactive sandbox engines (charts, easing, gradients, dither, etc.)
├── resources-data.js        # 459 verified resources with categories, tags, and URLs
├── app.js                   # Application controller (themes, viewports, search, routing, favorites)
└── scripts/
    ├── validate-catalog.js  # Automated catalog & project schema validator
    └── clean-urls.js        # Data sanitization script
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/mahi-developer-universe/Mahi-UI-Component-Playground.git
cd Mahi-UI-Component-Playground
```

### 2. Run Locally
Because this project is built with zero build step dependencies, you can run it with any static server:

```bash
# Using npx serve (recommended)
npx -y serve -l 3000

# Or using Python
python -m http.server 3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Automated Catalog & Schema Validation

To verify all 459 resources, 30 projects, and 7 component suites:

```bash
node scripts/validate-catalog.js
```

Output:
```text
🔍 Starting catalog & project verification...
✅ Loaded 459 resources from resources-data.js
📊 Total unique URLs: 459 (duplicate URLs detected: 0)
📊 Invalid URLs: 0
✅ Loaded 30 frontend projects from all-projects-data.js
✅ Loaded 7 component suites from components-data.js
🎉 ALL CATALOG AND REGISTRY AUDITS PASSED WITH ZERO BLOCKING ERRORS!
```

---

## 🎨 Theme System & Customization

Mahi UI uses CSS Custom Properties defined in [style.css](file:///f:/Mahi-UI-Component-Playground/style.css):

```css
:root {
  --bg-primary: #090d16;
  --bg-card: rgba(18, 24, 38, 0.7);
  --accent-primary: #6366f1;
  --accent-secondary: #06b6d4;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border-color: rgba(255, 255, 255, 0.1);
  --glass-blur: 16px;
}
```

Themes can be switched programmatically via `document.documentElement.setAttribute('data-theme', themeName)`:
- `dark` (Midnight Dark)
- `light` (Clean Light)
- `neon` (Cyberpunk Neon)
- `emerald` (Emerald Forest)
- `violet` (Sunset Violet)

---

## 🤝 Community & Contributing

Contributions are warmly welcomed! Please read [CONTRIBUTING.md](file:///f:/Mahi-UI-Component-Playground/CONTRIBUTING.md) to learn how to add new components, interactive tools, or resources.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](file:///f:/Mahi-UI-Component-Playground/LICENSE) file for details.