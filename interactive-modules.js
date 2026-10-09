// ==========================================================================
// MAHI UI - INTERACTIVE MODULES RUNTIME (Projects #2 through #30)
// Zero external dependencies, pure vanilla JavaScript & Canvas/CSS
// ==========================================================================

const INTERACTIVE_MODULES = {
  // Project #2: CSS Button Effects Gallery
  "button-gallery": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">CSS Button Effects Gallery</h4>
            <p class="module-desc">Interact with magnetic hover states, glowing borders, and shimmer speeds.</p>
          </div>
          <div class="module-badge">25–50 Effect Presets</div>
        </div>

        <div class="interactive-grid-buttons">
          <button class="btn btn-primary" onclick="showToast('Action: Ripple Glow Clicked')">
            <span>Ripple Glow</span>
          </button>
          <button class="btn btn-shimmer" onclick="showToast('Action: Neon Shimmer Clicked')">
            <span>Neon Shimmer</span>
          </button>
          <button class="btn btn-gradient" onclick="showToast('Action: Holographic Gradient')">
            <span>Holo Gradient</span>
          </button>
          <button class="btn btn-outline" style="border-width: 2px;" onclick="showToast('Action: Double Border Pulse')">
            <span>Border Pulse</span>
          </button>
          <button class="btn btn-secondary" onclick="showToast('Action: Soft Inset Depth')">
            <span>Soft Inset</span>
          </button>
          <button class="btn btn-ghost" style="text-decoration: underline;" onclick="showToast('Action: Magnetic Minimal')">
            <span>Magnetic Minimal</span>
          </button>
        </div>

        <div class="module-controls-bar">
          <span style="font-size: 0.8rem; color: var(--text-secondary);">Select an effect to copy its CSS rule:</span>
          <button class="action-btn" onclick="copySnippetText('.btn-shimmer { background: linear-gradient(...); animation: shimmer 3s infinite linear; }', 'Shimmer CSS')">
            Copy Shimmer CSS
          </button>
          <button class="action-btn" onclick="copySnippetText('.btn-gradient { background: var(--accent-gradient); box-shadow: 0 4px 16px var(--accent-glow); }', 'Gradient CSS')">
            Copy Gradient CSS
          </button>
        </div>
      </div>
    `
  },

  // Project #3: Motion & Transition Playground
  "motion-lab": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Motion & Transition Playground</h4>
            <p class="module-desc">Adjust easing curves and watch real-time physics transforms.</p>
          </div>
        </div>

        <div class="motion-test-track" style="background: var(--bg-input); padding: 1.5rem; border-radius: var(--radius-md); margin: 1rem 0; overflow: hidden; position: relative;">
          <div id="motion-runner-box" style="width: 50px; height: 50px; background: var(--accent-gradient); border-radius: 10px; box-shadow: 0 0 15px var(--accent-glow); transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);"></div>
        </div>

        <div class="module-controls-bar" style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="triggerMotionRunner()">
            <span>Run Animation</span>
          </button>
          <div style="display:flex; align-items:center; gap: 0.5rem; font-size: 0.8rem; color: var(--text-secondary);">
            <span>Curve:</span>
            <select id="easing-selector" class="theme-btn" onchange="changeEasingCurve(this.value)">
              <option value="cubic-bezier(0.16, 1, 0.3, 1)">Spring Ease-Out (0.16, 1, 0.3, 1)</option>
              <option value="cubic-bezier(0.68, -0.55, 0.27, 1.55)">Elastic Bounce</option>
              <option value="cubic-bezier(0.4, 0, 0.2, 1)">Standard Material</option>
              <option value="linear">Linear</option>
            </select>
          </div>
          <button class="action-btn" onclick="copyCurrentEasing()">Copy CSS Transition</button>
        </div>
      </div>
    `
  },

  // Project #4: Loader & Skeleton Generator
  "loader-lab": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Loader & Skeleton Screen Generator</h4>
            <p class="module-desc">Preview content placeholders, shimmer effects, and orbital spinners.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin: 1rem 0;">
          <!-- Skeleton Card -->
          <div style="background: var(--bg-secondary); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="width: 100%; height: 110px; background: var(--bg-input); border-radius: var(--radius-sm); margin-bottom: 1rem; animation: skeletonPulse 1.5s infinite ease-in-out;"></div>
            <div style="width: 70%; height: 16px; background: var(--bg-input); border-radius: 4px; margin-bottom: 0.5rem; animation: skeletonPulse 1.5s infinite ease-in-out;"></div>
            <div style="width: 45%; height: 12px; background: var(--bg-input); border-radius: 4px; animation: skeletonPulse 1.5s infinite ease-in-out;"></div>
          </div>

          <!-- Spinners -->
          <div style="background: var(--bg-secondary); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-around;">
            <div style="width: 42px; height: 42px; border: 3px solid var(--border-color); border-top-color: var(--accent-primary); border-radius: 50%; animation: spinLoader 0.9s linear infinite;"></div>
            <div style="width: 14px; height: 14px; background: var(--accent-primary); border-radius: 50%; box-shadow: 0 0 15px var(--accent-primary); animation: pingDot 1.2s infinite ease-in-out;"></div>
          </div>
        </div>

        <div class="module-controls-bar">
          <button class="action-btn" onclick="copySnippetText('@keyframes skeletonPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }', 'Skeleton Keyframes')">
            Copy Skeleton CSS
          </button>
          <button class="action-btn" onclick="copySnippetText('@keyframes spin { to { transform: rotate(360deg); } }', 'Spinner CSS')">
            Copy Spinner CSS
          </button>
        </div>
      </div>
    `
  },

  // Project #5: Interactive Chart Playground
  "chart-playground": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Interactive Chart Playground</h4>
            <p class="module-desc">Zero-dependency SVG & Canvas reactive charts. Adjust values dynamically.</p>
          </div>
        </div>

        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: var(--radius-lg); margin: 1rem 0;">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; height: 160px; gap: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--border-color);" id="chart-bars-container">
            <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap: 6px; height: 100%; justify-content: flex-end;">
              <div style="width:100%; height: 65%; background: var(--accent-gradient); border-radius: 6px 6px 0 0; transition: height 0.4s ease;"></div>
              <span style="font-size: 0.7rem; color: var(--text-muted);">Mon</span>
            </div>
            <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap: 6px; height: 100%; justify-content: flex-end;">
              <div style="width:100%; height: 85%; background: var(--accent-gradient); border-radius: 6px 6px 0 0; transition: height 0.4s ease;"></div>
              <span style="font-size: 0.7rem; color: var(--text-muted);">Tue</span>
            </div>
            <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap: 6px; height: 100%; justify-content: flex-end;">
              <div style="width:100%; height: 45%; background: var(--accent-gradient); border-radius: 6px 6px 0 0; transition: height 0.4s ease;"></div>
              <span style="font-size: 0.7rem; color: var(--text-muted);">Wed</span>
            </div>
            <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap: 6px; height: 100%; justify-content: flex-end;">
              <div style="width:100%; height: 95%; background: var(--accent-gradient); border-radius: 6px 6px 0 0; transition: height 0.4s ease;"></div>
              <span style="font-size: 0.7rem; color: var(--text-muted);">Thu</span>
            </div>
            <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap: 6px; height: 100%; justify-content: flex-end;">
              <div style="width:100%; height: 75%; background: var(--accent-gradient); border-radius: 6px 6px 0 0; transition: height 0.4s ease;"></div>
              <span style="font-size: 0.7rem; color: var(--text-muted);">Fri</span>
            </div>
          </div>
        </div>

        <div class="module-controls-bar">
          <button class="btn btn-primary" onclick="randomizeChartData()">
            <span>Randomize Dataset</span>
          </button>
          <button class="action-btn" onclick="showToast('Chart exported to SVG format!')">
            Export SVG
          </button>
        </div>
      </div>
    `
  },

  // Project #6: Gradient Studio
  "gradient-studio": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Gradient Studio & CSS Generator</h4>
            <p class="module-desc">Live gradient canvas with angle control and curated presets.</p>
          </div>
        </div>

        <div id="gradient-preview-screen" style="height: 180px; width: 100%; border-radius: var(--radius-lg); background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%); margin: 1rem 0; box-shadow: var(--glass-shadow); transition: background 0.3s ease; display:flex; align-items:center; justify-content:center;">
          <span id="gradient-css-label" style="background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); padding: 0.5rem 1rem; border-radius: 6px; font-family: var(--font-mono); font-size: 0.8rem; color: #fff;">linear-gradient(135deg, #6366f1 0%, #ec4899 100%)</span>
        </div>

        <div class="module-controls-bar" style="display:flex; gap: 0.75rem; flex-wrap: wrap; align-items:center;">
          <label style="font-size: 0.8rem; color: var(--text-secondary);">Angle:</label>
          <input type="range" id="gradient-angle-slider" min="0" max="360" value="135" oninput="updateGradientAngle(this.value)" style="width: 140px;">
          <span id="angle-value-display" style="font-family: var(--font-mono); font-size: 0.8rem;">135°</span>

          <button class="action-btn" onclick="applyGradientPreset('#10b981', '#06b6d4', 90)">Emerald Teal</button>
          <button class="action-btn" onclick="applyGradientPreset('#ff007f', '#00f5ff', 120)">Cyberpunk</button>
          <button class="action-btn" onclick="applyGradientPreset('#f59e0b', '#ef4444', 45)">Sunset Flame</button>

          <button class="btn btn-primary" style="margin-left:auto;" onclick="copyCurrentGradientCSS()">
            Copy CSS Rule
          </button>
        </div>
      </div>
    `
  },

  // Project #7: Pattern Generator Studio
  "pattern-studio": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Pattern Generator Studio</h4>
            <p class="module-desc">Mathematical SVG background patterns for modern web apps.</p>
          </div>
        </div>

        <div id="pattern-display-area" style="height: 160px; width: 100%; border-radius: var(--radius-lg); background-image: radial-gradient(var(--accent-primary) 1.5px, transparent 1.5px); background-size: 20px 20px; background-color: var(--bg-secondary); margin: 1rem 0; border: 1px solid var(--border-color);"></div>

        <div class="module-controls-bar" style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button class="action-btn" onclick="setPatternGrid(16, 'radial-gradient(var(--accent-primary) 1.5px, transparent 1.5px)')">Dot Matrix (16px)</button>
          <button class="action-btn" onclick="setPatternGrid(28, 'radial-gradient(var(--accent-primary) 2px, transparent 2px)')">Wide Dots (28px)</button>
          <button class="action-btn" onclick="setPatternGrid(24, 'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)')">Grid Blueprint</button>
          <button class="btn btn-primary" style="margin-left: auto;" onclick="copyCurrentPatternCSS()">Copy Pattern CSS</button>
        </div>
      </div>
    `
  },

  // Project #8: Image Dither & Halftone Editor
  "dither-studio": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Image Dither & Halftone Editor</h4>
            <p class="module-desc">Bayer matrix pixelation processor rendered via HTML5 Canvas.</p>
          </div>
        </div>

        <div style="display: flex; gap: 1.5rem; justify-content: center; align-items: center; margin: 1rem 0; flex-wrap: wrap;">
          <canvas id="dither-canvas" width="220" height="140" style="border-radius: var(--radius-md); background: #111; border: 1px solid var(--border-color);"></canvas>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <button class="btn btn-primary" onclick="renderSampleDither('bayer')">Generate Bayer Dither</button>
            <button class="btn btn-secondary" onclick="renderSampleDither('halftone')">Generate Dot Halftone</button>
            <button class="action-btn" onclick="downloadDitherCanvas()">Download Canvas PNG</button>
          </div>
        </div>
      </div>
    `
  },

  // Project #9: Typography Playground
  "typography-lab": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Typography Playground</h4>
            <p class="module-desc">Real-time typographic scales, variable tracking, and line heights.</p>
          </div>
        </div>

        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: var(--radius-lg); margin: 1rem 0;">
          <h2 id="typo-sample-heading" style="font-size: 2.2rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 0.5rem; line-height: 1.2;">
            Design Systems For <span class="gradient-text">Human Interfaces</span>
          </h2>
          <p id="typo-sample-body" style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">
            Typography is 95% of web design. Balance contrast, variable font weights, and vertical rhythm for comfortable reading.
          </p>
        </div>

        <div class="module-controls-bar" style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <label style="font-size: 0.8rem; color: var(--text-secondary);">Size:</label>
          <input type="range" min="20" max="48" value="35" oninput="document.getElementById('typo-sample-heading').style.fontSize = (this.value / 16) + 'rem'">
          
          <label style="font-size: 0.8rem; color: var(--text-secondary);">Tracking:</label>
          <input type="range" min="-3" max="5" value="-1" oninput="document.getElementById('typo-sample-heading').style.letterSpacing = (this.value / 100) + 'em'">

          <button class="action-btn" style="margin-left: auto;" onclick="showToast('Typography CSS snippet copied!')">Copy Typography CSS</button>
        </div>
      </div>
    `
  },

  // Project #10: Mini Logo Maker
  "logo-maker": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Mini Logo Maker</h4>
            <p class="module-desc">Generate clean vector brand marks with human vector icons.</p>
          </div>
        </div>

        <div style="display:flex; justify-content:center; align-items:center; padding: 2rem; background: var(--bg-secondary); border-radius: var(--radius-lg); margin: 1rem 0; border: 1px solid var(--border-color);">
          <div id="live-logo-render" style="display:flex; align-items:center; gap: 0.85rem;">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: var(--accent-gradient); display:flex; align-items:center; justify-content:center; color: #fff; box-shadow: 0 4px 18px var(--accent-glow);">
              <span class="human-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
              </span>
            </div>
            <div>
              <span style="font-size: 1.4rem; font-weight: 800; letter-spacing: -0.02em; display:block;">Mahi<span style="color:var(--accent-primary);">Studio</span></span>
              <span style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em;">Human Architecture</span>
            </div>
          </div>
        </div>

        <div class="module-controls-bar">
          <button class="btn btn-primary" onclick="randomizeLogoBrand()">Randomize Palette</button>
          <button class="action-btn" onclick="showToast('Logo SVG code copied to clipboard!')">Copy SVG Code</button>
        </div>
      </div>
    `
  },

  // Project #11: UI Inspiration Hub
  "inspiration-hub": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">UI Inspiration Hub</h4>
            <p class="module-desc">Curated gallery of design systems from top global web experiences.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
          <div class="bento-card" style="padding: 1rem;">
            <div style="height: 90px; background: linear-gradient(135deg, #1e1b4b, #312e81); border-radius: 6px; margin-bottom: 0.75rem;"></div>
            <h5 style="font-size: 0.95rem; font-weight: 700;">Cult UI Darkmode</h5>
            <span style="font-size: 0.75rem; color: var(--text-muted);">SaaS • Micro-interactions</span>
          </div>
          <div class="bento-card" style="padding: 1rem;">
            <div style="height: 90px; background: linear-gradient(135deg, #064e3b, #047857); border-radius: 6px; margin-bottom: 0.75rem;"></div>
            <h5 style="font-size: 0.95rem; font-weight: 700;">21st.dev Library</h5>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Component Primitives</span>
          </div>
          <div class="bento-card" style="padding: 1rem;">
            <div style="height: 90px; background: linear-gradient(135deg, #4a154b, #9333ea); border-radius: 6px; margin-bottom: 0.75rem;"></div>
            <h5 style="font-size: 0.95rem; font-weight: 700;">Forge Glassmorphism</h5>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Depth & Elevation</span>
          </div>
        </div>

        <div class="module-controls-bar">
          <button class="action-btn" onclick="showToast('Bookmarked 3 inspiration sites')">Add to My Bookmarks</button>
        </div>
      </div>
    `
  },

  // Project #16: Icon Explorer (Human Icons Only)
  "icon-explorer": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Icon Explorer (100% Human Icons Only)</h4>
            <p class="module-desc">Browse, inspect, and copy human SVG vectors. Pure semantic geometry.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 1rem; margin: 1rem 0;">
          <div class="human-profile-card" onclick="copySnippetText('<svg width=\\'24\\' height=\\'24\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\'><path d=\\'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\\'/><circle cx=\\'12\\' cy=\\'7\\' r=\\'4\\'/></svg>', 'User SVG')">
            <span class="human-icon" style="color:var(--accent-primary); margin-bottom: 0.5rem;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span>
            <span style="font-size: 0.75rem; font-weight: 600;">user-single</span>
          </div>

          <div class="human-profile-card" onclick="copySnippetText('<svg width=\\'24\\' height=\\'24\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\'><path d=\\'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\\'/><circle cx=\\'9\\' cy=\\'7\\' r=\\'4\\'/><path d=\\'M23 21v-2a4 4 0 0 0-3-3.87\\'/><path d=\\'M16 3.13a4 4 0 0 1 0 7.75\\'/></svg>', 'Team SVG')">
            <span class="human-icon" style="color:var(--accent-primary); margin-bottom: 0.5rem;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </span>
            <span style="font-size: 0.75rem; font-weight: 600;">user-group</span>
          </div>

          <div class="human-profile-card" onclick="copySnippetText('<svg width=\\'24\\' height=\\'24\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\'><path d=\\'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\\'/><circle cx=\\'8.5\\' cy=\\'7\\' r=\\'4\\'/><polyline points=\\'17 11 19 13 23 9\\'/></svg>', 'User Check SVG')">
            <span class="human-icon" style="color:var(--accent-primary); margin-bottom: 0.5rem;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
            </span>
            <span style="font-size: 0.75rem; font-weight: 600;">user-verified</span>
          </div>

          <div class="human-profile-card" onclick="copySnippetText('<svg width=\\'24\\' height=\\'24\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\'><circle cx=\\'12\\' cy=\\'8\\' r=\\'4\\'/><path d=\\'M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2\\'/></svg>', 'User Profile SVG')">
            <span class="human-icon" style="color:var(--accent-primary); margin-bottom: 0.5rem;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
            </span>
            <span style="font-size: 0.75rem; font-weight: 600;">user-dialog</span>
          </div>
        </div>

        <div class="module-controls-bar">
          <span style="font-size: 0.75rem; color: var(--text-muted);">Click any icon card to copy its clean SVG code.</span>
        </div>
      </div>
    `
  },

  // Project #18: CSS Generator Toolkit
  "css-generator": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">CSS Generator Toolkit</h4>
            <p class="module-desc">Layered box-shadow, glassmorphism blur, and border-radius builder.</p>
          </div>
        </div>

        <div style="display: flex; gap: 2rem; align-items: center; justify-content: center; padding: 2rem; background: var(--bg-secondary); border-radius: var(--radius-lg); margin: 1rem 0; flex-wrap: wrap;">
          <div id="css-generator-target" style="width: 140px; height: 140px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; box-shadow: 0 12px 30px -10px rgba(0,0,0,0.5); backdrop-filter: blur(16px); display: flex; align-items:center; justify-content:center; font-size: 0.8rem; font-weight: 700;">
            Elevated Box
          </div>
        </div>

        <div class="module-controls-bar">
          <button class="action-btn" onclick="applyBoxShadowPreset('0 20px 40px -15px rgba(99, 102, 241, 0.4)')">Glow Purple Shadow</button>
          <button class="action-btn" onclick="applyBoxShadowPreset('0 10px 30px rgba(0,0,0,0.7)')">Deep Dark Shadow</button>
          <button class="btn btn-primary" style="margin-left:auto;" onclick="copySnippetText('box-shadow: 0 20px 40px -15px rgba(99, 102, 241, 0.4); backdrop-filter: blur(16px);', 'Box Shadow CSS')">
            Copy CSS Box Code
          </button>
        </div>
      </div>
    `
  },

  // Project #19: Color Accessibility Checker
  "a11y-checker": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Color Accessibility Checker (WCAG 2.1)</h4>
            <p class="module-desc">Evaluate contrast ratios for text readability and button elements.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin: 1rem 0;">
          <div style="background: #090d16; color: #f8fafc; padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: #94a3b8;">Normal Text on Dark</div>
            <div style="font-size: 1.8rem; font-weight: 800; margin: 0.4rem 0;">15.4 : 1</div>
            <span class="badge badge-success">AAA PASSED</span>
          </div>

          <div style="background: #6366f1; color: #ffffff; padding: 1.5rem; border-radius: var(--radius-md);">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: #e0e7ff;">White on Primary Accent</div>
            <div style="font-size: 1.8rem; font-weight: 800; margin: 0.4rem 0;">4.8 : 1</div>
            <span class="badge badge-success">AA PASSED</span>
          </div>
        </div>

        <div class="module-controls-bar">
          <span style="font-size: 0.8rem; color: var(--text-secondary);">Both palettes meet WCAG requirements for production deployment.</span>
        </div>
      </div>
    `
  },

  // Project #21: SaaS Analytics Dashboard
  "saas-dashboard": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">SaaS Analytics Dashboard</h4>
            <p class="module-desc">KPI telemetry, MRR stream tracking, and active team seats.</p>
          </div>
          <span class="badge badge-pulse">Realtime Telemetry</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin: 1rem 0;">
          <div class="stat-card">
            <span class="stat-title">Monthly Revenue</span>
            <span class="stat-value">$48,250</span>
            <span class="stat-trend positive">+14.2% MRR</span>
          </div>
          <div class="stat-card">
            <span class="stat-title">Active Human Seats</span>
            <span class="stat-value">1,420</span>
            <span class="stat-trend positive">+92 this week</span>
          </div>
          <div class="stat-card">
            <span class="stat-title">Edge Cache Hit Rate</span>
            <span class="stat-value">99.8%</span>
            <span class="stat-trend positive">0ms delay</span>
          </div>
        </div>

        <div class="module-controls-bar">
          <button class="btn btn-primary" onclick="showToast('Exporting dashboard telemetry to CSV format...')">Download CSV Report</button>
        </div>
      </div>
    `
  },

  // Project #24: Project Management Workspace (Kanban)
  "kanban-workspace": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Project Management Workspace (Kanban)</h4>
            <p class="module-desc">Interactive sprint board with human assignees and priority badges.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin: 1rem 0;">
          <!-- Col 1: In Progress -->
          <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom: 0.75rem; font-weight:700; font-size: 0.85rem;">
              <span>IN PROGRESS (2)</span>
              <span class="badge badge-primary">Sprint 4</span>
            </div>
            <div style="background: var(--bg-input); padding: 0.85rem; border-radius: 6px; margin-bottom: 0.6rem; border: 1px solid var(--border-color);">
              <div style="font-size: 0.85rem; font-weight: 600;">Refactor CSS Grid Tokens</div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 0.5rem;">
                <span class="badge badge-warning">High</span>
                <span style="font-size: 0.72rem; color: var(--text-muted);">Elena R.</span>
              </div>
            </div>
            <div style="background: var(--bg-input); padding: 0.85rem; border-radius: 6px; border: 1px solid var(--border-color);">
              <div style="font-size: 0.85rem; font-weight: 600;">WCAG Contrast Audit</div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 0.5rem;">
                <span class="badge badge-success">Review</span>
                <span style="font-size: 0.72rem; color: var(--text-muted);">Kenji S.</span>
              </div>
            </div>
          </div>

          <!-- Col 2: Done -->
          <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom: 0.75rem; font-weight:700; font-size: 0.85rem;">
              <span>VERIFIED DONE (1)</span>
              <span class="badge badge-success">Closed</span>
            </div>
            <div style="background: var(--bg-input); padding: 0.85rem; border-radius: 6px; border: 1px solid var(--border-color);">
              <div style="font-size: 0.85rem; font-weight: 600;">Shadcn Dropdown Primitives</div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 0.5rem;">
                <span class="badge badge-default">Completed</span>
                <span style="font-size: 0.72rem; color: var(--text-muted);">Marcus V.</span>
              </div>
            </div>
          </div>
        </div>

        <div class="module-controls-bar">
          <button class="btn btn-primary" onclick="showToast('New task added to Sprint backlog!')">+ Add New Task</button>
        </div>
      </div>
    `
  },

  // Project #29: Interactive Pricing Page Builder
  "pricing-builder": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Interactive Pricing Page Builder</h4>
            <p class="module-desc">Configurable billing cycle with automatic 20% discount calculation.</p>
          </div>
          <div style="display:flex; align-items:center; gap: 0.5rem; background: var(--bg-input); padding: 4px; border-radius: 20px;">
            <button class="size-btn active" id="billing-monthly-btn" onclick="toggleBillingCycle('monthly')">Monthly</button>
            <button class="size-btn" id="billing-annual-btn" onclick="toggleBillingCycle('annual')">Annual (-20%)</button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin: 1rem 0;">
          <div class="bento-card">
            <h4>Free Starter</h4>
            <div style="font-size: 1.8rem; font-weight: 800; margin: 0.5rem 0;">$0 <span style="font-size: 0.8rem; color: var(--text-muted);">/mo</span></div>
            <p style="font-size: 0.8rem; color: var(--text-secondary);">Unlimited local playgrounds & snippets.</p>
            <button class="btn btn-secondary" style="margin-top:auto;" onclick="showToast('Selected Free Starter Plan')">Get Started</button>
          </div>

          <div class="bento-card" style="border-color: var(--accent-primary); box-shadow: 0 0 20px var(--accent-glow);">
            <div style="display:flex; justify-content:space-between;">
              <h4>Pro Creator</h4>
              <span class="badge badge-primary">POPULAR</span>
            </div>
            <div style="font-size: 1.8rem; font-weight: 800; margin: 0.5rem 0;" id="pricing-pro-val">$19 <span style="font-size: 0.8rem; color: var(--text-muted);">/mo</span></div>
            <p style="font-size: 0.8rem; color: var(--text-secondary);">All 30 projects, full design systems, team sync.</p>
            <button class="btn btn-primary" style="margin-top:auto;" onclick="showToast('Proceeding to Pro Creator Checkout')">Upgrade to Pro</button>
          </div>
        </div>
      </div>
    `
  },

  // Project #26: Responsive Device Previewer
  "device-previewer": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Responsive Device Previewer & Bezel Simulator</h4>
            <p class="module-desc">Simulate realistic hardware bezels across Mobile (375px), Tablet (680px), and Desktop (100%).</p>
          </div>
          <div class="module-badge">Project #26 • Responsive Engine</div>
        </div>

        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
          <button class="action-btn active" id="device-btn-mobile" onclick="window.switchDeviceBezel('mobile')">📱 Mobile (375px)</button>
          <button class="action-btn" id="device-btn-tablet" onclick="window.switchDeviceBezel('tablet')">💻 Tablet (680px)</button>
          <button class="action-btn" id="device-btn-desktop" onclick="window.switchDeviceBezel('desktop')">🖥️ Desktop (Full)</button>
        </div>

        <div style="display: flex; justify-content: center; background: #040711; padding: 2rem 1rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); overflow: hidden;">
          <div id="device-mockup-frame" class="device-frame-mockup mobile" style="width: 100%; background: var(--bg-primary); padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
              <span style="font-weight: 800; font-size: 0.9rem; color: var(--accent-primary);">Mahi Mini UI</span>
              <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">9:41 AM</span>
            </div>
            <div style="background: var(--bg-card); border-radius: var(--radius-md); padding: 1rem; border: 1px solid var(--border-color);">
              <h5 style="margin-bottom: 0.35rem;">Responsive Hero Card</h5>
              <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">Adaptive card layout demonstrating automatic fluid reflow under selected device constraints.</p>
              <button class="btn btn-primary" style="margin-top: 0.85rem; width: 100%; padding: 0.45rem 1rem; font-size: 0.8rem;" onclick="showToast('Simulated Device Touch!')">Touch Interaction</button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
              <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-color);">
                <div style="font-size: 1.1rem; font-weight: 800; color: #10b981;">99.8%</div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">Uptime</div>
              </div>
              <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-color);">
                <div style="font-size: 1.1rem; font-weight: 800; color: #38bdf8;">14ms</div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">Latency</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // Project #27: Design System Token Generator
  "tokens-generator": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Design System Token & Ramp Generator</h4>
            <p class="module-desc">Generate mathematical 10-step color scales and export ready-to-use CSS Variables or Tailwind tokens.</p>
          </div>
          <div class="module-badge">Project #27 • Design Tokens</div>
        </div>

        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem;">
          <div>
            <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Base Color</label>
            <input type="color" id="token-base-picker" value="#6366f1" onchange="window.generateColorTokens(this.value)" style="cursor: pointer; width: 44px; height: 36px; border: none; background: transparent;">
          </div>
          <div style="flex: 1;">
            <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Quick Palettes</label>
            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
              <button class="action-btn" onclick="window.generateColorTokens('#6366f1')">Indigo</button>
              <button class="action-btn" onclick="window.generateColorTokens('#10b981')">Emerald</button>
              <button class="action-btn" onclick="window.generateColorTokens('#f43f5e')">Rose</button>
              <button class="action-btn" onclick="window.generateColorTokens('#06b6d4')">Cyan</button>
              <button class="action-btn" onclick="window.generateColorTokens('#8b5cf6')">Violet</button>
            </div>
          </div>
        </div>

        <div class="token-ramp-grid" id="token-ramp-container">
          <!-- Populated by window.generateColorTokens -->
        </div>

        <div class="module-controls-bar">
          <button class="btn btn-primary" onclick="window.copyTokenCssVariables()">Copy CSS Custom Properties</button>
          <button class="btn btn-secondary" onclick="window.copyTailwindTokenConfig()">Copy Tailwind Config</button>
        </div>
      </div>
    `
  },

  // Project #28: Website Screenshot Gallery
  "screenshot-gallery": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Website Inspiration Thumbnail Showcase</h4>
            <p class="module-desc">High-aesthetic visual design inspirations from the world's best frontend interfaces.</p>
          </div>
          <div class="module-badge">Project #28 • Visual Showcase</div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.25rem; margin: 1.25rem 0;">
          <div class="bento-card" style="padding: 1rem; border-color: rgba(99,102,241,0.3);">
            <div style="height: 120px; border-radius: var(--radius-md); background: linear-gradient(135deg, #1e1b4b, #312e81); display: flex; align-items: center; justify-content: center; margin-bottom: 0.75rem; color: #a5b4fc; font-weight: 700; font-size: 0.9rem;">
              Cult UI Interactive
            </div>
            <h5 style="font-size: 0.95rem; margin-bottom: 0.25rem;">Cult UI Component Library</h5>
            <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.75rem;">Dark-mode craft primitives & micro-interactions.</p>
            <a href="https://www.cult-ui.com/" target="_blank" class="resource-visit-btn">Visit Website →</a>
          </div>

          <div class="bento-card" style="padding: 1rem; border-color: rgba(16,185,129,0.3);">
            <div style="height: 120px; border-radius: var(--radius-md); background: linear-gradient(135deg, #022c22, #064e3b); display: flex; align-items: center; justify-content: center; margin-bottom: 0.75rem; color: #6ee7b7; font-weight: 700; font-size: 0.9rem;">
              Aceternity UI
            </div>
            <h5 style="font-size: 0.95rem; margin-bottom: 0.25rem;">Aceternity Motion Effects</h5>
            <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.75rem;">Framer motion and 3D geometric visual showcases.</p>
            <a href="https://ui.aceternity.com/" target="_blank" class="resource-visit-btn">Visit Website →</a>
          </div>

          <div class="bento-card" style="padding: 1rem; border-color: rgba(236,72,153,0.3);">
            <div style="height: 120px; border-radius: var(--radius-md); background: linear-gradient(135deg, #500724, #831843); display: flex; align-items: center; justify-content: center; margin-bottom: 0.75rem; color: #fbcfe8; font-weight: 700; font-size: 0.9rem;">
              21st.dev Magic Lab
            </div>
            <h5 style="font-size: 0.95rem; margin-bottom: 0.25rem;">21st.dev Component Catalog</h5>
            <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.75rem;">Next-generation open-source community design library.</p>
            <a href="https://21st.dev/" target="_blank" class="resource-visit-btn">Visit Website →</a>
          </div>
        </div>
      </div>
    `
  },

  // Project #12: Hero Section Gallery
  "hero-gallery": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Hero Section Pattern Explorer</h4>
            <p class="module-desc">Toggle between high-conversion SaaS, AI studio, and developer-tool hero layouts.</p>
          </div>
          <div class="module-badge">Project #12 • Hero Patterns</div>
        </div>

        <div style="background: #060913; border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 2.5rem 1.5rem; text-align: center; position: relative; overflow: hidden;">
          <div class="ambient-glow" style="top: -20%; left: 30%; width: 40%; height: 60%; background: var(--accent-gradient); filter: blur(50px); opacity: 0.15;"></div>
          <span class="badge badge-primary" style="margin-bottom: 1rem;">🚀 NEXT GENERATION PLATFORM</span>
          <h2 style="font-size: 2.2rem; font-weight: 800; line-height: 1.2; margin-bottom: 0.75rem;">
            Ship Delightful Software <span class="gradient-text">10x Faster</span>
          </h2>
          <p style="font-size: 0.95rem; color: var(--text-secondary); max-width: 580px; margin: 0 auto 1.5rem auto;">
            The enterprise component playground designed for high-performing engineering organizations and creative teams.
          </p>
          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="showToast('Primary CTA: Get Started Triggered')">Start Building Free →</button>
            <button class="btn btn-secondary" onclick="showToast('Secondary CTA: Book Demo Triggered')">Explore Documentation</button>
          </div>
        </div>

        <div class="module-controls-bar">
          <button class="action-btn" onclick="copySnippetText('<section class=\"hero-section\">...</section>', 'Hero Layout HTML')">Copy Hero Markup</button>
        </div>
      </div>
    `
  },

  // Project #13: Navbar Design Playground
  "navbar-playground": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Navbar Design & Architecture Playground</h4>
            <p class="module-desc">Preview floating island bars, glassmorphic headers, and mobile dock navigations.</p>
          </div>
          <div class="module-badge">Project #13 • Nav Architectures</div>
        </div>

        <div style="background: #040711; padding: 2rem 1rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 1.5rem;">
          <!-- Floating Island Preset -->
          <div style="background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(12px); border: 1px solid var(--border-color); border-radius: var(--radius-full); padding: 0.5rem 1.25rem; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 800; color: var(--accent-primary);">BrandLogo</span>
            <div style="display: flex; gap: 1rem; font-size: 0.85rem; color: var(--text-secondary);">
              <span style="cursor: pointer; color: var(--text-primary);">Components</span>
              <span style="cursor: pointer;">Resources</span>
              <span style="cursor: pointer;">Pricing</span>
            </div>
            <button class="btn btn-primary" style="padding: 0.35rem 0.85rem; font-size: 0.75rem;" onclick="showToast('Nav Action')">Get Access</button>
          </div>
        </div>

        <div class="module-controls-bar">
          <button class="action-btn" onclick="copySnippetText('<nav class=\"floating-nav-island\">...</nav>', 'Floating Nav HTML')">Copy Island Nav CSS</button>
        </div>
      </div>
    `
  },

  // Project #14: CTA & Footer Gallery
  "cta-footer-gallery": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">CTA Banner & Multi-Column Footer Suite</h4>
            <p class="module-desc">High-converting callout sections and structured semantic footer columns.</p>
          </div>
          <div class="module-badge">Project #14 • Conversion UX</div>
        </div>

        <div style="background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(236,72,153,0.1)); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h4 style="font-size: 1.2rem; margin-bottom: 0.3rem;">Ready to upgrade your development workflow?</h4>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">Join thousands of developers crafting modern UIs.</p>
          </div>
          <button class="btn btn-primary" onclick="showToast('Action: Get Started Free')">Claim Free License</button>
        </div>

        <div class="module-controls-bar">
          <button class="action-btn" onclick="copySnippetText('<div class=\"cta-banner\">...</div>', 'CTA Banner HTML')">Copy CTA Markup</button>
        </div>
      </div>
    `
  },

  // Project #15: Design Bookmark Manager
  "bookmark-manager": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Design Bookmark & Favorites Workspace</h4>
            <p class="module-desc">Organize inspiration sites, component catalogs, and code snippets into collections.</p>
          </div>
          <div class="module-badge">Project #15 • Local-First Bookmarks</div>
        </div>

        <div style="display: flex; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap;">
          <input type="text" id="custom-bookmark-input" placeholder="Enter bookmark title..." style="background: var(--bg-input); border: 1px solid var(--border-color); padding: 0.45rem 0.85rem; border-radius: var(--radius-md); color: #fff; font-size: 0.85rem; flex: 1; min-width: 200px;">
          <button class="btn btn-primary" onclick="window.addSampleBookmark()">+ Add Bookmark</button>
        </div>

        <div id="bookmarks-active-list" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span class="tag-pill" style="padding: 0.5rem 0.85rem;">Cult UI ⭐</span>
          <span class="tag-pill" style="padding: 0.5rem 0.85rem;">Aceternity Motion ⭐</span>
          <span class="tag-pill" style="padding: 0.5rem 0.85rem;">21st.dev Magic ⭐</span>
        </div>
      </div>
    `
  },

  // Project #17: OG Image Generator
  "og-generator": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Dynamic Social OpenGraph Card Generator</h4>
            <p class="module-desc">Generate beautiful 1200x630 social preview graphics with live customizable typography.</p>
          </div>
          <div class="module-badge">Project #17 • Social Preview</div>
        </div>

        <div style="background: #040711; padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); display: flex; justify-content: center;">
          <div id="og-preview-card" style="width: 100%; max-width: 580px; aspect-ratio: 1200 / 630; background: linear-gradient(135deg, #090d16, #1e1b4b); border: 2px solid rgba(99,102,241,0.4); border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 800; color: #6366f1; font-size: 1.1rem;">MAHI UI</span>
              <span style="background: rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 99px; font-size: 0.75rem; color: #fff;">Social Preview</span>
            </div>
            <div>
              <h3 id="og-title-preview" style="font-size: 1.6rem; font-weight: 800; color: #fff; margin-bottom: 0.4rem;">Next-Gen Frontend Component Suite</h3>
              <p style="font-size: 0.85rem; color: #94a3b8;">Craft exceptional web experiences with zero-dependency CSS primitives.</p>
            </div>
            <div style="font-size: 0.75rem; color: #6366f1; font-family: var(--font-mono);">mahi-ui.dev • Open Source</div>
          </div>
        </div>

        <div class="module-controls-bar">
          <input type="text" id="og-input-title" placeholder="Change title text..." style="background: var(--bg-input); border: 1px solid var(--border-color); padding: 0.45rem 0.85rem; border-radius: var(--radius-md); color: #fff; font-size: 0.85rem; flex: 1;" oninput="document.getElementById('og-title-preview').textContent = this.value || 'Next-Gen Frontend Suite'">
          <button class="btn btn-secondary" onclick="showToast('Copied OG Image HTML tags!')">Copy Meta Tags</button>
        </div>
      </div>
    `
  },

  // Project #20: Component Registry Explorer
  "registry-explorer": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Component Registry & CLI Explorer</h4>
            <p class="module-desc">Browse shadcn-compatible schema manifests and copy one-line CLI installation commands.</p>
          </div>
          <div class="module-badge">Project #20 • CLI Registry</div>
        </div>

        <div style="background: #040711; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem; font-family: var(--font-mono); font-size: 0.85rem; color: #38bdf8; display: flex; justify-content: space-between; align-items: center;">
          <span>npx mahi-ui add button card badge modal tabs</span>
          <button class="action-btn" onclick="copySnippetText('npx mahi-ui add button card badge modal tabs', 'CLI Command')">Copy Command</button>
        </div>
      </div>
    `
  },

  // Project #22: Visual Workflow Node Builder
  "workflow-builder": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Visual Node Graph & Automation Flow Canvas</h4>
            <p class="module-desc">Connect logic nodes and trigger animated pipeline simulations.</p>
          </div>
          <div class="module-badge">Project #22 • Node Graph</div>
        </div>

        <div style="background: #040711; border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem; display: flex; align-items: center; justify-content: center; gap: 1.5rem; flex-wrap: wrap;">
          <div class="bento-card" style="padding: 1rem; border-color: #6366f1; min-width: 140px; text-align: center;">
            <div style="font-size: 0.75rem; color: #6366f1; font-weight: 700;">TRIGGER</div>
            <div style="font-weight: 700; font-size: 0.9rem;">Webhook Event</div>
          </div>
          <span style="color: var(--text-muted); font-size: 1.2rem;">➔</span>
          <div class="bento-card" style="padding: 1rem; border-color: #10b981; min-width: 140px; text-align: center;">
            <div style="font-size: 0.75rem; color: #10b981; font-weight: 700;">TRANSFORM</div>
            <div style="font-weight: 700; font-size: 0.9rem;">Sanitize JSON</div>
          </div>
          <span style="color: var(--text-muted); font-size: 1.2rem;">➔</span>
          <div class="bento-card" style="padding: 1rem; border-color: #ec4899; min-width: 140px; text-align: center;">
            <div style="font-size: 0.75rem; color: #ec4899; font-weight: 700;">OUTPUT</div>
            <div style="font-weight: 700; font-size: 0.9rem;">Dispatch Notification</div>
          </div>
        </div>

        <div class="module-controls-bar">
          <button class="btn btn-primary" onclick="showToast('Simulated pipeline flow: Success!')">Run Node Simulation</button>
        </div>
      </div>
    `
  },

  // Project #23: AI Prompt Playground
  "prompt-playground": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">AI Prompt & Token Engineering Playground</h4>
            <p class="module-desc">Compose structured system prompts with token counts and parameter sliders.</p>
          </div>
          <div class="module-badge">Project #23 • Prompt Engineering</div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <textarea id="ai-prompt-area" rows="4" placeholder="Enter system prompt instruction..." style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.75rem; color: #fff; font-family: var(--font-mono); font-size: 0.85rem;">You are a senior frontend engineer specialized in zero-runtime CSS micro-interactions and accessible UI components.</textarea>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">Tokens: ~24 • Temperature: 0.7</span>
            <button class="btn btn-primary" onclick="showToast('Prompt tested: Generated clean CSS!')">Generate Response</button>
          </div>
        </div>
      </div>
    `
  },

  // Project #25: Interactive Developer Portfolio
  "developer-portfolio": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Interactive Developer Portfolio & Experience Card</h4>
            <p class="module-desc">Showcase featured repositories, tech stack tags, and contributions with micro-interactions.</p>
          </div>
          <div class="module-badge">Project #25 • Portfolio App</div>
        </div>

        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem; display: flex; gap: 1.25rem; align-items: center; flex-wrap: wrap;">
          <div class="human-card-avatar" style="width: 64px; height: 64px; margin: 0;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <div style="flex: 1;">
            <h4 style="font-size: 1.2rem; margin-bottom: 0.25rem;">Alex Rivera</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">Senior Design Engineer • Specialized in React, CSS & Three.js</p>
            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
              <span class="tag-pill">React</span>
              <span class="tag-pill">Three.js</span>
              <span class="tag-pill">Tailwind</span>
              <span class="tag-pill">Design Systems</span>
            </div>
          </div>
        </div>

        <div class="module-controls-bar">
          <button class="btn btn-primary" onclick="showToast('Downloaded Portfolio Resume')">Download Resume PDF</button>
        </div>
      </div>
    `
  },

  // Project #30: Frontend Code Snippet Library
  "snippet-library": {
    render: () => `
      <div class="interactive-module-box">
        <div class="module-header-row">
          <div>
            <h4 class="module-title">Frontend Code Snippet Library & Multi-Stack Exporter</h4>
            <p class="module-desc">Ready-to-paste snippets for React/TypeScript, Vanilla HTML/CSS, and Tailwind CSS.</p>
          </div>
          <div class="module-badge">Project #30 • Code Exporter</div>
        </div>

        <div class="snippet-tab-bar">
          <button class="snippet-tab-btn active" id="tab-snip-react" onclick="window.switchSnippetTab('react')">React + TypeScript</button>
          <button class="snippet-tab-btn" id="tab-snip-css" onclick="window.switchSnippetTab('css')">Vanilla CSS</button>
          <button class="snippet-tab-btn" id="tab-snip-tailwind" onclick="window.switchSnippetTab('tailwind')">Tailwind CSS</button>
        </div>

        <pre class="snippet-code-pre" id="snippet-code-display"><code>// React + TypeScript Component Snippet
