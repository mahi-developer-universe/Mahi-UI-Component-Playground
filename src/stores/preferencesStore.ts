import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserPreferences {
  reducedMotion: boolean;
  setReducedMotion: (reducedMotion: boolean) => void;
  preferredExportFormat: 'css' | 'react' | 'html';
  setPreferredExportFormat: (format: 'css' | 'react' | 'html') => void;
  defaultViewport: 'mobile' | 'tablet' | 'desktop';
  setDefaultViewport: (viewport: 'mobile' | 'tablet' | 'desktop') => void;
  compactCards: boolean;
  setCompactCards: (compact: boolean) => void;
  showInspirationSources: boolean;
  setShowInspirationSources: (show: boolean) => void;
}

export const usePreferencesStore = create<UserPreferences>()(
  persist(
    (set) => ({
      reducedMotion: false,
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      preferredExportFormat: 'react',
      setPreferredExportFormat: (preferredExportFormat) => set({ preferredExportFormat }),
      defaultViewport: 'desktop',
      setDefaultViewport: (defaultViewport) => set({ defaultViewport }),
      compactCards: false,
      setCompactCards: (compactCards) => set({ compactCards }),
      showInspirationSources: true,
      setShowInspirationSources: (showInspirationSources) => set({ showInspirationSources })
    }),
    {
      name: 'mahi-ui-preferences',
      version: 1,
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') return localStorage;
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {}
        };
      })
    }
  )
);
