import { z } from 'zod';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type ProjectCategory =
  | 'ui-animation'
  | 'design-tools'
  | 'inspiration-hub'
  | 'dev-tools'
  | 'portfolio-apps'
  | 'creative-plus';

export type ExportFormat =
  | 'css'
  | 'html'
  | 'react'
  | 'svg'
  | 'png'
  | 'json'
  | 'csv'
  | 'tailwind';

export interface CanonicalProject {
  id: string; // e.g. "proj-1"
  slug: string; // e.g. "01-component-playground"
  num: number;
  title: string;
  name?: string; // Alias for title
  category: ProjectCategory;
  categoryLabel: string;
  difficulty: Difficulty;
  description: string;
  features: string[];
  tags: string[];
  icon: string;
  route: string; // e.g. "/projects/01-component-playground"
  techRequirements: string[];
  status: 'complete' | 'in-progress' | 'planned';
  exportFormats: ExportFormat[];
  inspiredBy: string;
  sourceUrl?: string;
  demoUrl?: string;
}

export const CanonicalProjectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  num: z.number().int().min(1).max(30),
  title: z.string(),
  category: z.enum([
    'ui-animation',
    'design-tools',
    'inspiration-hub',
    'dev-tools',
    'portfolio-apps',
    'creative-plus'
  ]),
  categoryLabel: z.string(),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  description: z.string(),
  features: z.array(z.string()),
  tags: z.array(z.string()),
  icon: z.string(),
  route: z.string(),
  techRequirements: z.array(z.string()),
  status: z.enum(['complete', 'in-progress', 'planned']),
  exportFormats: z.array(
    z.enum(['css', 'html', 'react', 'svg', 'png', 'json', 'csv', 'tailwind'])
  ),
  inspiredBy: z.string()
});
