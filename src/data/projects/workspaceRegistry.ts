// src/data/projects/workspaceRegistry.ts
import React from 'react';

// Phase 2 Workspaces
import { ComponentPlaygroundWorkspace } from '@/features/component-playground';
import { ButtonEffectsWorkspace } from '@/features/button-effects';
import { MotionPlaygroundWorkspace } from '@/features/motion-playground';
import { LoaderGeneratorWorkspace } from '@/features/loader-generator';
import { ChartPlaygroundWorkspace } from '@/features/chart-playground';
import { GradientStudioWorkspace } from '@/features/gradient-studio';

// Phase 3 Workspaces
import { PatternGeneratorWorkspace } from '@/features/pattern-generator';
import { DitherEditorWorkspace } from '@/features/dither-editor';
import { TypographyPlaygroundWorkspace } from '@/features/typography-playground';
import { LogoMakerWorkspace } from '@/features/logo-maker';

// Phase 4 Workspaces
import { InspirationHubWorkspace } from '@/features/inspiration-hub';
import { HeroGalleryWorkspace } from '@/features/hero-gallery';
import { NavbarPlaygroundWorkspace } from '@/features/navbar-playground';
import { CtaFooterGalleryWorkspace } from '@/features/cta-footer-gallery';
import { BookmarkManagerWorkspace } from '@/features/bookmark-manager';
import { HumanIconExplorerWorkspace } from '@/features/icon-explorer';

// Phase 5 Workspaces
import { OgGeneratorWorkspace } from '@/features/og-generator';
import { CssToolkitWorkspace } from '@/features/css-toolkit';
import { AccessibilityCheckerWorkspace } from '@/features/accessibility-checker';
import { RegistryExplorerWorkspace } from '@/features/registry-explorer';

// Phase 6 Workspaces
import { AnalyticsDashboardWorkspace } from '@/features/analytics-dashboard';
import { WorkflowBuilderWorkspace } from '@/features/workflow-builder';
import { PromptPlaygroundWorkspace } from '@/features/prompt-playground';
import { ProjectWorkspaceWorkspace } from '@/features/project-workspace';
import { DeveloperPortfolioWorkspace } from '@/features/developer-portfolio';

// Phase 7 Workspaces (Projects 26–30)
import { DevicePreviewerWorkspace } from '@/features/device-previewer';
import { TokenGeneratorWorkspace } from '@/features/token-generator';
import { ScreenshotGalleryWorkspace } from '@/features/screenshot-gallery';
import { PricingBuilderWorkspace } from '@/features/pricing-builder';
import { SnippetLibraryWorkspace } from '@/features/snippet-library';

export type WorkspaceComponentType = React.ComponentType;

/**
 * Typed canonical registry mapping both legacy (proj-X) and canonical (0X-slug) IDs
 * to their respective full React interactive workspace components.
 */
export const workspaceRegistry: Record<string, WorkspaceComponentType> = {
  // 1
  'proj-1': ComponentPlaygroundWorkspace,
  '01-component-playground': ComponentPlaygroundWorkspace,

  // 2
  'proj-2': ButtonEffectsWorkspace,
  '02-button-effects': ButtonEffectsWorkspace,

  // 3
  'proj-3': MotionPlaygroundWorkspace,
  '03-motion-playground': MotionPlaygroundWorkspace,

  // 4
  'proj-4': LoaderGeneratorWorkspace,
  '04-loader-generator': LoaderGeneratorWorkspace,

  // 5
  'proj-5': ChartPlaygroundWorkspace,
  '05-chart-playground': ChartPlaygroundWorkspace,

  // 6
  'proj-6': GradientStudioWorkspace,
  '06-gradient-studio': GradientStudioWorkspace,

  // 7
  'proj-7': PatternGeneratorWorkspace,
  '07-pattern-generator': PatternGeneratorWorkspace,

  // 8
  'proj-8': DitherEditorWorkspace,
  '08-dither-editor': DitherEditorWorkspace,

  // 9
  'proj-9': TypographyPlaygroundWorkspace,
  '09-typography-playground': TypographyPlaygroundWorkspace,

  // 10
  'proj-10': LogoMakerWorkspace,
  '10-logo-maker': LogoMakerWorkspace,

  // 11
  'proj-11': InspirationHubWorkspace,
  '11-inspiration-hub': InspirationHubWorkspace,

  // 12
  'proj-12': HeroGalleryWorkspace,
  '12-hero-gallery': HeroGalleryWorkspace,

  // 13
  'proj-13': NavbarPlaygroundWorkspace,
  '13-navbar-playground': NavbarPlaygroundWorkspace,

  // 14
  'proj-14': CtaFooterGalleryWorkspace,
  '14-cta-footer-gallery': CtaFooterGalleryWorkspace,

  // 15
  'proj-15': BookmarkManagerWorkspace,
  '15-bookmark-manager': BookmarkManagerWorkspace,

  // 16
  'proj-16': HumanIconExplorerWorkspace,
  '16-icon-explorer': HumanIconExplorerWorkspace,

  // 17
  'proj-17': OgGeneratorWorkspace,
  '17-og-generator': OgGeneratorWorkspace,

  // 18
  'proj-18': CssToolkitWorkspace,
  '18-css-toolkit': CssToolkitWorkspace,

  // 19
  'proj-19': AccessibilityCheckerWorkspace,
  '19-accessibility-checker': AccessibilityCheckerWorkspace,

  // 20
  'proj-20': RegistryExplorerWorkspace,
  '20-registry-explorer': RegistryExplorerWorkspace,

  // 21
  'proj-21': AnalyticsDashboardWorkspace,
  '21-analytics-dashboard': AnalyticsDashboardWorkspace,

  // 22
  'proj-22': WorkflowBuilderWorkspace,
  '22-workflow-builder': WorkflowBuilderWorkspace,

  // 23
  'proj-23': PromptPlaygroundWorkspace,
  '23-prompt-playground': PromptPlaygroundWorkspace,

  // 24
  'proj-24': ProjectWorkspaceWorkspace,
  '24-project-workspace': ProjectWorkspaceWorkspace,

  // 25
  'proj-25': DeveloperPortfolioWorkspace,
  '25-developer-portfolio': DeveloperPortfolioWorkspace,

  // 26
  'proj-26': DevicePreviewerWorkspace,
  '26-device-previewer': DevicePreviewerWorkspace,

  // 27
  'proj-27': TokenGeneratorWorkspace,
  '27-token-generator': TokenGeneratorWorkspace,

  // 28
  'proj-28': ScreenshotGalleryWorkspace,
  '28-screenshot-gallery': ScreenshotGalleryWorkspace,

  // 29
  'proj-29': PricingBuilderWorkspace,
  '29-pricing-builder': PricingBuilderWorkspace,

  // 30
  'proj-30': SnippetLibraryWorkspace,
  '30-snippet-library': SnippetLibraryWorkspace
};

export function getWorkspaceComponent(projectId: string): WorkspaceComponentType | null {
  return workspaceRegistry[projectId] || null;
}
