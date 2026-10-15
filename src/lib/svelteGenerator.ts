/**
 * Svelte 5 / Svelte Component Code Generator for Mahi UI Components
 */

export function generateSvelteSnippet(componentId: string, props: Record<string, any>): string {
  switch (componentId) {
    case 'buttons': {
      const label = props.label || 'Interactive Button';
      const variant = props.variant || 'primary';
      const size = props.size || 'md';
      const disabled = Boolean(props.disabled);
      const isLoading = Boolean(props.isLoading);

      return `<script lang="ts">
  let {
    label = '${label}',
    variant = '${variant}',
    size = '${size}',
    disabled = ${disabled},
    isLoading = ${isLoading},
    onclick = undefined
  }: {
    label?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'shimmer';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    isLoading?: boolean;
    onclick?: (event: MouseEvent) => void;
  } = $props();
</script>

<button
  class="mahi-btn variant-{variant} size-{size}"
  disabled={disabled || isLoading}
  {onclick}
>
  {#if isLoading}
    <span class="spinner" aria-hidden="true"></span>
  {:else}
    <span>{label}</span>
  {/if}
</button>

<style>
  .mahi-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .size-sm { padding: 6px 12px; font-size: 0.825rem; }
  .size-md { padding: 10px 18px; font-size: 0.925rem; }
  .size-lg { padding: 14px 26px; font-size: 1.05rem; }

  .variant-primary {
    background: #10b981;
    color: #042f2e;
    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
  }
  .variant-secondary {
    background: #1e293b;
    color: #f8fafc;
    border-color: #334155;
  }
  .variant-outline {
    background: transparent;
    color: #10b981;
    border-color: #10b981;
  }
  .variant-ghost {
    background: transparent;
    color: #10b981;
  }
  .variant-gradient {
    background: linear-gradient(135deg, #10b981, #6366f1);
    color: #ffffff;
  }
  .variant-shimmer {
    background: #0f172a;
    color: #34d399;
    border-color: rgba(16, 185, 129, 0.5);
  }

  .mahi-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    filter: brightness(1.1);
  }
  .mahi-btn:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }
  .mahi-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>`;
    }

    case 'badges': {
      const label = props.label || 'Verified Status';
      const variant = props.variant || 'primary';

      return `<script lang="ts">
  let {
    label = '${label}',
    variant = '${variant}'
  }: {
    label?: string;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'pulse';
  } = $props();
</script>

<span class="mahi-badge badge-{variant}">
  {#if variant === 'pulse'}
    <span class="pulse-indicator" aria-hidden="true"></span>
  {/if}
  <span>{label}</span>
</span>

<style>
  .mahi-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 700;
    border: 1px solid transparent;
  }
  .badge-default { background: #1e293b; color: #94a3b8; border-color: #334155; }
  .badge-primary { background: rgba(16, 185, 129, 0.15); color: #10b981; border-color: #10b981; }
  .badge-success { background: rgba(34, 197, 94, 0.15); color: #22c55e; border-color: #22c55e; }
  .badge-warning { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border-color: #f59e0b; }
  .badge-danger { background: rgba(239, 68, 68, 0.15); color: #ef4444; border-color: #ef4444; }
  .badge-pulse { background: rgba(16, 185, 129, 0.15); color: #10b981; border-color: #10b981; }
  .pulse-indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 8px currentColor;
    animation: pulse 1.8s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.75); }
  }
</style>`;
    }

    default: {
      const name = componentId.charAt(0).toUpperCase() + componentId.slice(1);
      return `<script lang="ts">
  let { title = 'Mahi UI ${name}' } = $props();
</script>

<div class="mahi-container">
  <h4>{title}</h4>
  <p>Exported Svelte 5 component ready for your application.</p>
</div>

<style>
  .mahi-container {
    background: #161e2e;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 1.25rem;
    color: #f8fafc;
  }
  h4 {
    color: #10b981;
    margin: 0 0 0.5rem 0;
  }
  p {
    color: #94a3b8;
    margin: 0;
    font-size: 0.9rem;
  }
</style>`;
    }
  }
}