import React, { useState } from 'react';

export const ShimmerButton: React.FC<{ label: string; onClick?: () => void }> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative px-5 py-2.5 rounded-lg font-semibold text-white bg-indigo-600 shadow-lg shadow-indigo-500/30 overflow-hidden hover:scale-105 active:scale-95 transition-all"
    >
      <span className="relative z-10">{label}</span>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </button>
  );
};</code></pre>

        <div class="module-controls-bar">
          <button class="btn btn-primary" onclick="window.copyCurrentActiveSnippet()">
            <span class="human-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </span>
            <span>Copy Snippet</span>
          </button>
        </div>
      </div>
    `
  }
};

// Global interactive helpers
window.copySnippetText = function(text, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast(`Copied ${label} to clipboard!`));
  } else {
    showToast(`Copied ${label}!`);
  }
};

window.triggerMotionRunner = function() {
  const box = document.getElementById('motion-runner-box');
  if (!box) return;
  const current = box.style.transform;
  box.style.transform = (current === 'translateX(260px)') ? 'translateX(0px)' : 'translateX(260px)';
};

window.changeEasingCurve = function(curve) {
  const box = document.getElementById('motion-runner-box');
  if (box) box.style.transitionTimingFunction = curve;
  showToast(`Updated easing curve: ${curve}`);
};

window.copyCurrentEasing = function() {
  const selector = document.getElementById('easing-selector');
  const curve = selector ? selector.value : 'cubic-bezier(0.16, 1, 0.3, 1)';
  copySnippetText(`transition: transform 0.8s ${curve};`, 'Easing Rule');
};

window.randomizeChartData = function() {
  const bars = document.querySelectorAll('#chart-bars-container > div > div');
  bars.forEach(b => {
    const randomHeight = Math.floor(Math.random() * 65) + 30;
    b.style.height = randomHeight + '%';
  });
  showToast('Refreshed live chart dataset!');
};

window.updateGradientAngle = function(angle) {
  const screen = document.getElementById('gradient-preview-screen');
  const label = document.getElementById('gradient-css-label');
  const angleDisplay = document.getElementById('angle-value-display');
  if (angleDisplay) angleDisplay.textContent = angle + '°';
  const newBg = `linear-gradient(${angle}deg, #6366f1 0%, #ec4899 100%)`;
  if (screen) screen.style.background = newBg;
  if (label) label.textContent = newBg;
};

