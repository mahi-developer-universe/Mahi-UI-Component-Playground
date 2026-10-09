// Component Registry and Source Code Definitions
// Uses Human vector icons exclusively (avatars, humans, team members, handcraft)
const COMPONENTS_DATA = [
  {
    id: "buttons",
    title: "Interactive Buttons",
    category: "buttons",
    description: "Highly polished buttons featuring glowing borders, gradient hover states, shimmering animations, and micro-press dynamics.",
    tags: ["Cult UI", "Forge UI", "21st.dev", "Shadcn"],
    previewHtml: `
<div class="component-group-row">
  <button class="btn btn-primary" onclick="window.triggerSampleAction('Primary Action Clicked')">
    <span class="human-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </span>
    <span>Primary Action</span>
  </button>

  <button class="btn btn-shimmer" onclick="window.triggerSampleAction('Shimmer Neon Button Clicked')">
    <span class="human-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    </span>
    <span>Neon Shimmer</span>
  </button>

  <button class="btn btn-gradient" onclick="window.triggerSampleAction('Gradient Flow Clicked')">
    <span class="human-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="8" r="4"></circle>
        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
      </svg>
    </span>
    <span>Gradient Magic</span>
  </button>

  <button class="btn btn-secondary" onclick="window.triggerSampleAction('Secondary Button Clicked')">
    <span class="human-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
      </svg>
    </span>
    <span>Secondary</span>
  </button>

  <button class="btn btn-outline" onclick="window.triggerSampleAction('Outline Button Clicked')">
    <span class="human-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="8.5" cy="7" r="4"></circle>
        <polyline points="17 11 19 13 23 9"></polyline>
      </svg>
    </span>
    <span>Outline Glow</span>
  </button>

  <button class="btn btn-ghost" onclick="window.triggerSampleAction('Ghost Button Clicked')">
    <span class="human-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 21a6 6 0 0 0-12 0"></path>
        <circle cx="12" cy="11" r="4"></circle>
      </svg>
    </span>
    <span>Ghost View</span>
  </button>
</div>
`,
    htmlCode: `<!-- Primary Button with Human Icon -->
<button class="btn btn-primary">
  <span class="human-icon">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  </span>
  <span>Primary Action</span>
</button>

<!-- Cult UI Inspired Neon Shimmer Button with Human Icon -->
<button class="btn btn-shimmer">
  <span class="human-icon">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  </span>
  <span>Neon Shimmer</span>
</button>

<!-- Forge UI Gradient Flow Button -->
<button class="btn btn-gradient">
  <span class="human-icon">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="8" r="4"></circle>
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
    </svg>
  </span>
  <span>Gradient Magic</span>
</button>`,
    cssCode: `/* Primary Glow Button */
.btn-primary {
  background: var(--accent-primary);
  color: #ffffff;
  box-shadow: 0 4px 14px var(--accent-glow);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.btn-primary:hover {
  background: var(--accent-hover);
  box-shadow: 0 6px 20px var(--accent-glow);
  transform: translateY(-1px);
}
.btn-primary:active { transform: scale(0.97); }

/* Shimmer Animation Button */
.btn-shimmer {
  background: linear-gradient(110deg, #1e1b4b 0%, #312e81 45%, #6366f1 50%, #312e81 55%, #1e1b4b 100%);
  background-size: 200% 100%;
  animation: shimmer 3s infinite linear;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`
  },

  {
    id: "badges",
    title: "Badges & Status Chips",
    category: "badges",
    description: "Compact status indicators, live ping notification dots, and human verification alert pills.",
    tags: ["Shadcn UI", "Status", "Micro-interaction"],
    previewHtml: `
<div class="component-group-row">
  <span class="badge badge-default">
    <span class="human-icon">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    </span>
    Human Verified
  </span>
  <span class="badge badge-primary">
    <span class="human-icon">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    </span>
    Core Team v2.0
  </span>
  <span class="badge badge-pulse">Active Contributor</span>
  <span class="badge badge-success">
    <span class="human-icon">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
    </span>
    Peer Approved
  </span>
  <span class="badge badge-warning">
    <span class="human-icon">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"></circle><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path></svg>
    </span>
    Under Human Review
  </span>
  <span class="badge badge-danger">
    <span class="human-icon">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
    </span>
    Flagged
  </span>
</div>
`,
    htmlCode: `<!-- Human Vector Badges -->
<span class="badge badge-default">
  <span class="human-icon">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  </span>
  Human Verified
</span>

<span class="badge badge-success">
  <span class="human-icon">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <polyline points="17 11 19 13 23 9"></polyline>
    </svg>
  </span>
  Peer Approved
</span>`,
    cssCode: `.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}
.badge-pulse {
  background: var(--accent-light);
  color: var(--accent-primary);
  border: 1px solid var(--accent-primary);
  position: relative;
}
.badge-pulse::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-primary);
  box-shadow: 0 0 8px var(--accent-primary);
  animation: pingDot 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}
@keyframes pingDot {
  0% { transform: scale(0.95); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.5; }
  100% { transform: scale(0.95); opacity: 1; }
}`
  },

  {
    id: "cards",
    title: "Cards & Bento Grid Layouts",
    category: "cards",
    description: "Versatile Bento-box feature cards, realtime metrics dashboards, and human team profiles.",
    tags: ["Cult UI Bento", "21st.dev", "Glassmorphism"],
    previewHtml: `
<div class="cards-layout-preview">
  <!-- Bento Human Card -->
  <div class="bento-card">
    <div class="bento-icon-wrapper">
      <span class="human-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      </span>
    </div>
    <h4>Handcrafted by Engineers</h4>
    <p>Every single line of layout code, animation timing curve, and token is authored with human attention to detail.</p>
    <button class="btn btn-outline" style="margin-top:auto;" onclick="window.openHumanModal()">
      <span class="human-icon">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      </span>
      <span>View /human Collective →</span>
    </button>
  </div>

  <!-- Realtime Metric Card -->
  <div class="stat-card">
    <div class="stat-title">Human Designers Online</div>
    <div class="stat-value">12,480</div>
    <div class="stat-trend positive">
      <span class="human-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
      </span>
      <span>+18.4% monthly community growth</span>
    </div>
  </div>

  <!-- Glassmorphism Card -->
  <div class="glass-glow-card">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
      <span class="badge badge-primary">VERIFIED HUMAN</span>
      <span class="human-icon" style="color: var(--accent-primary);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"></circle><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path></svg>
      </span>
    </div>
    <h4>Design Systems Collective</h4>
    <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">Direct mentorship, review channels, and shared component tokens with senior UI architects.</p>
    <div style="display:flex; gap: 0.5rem;">
      <button class="btn btn-primary" style="flex: 1;" onclick="window.triggerSampleAction('Connected to Human Collective')">Connect</button>
    </div>
  </div>
</div>
`,
    htmlCode: `<!-- Bento Card with Human Vectors -->
<div class="bento-card">
  <div class="bento-icon-wrapper">
    <span class="human-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    </span>
  </div>
  <h4>Handcrafted by Engineers</h4>
  <p>Authored with human attention to detail.</p>
  <button class="btn btn-outline">View Collective →</button>
</div>`,
    cssCode: `.bento-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.bento-card:hover {
  border-color: var(--border-color-hover);
  transform: translateY(-4px);
  box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.4);
}`
  },

  {
    id: "tooltips",
    title: "Tooltips & Hover Annotations",
    category: "tooltips",
    description: "Multi-directional, butter-smooth tooltips with ease-out transitions and clear contrast positioning.",
    tags: ["21st.dev", "Hover", "Micro-interactions"],
    previewHtml: `
<div class="tooltip-group">
  <div class="tooltip-target tooltip-top">
    <button class="btn btn-secondary">
      <span class="human-icon">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      </span>
      <span>Tooltip Top</span>
    </button>
    <span class="tooltip-box">View human profile 👤</span>
  </div>

  <div class="tooltip-target tooltip-bottom">
    <button class="btn btn-secondary">
      <span class="human-icon">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
      </span>
      <span>Tooltip Bottom</span>
    </button>
    <span class="tooltip-box">Open collaborator feed</span>
  </div>

  <div class="tooltip-target tooltip-left">
    <button class="btn btn-secondary">
      <span class="human-icon">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"></circle><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path></svg>
      </span>
      <span>Tooltip Left</span>
    </button>
    <span class="tooltip-box">Manage team roles</span>
  </div>

  <div class="tooltip-target tooltip-right">
    <button class="btn btn-secondary">
      <span class="human-icon">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
      </span>
      <span>Tooltip Right</span>
    </button>
    <span class="tooltip-box">Verify author identity</span>
  </div>
</div>
`,
    htmlCode: `<!-- Directional Tooltips with Human Icons -->
<div class="tooltip-target tooltip-top">
  <button class="btn btn-secondary">
    <span class="human-icon">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </span>
    <span>Tooltip Top</span>
  </button>
  <span class="tooltip-box">View human profile</span>
</div>`,
    cssCode: `.tooltip-target {
  position: relative;
  display: inline-flex;
}
.tooltip-box {
  position: absolute;
  background: #0f172a;
  color: #ffffff;
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.tooltip-top .tooltip-box {
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
}
.tooltip-top:hover .tooltip-box {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}`
  },

  {
    id: "modals",
    title: "Modals & Action Dialogs",
    category: "modals",
    description: "Backdrop-filtered focus dialogs with keyboard Escape support, customizable headers, and spring animations.",
    tags: ["Shadcn Dialog", "Forge UI", "Accessible"],
    previewHtml: `
<div class="component-group-row">
  <button class="btn btn-primary" onclick="window.openShowcaseModal()">
    <span class="human-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="8" r="4"></circle>
        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
      </svg>
    </span>
    <span>Open Live Confirmation Modal</span>
  </button>

  <button class="btn btn-shimmer" onclick="window.openHumanModal()">
    <span class="human-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    </span>
    <span>Open /human Community Hub</span>
  </button>
</div>
`,
    htmlCode: `<!-- Trigger Modal with Human Icon -->
<button class="btn btn-primary" onclick="openModal()">
  <span class="human-icon">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="8" r="4"></circle>
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
    </svg>
  </span>
  <span>Open Dialog</span>
</button>`,
    cssCode: `.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}
.modal-backdrop.open {
  opacity: 1;
  pointer-events: auto;
}
.modal-dialog {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color-hover);
  border-radius: var(--radius-xl);
  transform: scale(0.95);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-backdrop.open .modal-dialog {
  transform: scale(1);
}`
  },

  {
    id: "tabs",
    title: "Interactive Tab Switchers",
    category: "tabs",
    description: "Fluid pill tab navigation with smooth switching and isolated panel content.",
    tags: ["Cult UI", "21st.dev", "Navigation"],
    previewHtml: `
<div class="tabs-container" id="tabs-demo-widget">
  <div class="tab-list">
    <button class="tab-trigger active" data-tab-target="tab-panel-overview">
      <span class="human-icon" style="margin-right: 4px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      </span>
      <span>Overview</span>
    </button>
    <button class="tab-trigger" data-tab-target="tab-panel-analytics">
      <span class="human-icon" style="margin-right: 4px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      </span>
      <span>Humans Online</span>
    </button>
    <button class="tab-trigger" data-tab-target="tab-panel-apikeys">
      <span class="human-icon" style="margin-right: 4px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"></circle><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path></svg>
      </span>
      <span>Team Keys</span>
    </button>
  </div>
  <div class="tab-panel active" id="tab-panel-overview">
    <h5>Application Health & Status</h5>
    <p>Everything running smoothly across all edge nodes. Average human interaction response latency is 14ms.</p>
  </div>
  <div class="tab-panel" id="tab-panel-analytics">
    <h5>12,480 Active Human Contributors</h5>
    <p>Real-time telemetry showing designers actively testing components and syncing Figma token variables.</p>
  </div>
  <div class="tab-panel" id="tab-panel-apikeys">
    <h5>Human Authentication Tokens</h5>
    <p>3 Production keys active. Last rotated 4 days ago by lead design system administrator.</p>
  </div>
</div>
`,
    htmlCode: `<div class="tabs-container">
  <div class="tab-list">
    <button class="tab-trigger active" data-tab-target="tab-1">
      <span class="human-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </span>
      Overview
    </button>
    <button class="tab-trigger" data-tab-target="tab-2">Humans Online</button>
    <button class="tab-trigger" data-tab-target="tab-3">Team Keys</button>
  </div>
</div>`,
    cssCode: `.tab-list {
  display: flex;
  background: var(--bg-input);
  padding: 4px;
  border-radius: var(--radius-md);
  gap: 4px;
}
.tab-trigger {
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.tab-trigger.active {
  background: var(--accent-primary);
  color: #ffffff;
  box-shadow: 0 2px 8px var(--accent-glow);
}`
  },

  {
    id: "dropdowns",
    title: "Action Dropdowns & Menus",
    category: "dropdowns",
    description: "Polished context menus with human member actions, dividers, destructive triggers, and click-outside dismissal.",
    tags: ["Shadcn UI", "Forge UI", "Menus"],
    previewHtml: `
<div class="component-group-row">
  <div class="dropdown-wrapper">
    <button class="btn btn-secondary" onclick="window.toggleShowcaseDropdown(this)">
      <span class="human-icon">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      </span>
      <span>Member Actions</span>
      <span class="human-icon" style="margin-left: 2px;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </span>
    </button>
    <div class="dropdown-menu">
      <button class="dropdown-item" onclick="window.triggerSampleAction('Viewing Human Profile')">
        <span class="human-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </span>
        <span>View Human Profile</span>
      </button>
      <button class="dropdown-item" onclick="window.triggerSampleAction('Invite Collaborator')">
        <span class="human-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>
        </span>
        <span>Invite Teammate</span>
      </button>
      <div class="dropdown-divider"></div>
      <button class="dropdown-item danger" onclick="window.triggerSampleAction('Remove Member Warning')">
        <span class="human-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"></circle><line x1="23" y1="11" x2="17" y2="11"></line></svg>
        </span>
        <span>Remove from Workspace</span>
      </button>
    </div>
  </div>

  <div class="dropdown-wrapper">
    <button class="btn btn-outline" onclick="window.toggleShowcaseDropdown(this)">
      <span class="human-icon">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      </span>
      <span>Assignee Filter</span>
    </button>
    <div class="dropdown-menu">
      <button class="dropdown-item" onclick="window.triggerSampleAction('Assigned to Elena Rostova')">
        <span class="human-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </span>
        <span>Elena Rostova</span>
      </button>
      <button class="dropdown-item" onclick="window.triggerSampleAction('Assigned to Kenji Sato')">
        <span class="human-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
        </span>
        <span>Kenji Sato</span>
      </button>
      <button class="dropdown-item" onclick="window.triggerSampleAction('Assigned to Marcus Vance')">
        <span class="human-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"></circle><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path></svg>
        </span>
        <span>Marcus Vance</span>
      </button>
    </div>
  </div>
</div>
`,
    htmlCode: `<div class="dropdown-wrapper">
  <button class="btn btn-secondary">
    <span class="human-icon">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </span>
    <span>Member Actions</span>
  </button>
  <div class="dropdown-menu">
    <button class="dropdown-item">View Human Profile</button>
    <button class="dropdown-item">Invite Teammate</button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item danger">Remove from Workspace</button>
  </div>
</div>`,
    cssCode: `.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  min-width: 200px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color-hover);
  border-radius: var(--radius-md);
  box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.5);
  padding: 0.35rem;
  display: none;
  flex-direction: column;
}
.dropdown-menu.show { display: flex; }
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.75rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  border-radius: var(--radius-sm);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
}
.dropdown-item:hover {
  background: var(--accent-light);
  color: var(--accent-primary);
}`
  }
];
