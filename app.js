// ==========================================================================
// MAHI UI - PLAYGROUND APPLICATION LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  renderComponents(COMPONENTS_DATA);
  initProjectsDirectory();
  initResourceDirectory();
  setupThemeSwitcher();
  setupSearchAndFilters();
  setupModalHandlers();
  setupDropdownGlobalDismiss();
  setupGlobalKeyboardShortcuts();
}

// --------------------------------------------------------------------------
// 1. Render Component Blocks
// --------------------------------------------------------------------------
function renderComponents(componentsList) {
  const container = document.getElementById('showcase-container');
  if (!container) return;

  if (componentsList.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.5rem; margin-bottom: 0.5rem;">🔍 No matching components found</p>
        <p style="font-size: 0.9rem;">Try searching for "button", "modal", "badge", "card", or "dropdown".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = componentsList.map(comp => createComponentCardMarkup(comp)).join('');

  // Re-attach tab switches inside rendered preview cards (e.g. Tabs component demo)
  initPreviewTabWidgets();
}

function createComponentCardMarkup(comp) {
  return `
    <article class="component-card" id="card-${comp.id}" data-category="${comp.category}">
      <!-- Header -->
      <div class="card-header">
        <div class="header-left">
          <span class="card-category-tag">${comp.category}</span>
          <h2 class="component-title">${comp.title}</h2>
        </div>

        <div class="header-actions">
          <!-- Resize Viewport Controls -->
          <div class="responsive-controls" data-card-id="${comp.id}">
            <button class="size-btn" onclick="resizeCardPreview('${comp.id}', 'mobile', this)" title="Mobile view (380px)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
              <span>380px</span>
            </button>
            <button class="size-btn" onclick="resizeCardPreview('${comp.id}', 'tablet', this)" title="Tablet view (720px)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
              <span>720px</span>
            </button>
            <button class="size-btn active" onclick="resizeCardPreview('${comp.id}', 'full', this)" title="Full width">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              <span>100%</span>
            </button>
          </div>

          <!-- Preview / Code View Toggle -->
          <div class="view-tabs">
            <button class="view-tab-btn active" onclick="switchCardView('${comp.id}', 'preview', this)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <span>Preview</span>
            </button>
            <button class="view-tab-btn" onclick="switchCardView('${comp.id}', 'code', this)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              <span>Code</span>
            </button>
          </div>

          <!-- Direct Copy Quick Button -->
          <button class="action-btn" onclick="copyComponentCode('${comp.id}', 'html')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>Copy HTML</span>
          </button>
        </div>
      </div>

      <!-- Preview Canvas Section -->
      <div class="preview-outer" id="preview-outer-${comp.id}">
        <div class="preview-wrapper size-full" id="wrapper-${comp.id}">
          ${comp.previewHtml}
        </div>
      </div>

      <!-- Code Inspector Section -->
      <div class="code-panel" id="code-panel-${comp.id}">
        <div class="code-subtabs">
          <button class="code-lang-btn active" onclick="switchCodeSnippet('${comp.id}', 'html', this)">HTML</button>
          <button class="code-lang-btn" onclick="switchCodeSnippet('${comp.id}', 'css', this)">CSS</button>
          <button class="code-copy-overlay-btn" onclick="copyCurrentSnippet('${comp.id}')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>Copy Snippet</span>
          </button>
        </div>
        <pre class="code-block" id="pre-${comp.id}"><code id="code-${comp.id}">${escapeHtml(comp.htmlCode)}</code></pre>
      </div>
    </article>
  `;
}

// --------------------------------------------------------------------------
// 2. View Toggle (Preview vs Code) & Resize Preview
// --------------------------------------------------------------------------
window.switchCardView = function(cardId, viewType, btn) {
  const card = document.getElementById(`card-${cardId}`);
  if (!card) return;

  const previewOuter = document.getElementById(`preview-outer-${cardId}`);
  const codePanel = document.getElementById(`code-panel-${cardId}`);
  const tabBtns = card.querySelectorAll('.view-tab-btn');

  tabBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  if (viewType === 'preview') {
    previewOuter.style.display = 'flex';
    codePanel.classList.remove('active');
  } else {
    previewOuter.style.display = 'none';
    codePanel.classList.add('active');
  }
};

window.resizeCardPreview = function(cardId, size, btn) {
  const wrapper = document.getElementById(`wrapper-${cardId}`);
  const controlGroup = btn.parentElement;
  if (!wrapper || !controlGroup) return;

  controlGroup.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  wrapper.className = `preview-wrapper size-${size}`;
};

window.switchCodeSnippet = function(cardId, lang, btn) {
  const codePanel = document.getElementById(`code-panel-${cardId}`);
  const codeElement = document.getElementById(`code-${cardId}`);
  const comp = COMPONENTS_DATA.find(c => c.id === cardId);
  if (!comp || !codeElement || !codePanel) return;

  codePanel.querySelectorAll('.code-lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  codePanel.setAttribute('data-current-lang', lang);

  if (lang === 'html') {
    codeElement.textContent = comp.htmlCode;
  } else {
    codeElement.textContent = comp.cssCode;
  }
};

window.copyCurrentSnippet = function(cardId) {
  const codePanel = document.getElementById(`code-panel-${cardId}`);
  const currentLang = (codePanel && codePanel.getAttribute('data-current-lang')) || 'html';
  copyComponentCode(cardId, currentLang);
};

// --------------------------------------------------------------------------
// 3. Copy Code with Toast Feedback
// --------------------------------------------------------------------------
window.copyComponentCode = function(cardId, lang = 'html') {
  const comp = COMPONENTS_DATA.find(c => c.id === cardId);
  if (!comp) return;

  const contentToCopy = (lang === 'html') ? comp.htmlCode : comp.cssCode;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(contentToCopy)
      .then(() => {
        showToast(`Copied ${comp.title} (${lang.toUpperCase()}) to clipboard!`);
      })
      .catch(() => {
        fallbackCopyText(contentToCopy);
        showToast(`Copied ${comp.title} to clipboard!`);
      });
  } else {
    fallbackCopyText(contentToCopy);
    showToast(`Copied ${comp.title} to clipboard!`);
  }
};

function fallbackCopyText(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback copy failed', err);
  }
  document.body.removeChild(textarea);
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    setTimeout(() => {
      toast.remove();
    }, 250);
  }, 2600);
}

