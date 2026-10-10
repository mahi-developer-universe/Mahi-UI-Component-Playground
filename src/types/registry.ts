import { z } from 'zod';

export const PropTypeSchema = z.enum([
  'string',
  'number',
  'boolean',
  'select',
  'color'
]);

export type PropType = z.infer<typeof PropTypeSchema>;

export const ComponentPropSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: PropTypeSchema,
  defaultValue: z.union([z.string(), z.number(), z.boolean()]),
  options: z.array(z.string()).optional(), // For 'select' type
  description: z.string().optional(),
  min: z.number().optional(), // For 'number' type
  max: z.number().optional(),
  step: z.number().optional()
});

export type ComponentProp = z.infer<typeof ComponentPropSchema>;

export const ComponentRegistryItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  props: z.array(ComponentPropSchema),
  previewComponent: z.string(), // Identifier of the preview component renderer
  codeTemplates: z.object({
    react: z.string(),
    html: z.string(),
    tailwind: z.string().optional()
  }),
  accessibility: z.object({
    role: z.string().optional(),
    keyboardNavigation: z.string().optional(),
    wcagNotes: z.string().optional()
  }).optional()
});

export type ComponentRegistryItem = z.infer<typeof ComponentRegistryItemSchema>;
