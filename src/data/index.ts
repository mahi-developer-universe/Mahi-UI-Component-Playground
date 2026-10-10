import { ComponentSuite, FrontendProject, ResourceItem } from '@/types';
import rawComponents from './components/components.json';
import rawProjects from './projects/projects.json';
import rawResources from './resources/resources.json';

export const componentsData = rawComponents as ComponentSuite[];
export const projectsData = rawProjects as FrontendProject[];
export const resourcesData = rawResources as ResourceItem[];

export const themePresets = [
  { id: 'dark', label: 'Slate Dark', color: '#0b0f19' },
  { id: 'light', label: 'Clean Paper', color: '#ffffff' },
  { id: 'cyberpunk', label: 'Cyberpunk Neon', color: '#f43f5e' },
  { id: 'emerald', label: 'Emerald Forest', color: '#061914' },
  { id: 'sunset', label: 'Warm Sunset', color: '#140d18' }
];