// --------------------------------------------------------------------------
// 4. Themes Switcher (5 Curated Themes)
// --------------------------------------------------------------------------
function setupThemeSwitcher() {
  const themeToggle = document.getElementById('theme-menu-toggle');
  const themeMenu = document.getElementById('theme-menu');
  const themeLabel = document.getElementById('current-theme-label');
  const themeOptions = document.querySelectorAll('.theme-option');

  if (!themeToggle || !themeMenu) return;

  // Toggle Theme Dropdown
  themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    themeMenu.classList.toggle('show');
  });

  // Pick theme
  themeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const selectedTheme = opt.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', selectedTheme);

      themeOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');

      if (themeLabel) {
        themeLabel.textContent = opt.querySelector('span:last-child').textContent;
      }

      themeMenu.classList.remove('show');
      showToast(`Switched theme to ${opt.querySelector('span:last-child').textContent}`);
      localStorage.setItem('mahi-theme', selectedTheme);
    });
  });

  // Restore saved theme
  const savedTheme = localStorage.getItem('mahi-theme');
  if (savedTheme) {
    const matchingOpt = Array.from(themeOptions).find(o => o.getAttribute('data-theme') === savedTheme);
    if (matchingOpt) {
      matchingOpt.click();
    }
  }

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!themeToggle.contains(e.target) && !themeMenu.contains(e.target)) {
      themeMenu.classList.remove('show');
    }
  });
}

