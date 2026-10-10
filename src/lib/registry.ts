import { COMPONENT_REGISTRY } from '@/data/components/registry';
import { ComponentRegistryItemSchema } from '@/types/registry';

/**
 * Validates the entire component registry using Zod.
 * Throws an error or returns validation report.
 */
export function validateRegistry() {
  const errors: string[] = [];
  const ids = new Set<string>();

  COMPONENT_REGISTRY.forEach((item, index) => {
    // 1. Check duplicate ID
    if (ids.has(item.id)) {
      errors.push(`Duplicate component ID "${item.id}" at index ${index}`);
    }
    ids.add(item.id);

    // 2. Validate Zod schema
    const result = ComponentRegistryItemSchema.safeParse(item);
    if (!result.success) {
      errors.push(`Validation failure for "${item.id}": ${result.error.message}`);
    }
  });

  return {
    isValid: errors.length === 0,
    count: COMPONENT_REGISTRY.length,
    errors
  };
}

export function getRegistryItemById(id: string) {
  return COMPONENT_REGISTRY.find((item) => item.id === id);
}

export function generateCodeSnippet(template: string, props: Record<string, any>): string {
  let output = template;
  Object.keys(props).forEach((key) => {
    const val = props[key];
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    output = output.replace(regex, String(val));
  });
  return output;
}
