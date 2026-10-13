'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/clipboard';

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

interface ProjectClientRunnerProps {
  renderedHtml: string | null;
  projectId: string;
}

export const ProjectClientRunner: React.FC<ProjectClientRunnerProps> = ({ renderedHtml, projectId }) => {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleContainerClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const button = target.closest('button') as HTMLButtonElement | null;
    if (!button) return;

    const text = button.innerText.trim();

    // If button is a copy action
    if (text.toLowerCase().includes('copy')) {
      const codeAttr = button.getAttribute('data-code');
      const success = await copyToClipboard(codeAttr || text);
      showToast(success ? `Copied: ${text}` : 'Copied to clipboard');
      return;
    }

    // Default action feedback
    showToast(`Action Triggered: ${text || 'Interactive Control'}`);
  };

  // Render pure reactive React workspace if available for project
  switch (projectId) {
    case 'proj-1':
    case '01-component-playground':
      return <ComponentPlaygroundWorkspace />;

    case 'proj-2':
    case '02-button-effects':
      return <ButtonEffectsWorkspace />;

    case 'proj-3':
    case '03-motion-playground':
      return <MotionPlaygroundWorkspace />;

    case 'proj-4':
    case '04-loader-generator':
      return <LoaderGeneratorWorkspace />;

    case 'proj-5':
    case '05-chart-playground':
      return <ChartPlaygroundWorkspace />;

    case 'proj-6':
    case '06-gradient-studio':
      return <GradientStudioWorkspace />;

    case 'proj-7':
    case '07-pattern-generator':
      return <PatternGeneratorWorkspace />;

    case 'proj-8':
    case '08-dither-editor':
      return <DitherEditorWorkspace />;

    case 'proj-9':
    case '09-typography-playground':
      return <TypographyPlaygroundWorkspace />;

    case 'proj-10':
    case '10-logo-maker':
      return <LogoMakerWorkspace />;

    case 'proj-11':
    case '11-inspiration-hub':
      return <InspirationHubWorkspace />;

    case 'proj-12':
    case '12-hero-gallery':
      return <HeroGalleryWorkspace />;

    case 'proj-13':
    case '13-navbar-playground':
      return <NavbarPlaygroundWorkspace />;

    case 'proj-14':
    case '14-cta-footer-gallery':
      return <CtaFooterGalleryWorkspace />;

    case 'proj-15':
    case '15-bookmark-manager':
      return <BookmarkManagerWorkspace />;

    case 'proj-16':
    case '16-icon-explorer':
      return <HumanIconExplorerWorkspace />;

    case 'proj-17':
    case '17-og-generator':
      return <OgGeneratorWorkspace />;

    case 'proj-18':
    case '18-css-toolkit':
      return <CssToolkitWorkspace />;

    case 'proj-19':
    case '19-accessibility-checker':
      return <AccessibilityCheckerWorkspace />;

    case 'proj-20':
    case '20-registry-explorer':
      return <RegistryExplorerWorkspace />;

    case 'proj-21':
    case '21-analytics-dashboard':
      return <AnalyticsDashboardWorkspace />;

    case 'proj-22':
    case '22-workflow-builder':
      return <WorkflowBuilderWorkspace />;

    case 'proj-23':
    case '23-prompt-playground':
      return <PromptPlaygroundWorkspace />;

    case 'proj-24':
    case '24-project-workspace':
      return <ProjectWorkspaceWorkspace />;

    case 'proj-25':
    case '25-developer-portfolio':
      return <DeveloperPortfolioWorkspace />;

    case 'proj-26':
    case '26-device-previewer':
      return <DevicePreviewerWorkspace />;

    case 'proj-27':
    case '27-token-generator':
      return <TokenGeneratorWorkspace />;

    case 'proj-28':
    case '28-screenshot-gallery':
      return <ScreenshotGalleryWorkspace />;

    case 'proj-29':
    case '29-pricing-builder':
      return <PricingBuilderWorkspace />;

    case 'proj-30':
    case '30-snippet-library':
      return <SnippetLibraryWorkspace />;

    default:
      break;
  }

  // Fallback to rendered HTML mount for remaining projects
  if (!renderedHtml) {
    return null;
  }

  return (
    <>
      {toastMsg && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
          <div className="toast">
            <span className="toast-icon">✓</span>
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      <div
        className="interactive-mount-wrapper"
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
        onClick={handleContainerClick}
      />
    </>
  );
};