// --------------------------------------------------------------------------
// 5. Search & Filters
// --------------------------------------------------------------------------
function setupSearchAndFilters() {
  const searchInput = document.getElementById('global-search');
  const sidebarNavItems = document.querySelectorAll('.sidebar-nav .nav-item');
  const filterPills = document.querySelectorAll('.category-pills .filter-pill');
  const itemsCountText = document.getElementById('items-count-text');

  let activeCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    const filtered = COMPONENTS_DATA.filter(comp => {
      const matchesCategory = (activeCategory === 'all' || comp.category === activeCategory);
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        comp.title.toLowerCase().includes(q) ||
        comp.description.toLowerCase().includes(q) ||
        comp.category.toLowerCase().includes(q) ||
        comp.tags.some(t => t.toLowerCase().includes(q))
      );
      return matchesCategory && matchesSearch;
    });

    renderComponents(filtered);

    if (itemsCountText) {
      itemsCountText.textContent = `Showing ${filtered.length} component collection${filtered.length === 1 ? '' : 's'}`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      applyFilters();
    });
  }

  // Filter Pills (Hero Bar)
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      activeCategory = pill.getAttribute('data-cat');

      // Sync sidebar
      sidebarNavItems.forEach(item => {
        if (item.getAttribute('data-category') === activeCategory) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      applyFilters();
    });
  });

  // Sidebar navigation items
  sidebarNavItems.forEach(item => {
    item.addEventListener('click', () => {
      sidebarNavItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      activeCategory = item.getAttribute('data-category');

      // Sync pills
      filterPills.forEach(p => {
        if (p.getAttribute('data-cat') === activeCategory) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });

      applyFilters();
    });
  });
}

// --------------------------------------------------------------------------
// 6. Preview Tab Widget Implementation (Inside preview cards)
// --------------------------------------------------------------------------
function initPreviewTabWidgets() {
  const tabsContainers = document.querySelectorAll('.tabs-container');
  tabsContainers.forEach(container => {
    const triggers = container.querySelectorAll('.tab-trigger');
    const panels = container.querySelectorAll('.tab-panel');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const targetId = trigger.getAttribute('data-tab-target');
        triggers.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        trigger.classList.add('active');
        const activePanel = container.querySelector(`#${targetId}`);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });
    });
  });
}

// --------------------------------------------------------------------------
// 7. Interactive Modals & Dropdown Showcase Helpers
// --------------------------------------------------------------------------
function setupModalHandlers() {
  const backdrop = document.getElementById('standard-modal-backdrop');
  const closeX = document.getElementById('close-modal-x');
  const cancelBtn = document.getElementById('cancel-modal-btn');
  const confirmBtn = document.getElementById('confirm-modal-btn');

  window.openShowcaseModal = function() {
    if (backdrop) backdrop.classList.add('open');
  };

  function closeModal() {
    if (backdrop) backdrop.classList.remove('open');
  }

  if (closeX) closeX.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      closeModal();
      showToast('Deployment initiated! Check pipeline progress.');
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });
  }

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (backdrop && backdrop.classList.contains('open')) closeModal();
      if (humanBackdrop && humanBackdrop.classList.contains('open')) window.closeHumanModal();
    }
  });

  // /human Community Hub Modal Handlers
  const humanBackdrop = document.getElementById('human-hub-modal-backdrop');
  const closeHumanX = document.getElementById('close-human-hub-x');
  const closeHumanBtn = document.getElementById('close-human-hub-btn');
  const navHumanLink = document.getElementById('nav-human-link');

  window.openHumanModal = function() {
    if (humanBackdrop) {
      humanBackdrop.classList.add('open');
      showToast('Welcome to the /human Community Hub!');
    }
  };

  window.closeHumanModal = function() {
    if (humanBackdrop) humanBackdrop.classList.remove('open');
    if (window.location.hash === '#/human') {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  if (closeHumanX) closeHumanX.addEventListener('click', window.closeHumanModal);
  if (closeHumanBtn) closeHumanBtn.addEventListener('click', window.closeHumanModal);

  if (humanBackdrop) {
    humanBackdrop.addEventListener('click', (e) => {
      if (e.target === humanBackdrop) window.closeHumanModal();
    });
  }

  if (navHumanLink) {
    navHumanLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.openHumanModal();
    });
  }

  // Handle direct url hash: /human or #/human
  if (window.location.hash === '#/human' || window.location.pathname.endsWith('/human')) {
    setTimeout(() => {
      window.openHumanModal();
    }, 300);
  }

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#/human') {
      window.openHumanModal();
    }
  });
}

