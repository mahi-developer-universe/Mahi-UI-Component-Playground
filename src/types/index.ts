export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type ComponentCategory =
  | 'buttons'
  | 'badges'
  | 'cards'
  | 'tooltips'
  | 'modals'
  | 'tabs'
  | 'dropdowns';

export interface ComponentSuite {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  previewHtml: string;
  htmlCode?: string;
  cssCode?: string;
  codeHtml?: string;
  codeCss?: string;
}

export interface FrontendProject {
  id: string;
  num: number;
  title: string;
  section: string;
  sectionLabel: string;
  difficulty: Difficulty;
  mode: 'hybrid' | 'interactive-tool';
  description: string;
  features: string[];
  inspiredBy: string;
  interactiveModule?: string;
}

export interface ResourceItem {
  id: string;
  name: string;
  url: string;
  category: string;
  tag: string;
  featured: boolean;
}

export type ThemeName = 'dark' | 'light' | 'cyberpunk' | 'emerald' | 'sunset';

export type ViewportSize = 'mobile' | 'tablet' | 'desktop';
