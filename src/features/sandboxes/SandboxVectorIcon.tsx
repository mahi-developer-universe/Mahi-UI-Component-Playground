import React from 'react';
import { 
  Palette, 
  Sliders, 
  Type, 
  Sparkles, 
  Grid, 
  Play, 
  LayoutTemplate, 
  Puzzle, 
  BarChart3, 
  Box, 
  Smartphone, 
  Cpu,
  MousePointerClick,
  Loader2,
  TrendingUp,
  Boxes,
  FileCode,
  ShieldCheck,
  Activity,
  Kanban,
  CreditCard,
  Layers,
  HelpCircle
} from 'lucide-react';

interface SandboxIconProps {
  iconId: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ICON_MAP: Record<string, React.FC<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  // Studios
  'studio-colors': Palette,
  'studio-themes': Sliders,
  'studio-typography': Type,
  'studio-icons': Sparkles,
  'studio-backgrounds': Grid,
  'studio-motion': Play,
  'studio-pagebuilder': LayoutTemplate,
  'studio-recipes': Puzzle,
  'studio-charts': BarChart3,
  'studio-threed': Box,
  'studio-reactnative': Smartphone,
  'studio-reverse': Cpu,

  // Projects
  'proj-button-gallery': MousePointerClick,
  'proj-loader-lab': Loader2,
  'proj-chart-playground': BarChart3,
  'proj-gradient-studio': Palette,
  'proj-pattern-studio': Grid,
  'proj-dither-studio': Sparkles,
  'proj-logo-maker': Sparkles,
  'proj-css-generator': Layers,
  'proj-a11y-checker': ShieldCheck,
  'proj-saas-dashboard': TrendingUp,
  'proj-kanban-workspace': Kanban,
  'proj-pricing-builder': CreditCard,
  'proj-device-previewer': Smartphone,
  'proj-tokens-generator': Sliders
};

export const SandboxVectorIcon: React.FC<SandboxIconProps> = ({ iconId, size = 18, className, style }) => {
  const IconComponent = ICON_MAP[iconId] || Boxes;
  return <IconComponent size={size} className={className} style={style} />;
};