window.toggleShowcaseDropdown = function(btn) {
  const menu = btn.parentElement.querySelector('.dropdown-menu');
  if (!menu) return;

  const isOpen = menu.classList.contains('show');
  document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));

  if (!isOpen) {
    menu.classList.add('show');
  }
};

function setupDropdownGlobalDismiss() {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-wrapper')) {
      document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
    }
  });
}

window.triggerSampleAction = function(actionLabel) {
  showToast(`Action Triggered: ${actionLabel}`);
};

// --------------------------------------------------------------------------
// 8. Global Keyboard Shortcuts (⌘K / Ctrl+K focus search)
// --------------------------------------------------------------------------
function setupGlobalKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('global-search');
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }
  });
}

function escapeHtml(string) {
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// --------------------------------------------------------------------------
// 9. 30 Frontend Developer Projects Directory Engine
// --------------------------------------------------------------------------
function initProjectsDirectory() {
  if (typeof ALL_30_PROJECTS === 'undefined') return;
  renderProjectsList(ALL_30_PROJECTS);
  setupProjectsFilterTabs();
}

function renderProjectsList(projectsList) {
  const container = document.getElementById('projects-grid-container');
  if (!container) return;

  container.innerHTML = projectsList.map(proj => {
    const diffClass = (proj.difficulty.toLowerCase() === 'beginner') ? 'diff-beginner'
      : (proj.difficulty.toLowerCase() === 'intermediate') ? 'diff-intermediate' : 'diff-advanced';

    return `
      <div class="project-item-card" id="proj-card-${proj.id}">
        <div class="proj-header">
          <span class="proj-num-badge">#${proj.num}</span>
          <span class="proj-diff-badge ${diffClass}">${proj.difficulty}</span>
        </div>

        <h3 class="proj-title">${proj.title}</h3>
        <p class="proj-desc">${proj.description}</p>

        <div class="proj-features-wrap">
          ${proj.features.map(f => `<span class="proj-feature-chip">${f}</span>`).join('')}
        </div>

        <div class="proj-inspiration-meta">
          <strong>Inspired by:</strong> ${proj.inspiredBy}
        </div>

        <button class="proj-action-btn" onclick="launchProjectModule('${proj.id}')">
          <span class="human-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
          </span>
          <span>Launch Interactive Tool</span>
        </button>
      </div>
    `;
  }).join('');
}

function setupProjectsFilterTabs() {
  const tabs = document.querySelectorAll('.proj-tab-btn');
  if (!tabs) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-proj-filter');
      if (filter === 'all') {
        renderProjectsList(ALL_30_PROJECTS);
      } else {
        const filtered = ALL_30_PROJECTS.filter(p => p.section === filter);
        renderProjectsList(filtered);
      }
    });
  });
}

