import { ComponentSuite, FrontendProject, ResourceItem } from '@/types';
import rawComponents from './components/components.json';
import rawProjects from './projects/projects.json';
import rawResources from './resources/resources.json';

export const componentsData = rawComponents as ComponentSuite[];
export const projectsData = rawProjects as FrontendProject[];
export const resourcesData = rawResources as ResourceItem[];

export const themePresets = [
  { id: 'dark', label: 'Midnight Dark', color: '#0f172a' },
  { id: 'light', label: 'Clean Light', color: '#f8fafc' },
  { id: 'cyberpunk', label: 'Cyberpunk Neon', color: '#ff007f' },
  { id: 'emerald', label: 'Emerald Forest', color: '#064e3b' },
  { id: 'sunset', label: 'Sunset Violet', color: '#4a154b' }
];
