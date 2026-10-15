/**
 * Vue 3 (Single File Component / <script setup>) Code Generator for Mahi UI Components
 */

export function generateVueSnippet(componentId: string, props: Record<string, any>): string {
  switch (componentId) {
    case 'buttons': {
      const label = props.label || 'Interactive Button';
      const variant = props.variant || 'primary';
      const size = props.size || 'md';
      const disabled = Boolean(props.disabled);
      const isLoading = Boolean(props.isLoading);

      return `<template>
  <button
    :class="['mahi-button', \`variant-\${variant}\`, \`size-\${size}\`]"
    :disabled="disabled || isLoading"
    @click="$emit('click', $event)"
  >
    <span v-if="isLoading" class="spinner"></span>
    <span v-else class="content">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'shimmer';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    isLoading?: boolean;
  }>(),
  {
    label: '${label}',
    variant: '${variant}',
    size: '${size}',
    disabled: ${disabled},
    isLoading: ${isLoading}
  }
);

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();
</script>

<style scoped>
.mahi-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid transparent;
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

.mahi-button:hover:not(:disabled) {
  transform: translateY(-1px);
  filter: brightness(1.1);
}
.mahi-button:active:not(:disabled) {
  transform: translateY(0) scale(0.98);
}
.mahi-button:disabled {
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

      return `<template>
  <span :class="['mahi-badge', \`badge-\${variant}\`]">
    <span v-if="variant === 'pulse'" class="pulse-indicator"></span>
    <span>{{ label }}</span>
  </span>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'pulse';
  }>(),
  {
    label: '${label}',
    variant: '${variant}'
  }
);
</script>

<style scoped>
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

    case 'cards': {
      const title = props.title || 'Handcrafted Bento Card';
      const description = props.description || 'Flexible Vue 3 component container.';

      return `<template>
  <div class="mahi-card">
    <div class="card-header">
      <h3>{{ title }}</h3>
    </div>
    <p class="card-body">{{ description }}</p>
    <div class="card-footer">
      <slot name="footer">
        <span class="action-link">Explore Details →</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    description?: string;
  }>(),
  {
    title: '${title}',
    description: '${description}'
  }
);
</script>

<style scoped>
.mahi-card {
  background: #161e2e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.mahi-card:hover {
  transform: translateY(-2px);
  border-color: rgba(16, 185, 129, 0.3);
}
.card-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  color: #f8fafc;
}
.card-body {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0 0 1.25rem 0;
}
.card-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 0.75rem;
}
.action-link {
  font-size: 0.85rem;
  color: #10b981;
  font-weight: 600;
  cursor: pointer;
}
</style>`;
    }

    default: {
      const name = componentId.charAt(0).toUpperCase() + componentId.slice(1);
      return `<template>
  <div class="mahi-${componentId}">
    <h4>Mahi UI ${name}</h4>
    <div class="props-dump">
      <pre>{{ props }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<Record<string, any>>();
</script>

<style scoped>
.mahi-${componentId} {
  background: #161e2e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.25rem;
  color: #f8fafc;
}
.props-dump pre {
  color: #10b981;
  font-size: 0.8rem;
  margin: 0.5rem 0 0 0;
}
</style>`;
    }
  }
}