window.launchProjectModule = function(projId) {
  const proj = ALL_30_PROJECTS.find(p => p.id === projId);
  if (!proj) return;

  const sandbox = document.getElementById('interactive-live-sandbox');
  if (!sandbox) return;

  if (proj.interactiveModule && INTERACTIVE_MODULES[proj.interactiveModule]) {
    sandbox.innerHTML = INTERACTIVE_MODULES[proj.interactiveModule].render();
    sandbox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    showToast(`Launched Project #${proj.num}: ${proj.title}`);

    // If dither canvas was launched, auto-render initial pattern
    if (proj.interactiveModule === 'dither-studio') {
      setTimeout(() => {
        window.renderSampleDither('bayer');
      }, 50);
    }

    // If tokens generator was launched, generate default ramp
    if (proj.interactiveModule === 'tokens-generator') {
      setTimeout(() => {
        if (window.generateColorTokens) window.generateColorTokens('#6366f1');
      }, 50);
    }
  } else {
    // Fallback: Component suite scroll or notification
    const componentCard = document.getElementById('card-buttons');
    if (componentCard) {
      componentCard.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Project #${proj.num}: ${proj.title} preview loaded!`);
  }
};

// --------------------------------------------------------------------------
// 10. 450+ Resource Directory Catalog Search & Filter Engine
// --------------------------------------------------------------------------
let userFavoriteResources = new Set(JSON.parse(localStorage.getItem('mahi-fav-resources') || '[]'));

function initResourceDirectory() {
  if (typeof RESOURCE_DIRECTORY === 'undefined') return;

  const searchInput = document.getElementById('resource-search-input');
  const catSelect = document.getElementById('resource-category-filter');
  const countBadge = document.getElementById('resource-count-badge');

  function filterAndRenderResources() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCat = catSelect ? catSelect.value : 'all';

    const filtered = RESOURCE_DIRECTORY.filter(res => {
      const matchesCat = (selectedCat === 'all' || res.category === selectedCat);
      const matchesQuery = !query || (
        res.name.toLowerCase().includes(query) ||
        res.url.toLowerCase().includes(query) ||
        res.category.toLowerCase().includes(query) ||
        res.tag.toLowerCase().includes(query)
      );
      return matchesCat && matchesQuery;
    });

    renderResourceCards(filtered);

    if (countBadge) {
      countBadge.textContent = `Showing ${filtered.length} of ${RESOURCE_DIRECTORY.length} resources`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterAndRenderResources);
  }

  if (catSelect) {
    catSelect.addEventListener('change', filterAndRenderResources);
  }

  filterAndRenderResources();
}

function renderResourceCards(resources) {
  const container = document.getElementById('resource-cards-grid');
  if (!container) return;

  if (resources.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">🔍 No resources matching your search query</p>
        <p style="font-size: 0.85rem;">Try a broader keyword like "ui", "gallery", "animation", "motion", or "icon".</p>
      </div>
    `;
    return;
  }

  // Render first 60 for instant high performance, or all if filtered
  const listToRender = resources.slice(0, 72);

  container.innerHTML = listToRender.map(res => {
    const isFav = userFavoriteResources.has(res.id);
    const domain = res.url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');

    return `
      <div class="resource-card" id="card-${res.id}">
        <div class="resource-header-row">
          <span class="resource-cat-badge">${res.tag}</span>
          <button class="resource-fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavoriteResource('${res.id}', this)" title="Add to favorites">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>
        </div>

        <h4 class="resource-name">${escapeHtml(res.name)}</h4>
        <div class="resource-url-display" title="${res.url}">${domain}</div>

        <div class="resource-footer-row">
          <a href="${res.url}" target="_blank" rel="noopener noreferrer" class="resource-visit-btn">
            <span>Visit Site</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
          <button class="resource-copy-url-btn" onclick="copySnippetText('${res.url}', 'URL')">Copy Link</button>
        </div>
      </div>
    `;
  }).join('');
}

window.toggleFavoriteResource = function(resId, btn) {
  if (userFavoriteResources.has(resId)) {
    userFavoriteResources.delete(resId);
    btn.classList.remove('active');
    btn.querySelector('svg').setAttribute('fill', 'none');
    showToast('Removed from favorites');
  } else {
    userFavoriteResources.add(resId);
    btn.classList.add('active');
    btn.querySelector('svg').setAttribute('fill', 'currentColor');
    showToast('Saved to your favorites ⭐');
  }
  localStorage.setItem('mahi-fav-resources', JSON.stringify(Array.from(userFavoriteResources)));
};


