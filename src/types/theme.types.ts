export type ThemeName = 'emerald' | 'dark' | 'light' | 'cyberpunk' | 'sunset';

export interface ThemeDefinition {
  id: ThemeName;
  name: string;
  description: string;
  accent: string;
  background: string;
  cardBg: string;
}

export const THEMES: ThemeDefinition[] = [
  {
    id: 'emerald',
    name: 'Emerald Green',
    description: 'Clean modern fintech and developer green palette',
    accent: '#10b981',
    background: '#041712',
    cardBg: '#08231c'
  },
  {
    id: 'dark',
    name: 'Midnight Dark',
    description: 'Deep contrast slate and obsidian interface',
    accent: '#3b82f6',
    background: '#0b0f19',
    cardBg: '#111827'
  },
  {
    id: 'light',
    name: 'Editorial Light',
    description: 'High readability daylight and paper contrast',
    accent: '#2563eb',
    background: '#f8fafc',
    cardBg: '#ffffff'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    description: 'High voltage ultraviolet, neon pink, and cyan accents',
    accent: '#f43f5e',
    background: '#0a0614',
    cardBg: '#120a24'
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    description: 'Warm evening ember gradient and dusk hues',
    accent: '#f97316',
    background: '#160909',
    cardBg: '#231010'
  }
];