window.applyGradientPreset = function(c1, c2, angle) {
  const screen = document.getElementById('gradient-preview-screen');
  const label = document.getElementById('gradient-css-label');
  const newBg = `linear-gradient(${angle}deg, ${c1} 0%, ${c2} 100%)`;
  if (screen) screen.style.background = newBg;
  if (label) label.textContent = newBg;
  showToast(`Applied preset: ${c1} → ${c2}`);
};

window.copyCurrentGradientCSS = function() {
  const label = document.getElementById('gradient-css-label');
  const css = label ? label.textContent : 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)';
  copySnippetText(`background: ${css};`, 'Gradient CSS');
};

window.setPatternGrid = function(size, bgImage) {
  const el = document.getElementById('pattern-display-area');
  if (el) {
    el.style.backgroundSize = `${size}px ${size}px`;
    el.style.backgroundImage = bgImage;
  }
  showToast(`Pattern updated: ${size}px spacing`);
};

window.copyCurrentPatternCSS = function() {
  const el = document.getElementById('pattern-display-area');
  const bgImg = el ? el.style.backgroundImage : 'radial-gradient(var(--accent-primary) 1.5px, transparent 1.5px)';
  const bgSize = el ? el.style.backgroundSize : '20px 20px';
  copySnippetText(`background-image: ${bgImg}; background-size: ${bgSize};`, 'Pattern CSS');
};

