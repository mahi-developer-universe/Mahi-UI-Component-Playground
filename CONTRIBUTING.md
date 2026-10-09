# Contributing to Mahi UI Component Playground 🤝

Thank you for your interest in contributing to **Mahi UI Component Playground**! We are committed to fostering an open, welcoming, and inclusive community.

## Development Workflow

1. **Fork and clone** the repository:
   ```bash
   git clone https://github.com/<your-username>/Mahi-UI-Component-Playground.git
   cd Mahi-UI-Component-Playground
   ```
2. **Install dependencies** (if any) or launch local server:
   ```bash
   npm start
   # or: npx serve -l 3000
   ```
3. **Run the automated audit and ecosystem test suite**:
   ```bash
   npm test
   ```

## Adding New Components

- All component previews must use **Human Vector SVG icons only** (avatars, teammates, artisans; no robotic or generic emojis).
- Provide semantic HTML and zero-runtime CSS custom properties.
- Register entries in `components-data.js` and add corresponding CSS in `components.css`.

## Adding New Resources to the Catalog

- Validate all URLs with `node scripts/validate-catalog.js`.
- Never submit affiliate links, redirects, or broken domains.
- Assign an existing primary category:
  - `Component Libraries & UI Kits`
  - `Animation & Visual Effects`
  - `UI/UX Inspiration & Galleries`
  - `Design Utilities & Generators`
  - `Developer Productivity & Tools`
  - `AI & Creative Intelligence`
  - `Icons & Vector Assets`
  - `Charts & Data Visualization`

## Pull Request Guidelines

- Ensure `npm test` passes with zero errors before opening a PR.
- Reference related issues and explain the motivation behind your changes.