window.renderSampleDither = function(mode) {
  const canvas = document.getElementById('dither-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const step = (mode === 'bayer') ? 4 : 8;
  for (let x = 0; x < canvas.width; x += step) {
    for (let y = 0; y < canvas.height; y += step) {
      const grad = (x + y) / (canvas.width + canvas.height);
      if (Math.random() < grad) {
        ctx.fillStyle = '#6366f1';
        if (mode === 'bayer') {
          ctx.fillRect(x, y, step - 1, step - 1);
        } else {
          ctx.beginPath();
          ctx.arc(x + step / 2, y + step / 2, (step / 2) * grad, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }
  showToast(`Processed ${mode} dither pass!`);
};

window.downloadDitherCanvas = function() {
  const canvas = document.getElementById('dither-canvas');
  if (!canvas) return;
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = 'dither-pattern.png';
  a.click();
  showToast('Downloaded dither image PNG');
};

window.randomizeLogoBrand = function() {
  const palettes = [
    'linear-gradient(135deg, #10b981, #06b6d4)',
    'linear-gradient(135deg, #ff007f, #00f5ff)',
    'linear-gradient(135deg, #f43f5e, #fb923c)',
    'linear-gradient(135deg, #6366f1, #a855f7)'
  ];
  const choice = palettes[Math.floor(Math.random() * palettes.length)];
  const badge = document.querySelector('#live-logo-render > div');
  if (badge) badge.style.background = choice;
  showToast('Updated brandmark palette!');
};

window.applyBoxShadowPreset = function(shadowRule) {
  const box = document.getElementById('css-generator-target');
  if (box) box.style.boxShadow = shadowRule;
  showToast('Applied box-shadow elevation!');
};

window.toggleBillingCycle = function(cycle) {
  const mBtn = document.getElementById('billing-monthly-btn');
  const aBtn = document.getElementById('billing-annual-btn');
  const proVal = document.getElementById('pricing-pro-val');

  if (cycle === 'monthly') {
    if (mBtn) mBtn.classList.add('active');
    if (aBtn) aBtn.classList.remove('active');
    if (proVal) proVal.innerHTML = '$19 <span style="font-size: 0.8rem; color: var(--text-muted);">/mo</span>';
  } else {
    if (aBtn) aBtn.classList.add('active');
    if (mBtn) mBtn.classList.remove('active');
    if (proVal) proVal.innerHTML = '$15 <span style="font-size: 0.8rem; color: var(--text-muted);">/mo ($180/yr)</span>';
  }
};

// ==========================================================================
// Project #26: Device Bezel Switcher
// ==========================================================================
window.switchDeviceBezel = function(mode) {
  const frame = document.getElementById('device-mockup-frame');
  const bMobile = document.getElementById('device-btn-mobile');
  const bTablet = document.getElementById('device-btn-tablet');
  const bDesktop = document.getElementById('device-btn-desktop');

  if (!frame) return;
  frame.className = `device-frame-mockup ${mode}`;

  if (bMobile) bMobile.classList.toggle('active', mode === 'mobile');
  if (bTablet) bTablet.classList.toggle('active', mode === 'tablet');
  if (bDesktop) bDesktop.classList.toggle('active', mode === 'desktop');

  showToast(`Switched device viewport to: ${mode.toUpperCase()}`);
};

// ==========================================================================
// Project #27: Design System Token & Ramp Generator
// ==========================================================================
let currentTokensList = [];

window.generateColorTokens = function(hex) {
  const container = document.getElementById('token-ramp-container');
  const picker = document.getElementById('token-base-picker');
  if (picker) picker.value = hex;

  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  currentTokensList = [];

  // Generate 10-step ramp using opacity and brightness interpolation
  let html = '';
  steps.forEach((step, idx) => {
    const lightness = 95 - (idx * 8.5);
    const swatchColor = `color-mix(in srgb, ${hex} ${100 - (idx * 9)}%, #000000)`;
    currentTokensList.push({ step, varName: `--color-brand-${step}`, hex: swatchColor });

    html += `
      <div class="token-swatch" style="background: ${hex}; filter: brightness(${1.6 - (idx * 0.12)}); cursor: pointer;" onclick="copySnippetText('${hex}', 'Brand-${step}')" title="Click to copy">
        <span>${step}</span>
      </div>
    `;
  });

  if (container) container.innerHTML = html;
  showToast(`Generated 10-step token ramp for ${hex}`);
};

window.copyTokenCssVariables = function() {
  const picker = document.getElementById('token-base-picker');
  const base = picker ? picker.value : '#6366f1';
  const css = `:root {\n  --brand-base: ${base};\n  --brand-50: ${base}10;\n  --brand-100: ${base}25;\n  --brand-500: ${base};\n  --brand-900: #0a0e1c;\n}`;
  copySnippetText(css, 'CSS Custom Properties');
};

window.copyTailwindTokenConfig = function() {
  const picker = document.getElementById('token-base-picker');
  const base = picker ? picker.value : '#6366f1';
  const config = `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        brand: {\n          DEFAULT: '${base}',\n          light: '${base}33',\n          dark: '#0a0e1c'\n        }\n      }\n    }\n  }\n};`;
  copySnippetText(config, 'Tailwind Token Config');
};

// ==========================================================================
// Project #30: Frontend Snippet Library Tabs
// ==========================================================================
let currentSnippetStack = 'react';
const SNIPPET_PRESETS = {
  react: `// React + TypeScript Component Snippet
import React, { useState } from 'react';

export const ShimmerButton: React.FC<{ label: string; onClick?: () => void }> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative px-5 py-2.5 rounded-lg font-semibold text-white bg-indigo-600 shadow-lg shadow-indigo-500/30 overflow-hidden hover:scale-105 active:scale-95 transition-all"
    >
      <span className="relative z-10">{label}</span>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </button>
  );
};`,
  css: `/* Vanilla CSS Micro-Interaction Button */
.btn-shimmer {
  position: relative;
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  color: #ffffff;
  background: #6366f1;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-shimmer:hover {
  transform: translateY(-2px);
}`,
  tailwind: `<!-- Tailwind CSS Utility Button -->
<button class="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-semibold text-white transition-all duration-200 bg-indigo-600 rounded-xl group hover:bg-indigo-500 active:scale-95 shadow-md shadow-indigo-500/25">
  <span class="w-48 h-48 -mr-2 transition-all duration-500 origin-top-left -rotate-45 -translate-x-full translate-y-12 bg-white opacity-10 group-hover:-rotate-90 ease"></span>
  <span class="relative">Launch Experience</span>
</button>`
};

window.switchSnippetTab = function(stack) {
  currentSnippetStack = stack;
  const display = document.getElementById('snippet-code-display');
  const tReact = document.getElementById('tab-snip-react');
  const tCss = document.getElementById('tab-snip-css');
  const tTailwind = document.getElementById('tab-snip-tailwind');

  if (display) display.innerHTML = `<code>${escapeSnippetMarkup(SNIPPET_PRESETS[stack])}</code>`;
  if (tReact) tReact.classList.toggle('active', stack === 'react');
  if (tCss) tCss.classList.toggle('active', stack === 'css');
  if (tTailwind) tTailwind.classList.toggle('active', stack === 'tailwind');
};

function escapeSnippetMarkup(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

window.copyCurrentActiveSnippet = function() {
  copySnippetText(SNIPPET_PRESETS[currentSnippetStack], `${currentSnippetStack.toUpperCase()} Code Snippet`);
};

// ==========================================================================
// Three.js 3D Studio Runtime Engine
// ==========================================================================
let threeScene, threeCamera, threeRenderer, threeMesh;
let threeRotationSpeed = 0.015;
let threeWireframe = false;
let threeAnimId = null;

window.launch3DStudioModal = function() {
  const modal = document.getElementById('three-modal-backdrop');
  if (modal) modal.classList.add('open');
  initThreeStudio();
  showToast('Launched Three.js 3D Spatial Geometry Lab!');
};

window.closeThreeStudioModal = function() {
  const modal = document.getElementById('three-modal-backdrop');
  if (modal) modal.classList.remove('open');
  if (threeAnimId) {
    cancelAnimationFrame(threeAnimId);
    threeAnimId = null;
  }
};

function initThreeStudio() {
  const canvas = document.getElementById('three-canvas');
  const fallback = document.getElementById('three-fallback-msg');
  if (!canvas) return;

  if (typeof THREE === 'undefined') {
    if (fallback) fallback.style.display = 'block';
    return;
  }

  // Dispose previous renderer if exists
  if (threeRenderer) {
    threeRenderer.dispose();
  }

  const width = canvas.parentElement.clientWidth;
  const height = canvas.parentElement.clientHeight || 380;

  threeScene = new THREE.Scene();
  threeCamera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  threeCamera.position.z = 4;

  try {
    threeRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    threeRenderer.setSize(width, height);
    threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  } catch (err) {
    console.warn('WebGL init failed:', err);
    if (fallback) fallback.style.display = 'block';
    return;
  }

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  threeScene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
  dirLight.position.set(5, 5, 5);
  threeScene.add(dirLight);

  const pointLight = new THREE.PointLight(0xec4899, 1.5, 50);
  pointLight.position.set(-5, -5, 2);
  threeScene.add(pointLight);

  // Mesh creation
  createThreeMesh('torus');

  // Animation Loop
  function animate() {
    threeAnimId = requestAnimationFrame(animate);
    if (threeMesh) {
      threeMesh.rotation.x += threeRotationSpeed;
      threeMesh.rotation.y += threeRotationSpeed * 1.3;
    }
    threeRenderer.render(threeScene, threeCamera);
  }

  if (threeAnimId) cancelAnimationFrame(threeAnimId);
  animate();
}

function createThreeMesh(type) {
  if (threeMesh) threeScene.remove(threeMesh);

  let geometry;
  if (type === 'torus') geometry = new THREE.TorusKnotGeometry(1, 0.35, 100, 16);
  else if (type === 'cube') geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);
  else if (type === 'sphere') geometry = new THREE.SphereGeometry(1.2, 32, 32);
  else if (type === 'cone') geometry = new THREE.ConeGeometry(1.2, 2.2, 32);
  else geometry = new THREE.TorusKnotGeometry(1, 0.35, 100, 16);

  const material = new THREE.MeshStandardMaterial({
    color: 0x6366f1,
    metalness: 0.6,
    roughness: 0.2,
    wireframe: threeWireframe
  });

  threeMesh = new THREE.Mesh(geometry, material);
  threeScene.add(threeMesh);
}

window.switchThreeGeometry = function(type) {
  createThreeMesh(type);
  const btns = ['torus', 'cube', 'sphere', 'cone'];
  btns.forEach(b => {
    const el = document.getElementById(`geom-${b}-btn`);
    if (el) el.classList.toggle('active', b === type);
  });
  showToast(`Switched 3D Mesh: ${type.toUpperCase()}`);
};

window.toggleThreeWireframe = function() {
  threeWireframe = !threeWireframe;
  if (threeMesh) threeMesh.material.wireframe = threeWireframe;
  const btn = document.getElementById('three-wireframe-btn');
  if (btn) {
    btn.textContent = `Wireframe: ${threeWireframe ? 'On' : 'Off'}`;
    btn.classList.toggle('active', threeWireframe);
  }
  showToast(`Wireframe: ${threeWireframe ? 'Enabled' : 'Disabled'}`);
};

window.randomizeThreeColor = function() {
  if (!threeMesh) return;
  const colors = [0x6366f1, 0x10b981, 0xec4899, 0x38bdf8, 0xf59e0b, 0xa855f7];
  const choice = colors[Math.floor(Math.random() * colors.length)];
  threeMesh.material.color.setHex(choice);
  showToast('Updated 3D mesh material color!');
};

window.setThreeRotationSpeed = function(val) {
  threeRotationSpeed = parseFloat(val);
};

window.copyThreeSnippet = function() {
  const r3fCode = `// React Three Fiber (R3F) & Drei Component
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';

function MeshGeometry() {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.8;
    meshRef.current.rotation.y += delta * 1.2;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.35, 100, 16]} />
        <meshStandardMaterial color="#6366f1" metalness={0.7} roughness={0.2} />
      </mesh>
    </Float>
  );
}

export default function SpatialScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <MeshGeometry />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}`;
  copySnippetText(r3fCode, 'React Three Fiber (R3F) Code');
};

// Hook close buttons for 3D modal
document.addEventListener('DOMContentLoaded', () => {
  const closeX = document.getElementById('close-three-modal-x');
  const closeBtn = document.getElementById('close-three-modal-btn');
  const backdrop = document.getElementById('three-modal-backdrop');

  if (closeX) closeX.addEventListener('click', window.closeThreeStudioModal);
  if (closeBtn) closeBtn.addEventListener('click', window.closeThreeStudioModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) window.closeThreeStudioModal();
    });
  }
});

