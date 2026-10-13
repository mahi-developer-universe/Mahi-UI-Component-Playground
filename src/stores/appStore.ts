import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ThemeName } from '@/types';

interface AppStore {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  setFavorites: (favorites: string[]) => void;
  recentProjects: string[];
  addRecentProject: (idOrSlug: string) => void;
  isThreeLabOpen: boolean;
  setThreeLabOpen: (open: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      theme: 'emerald',
      setTheme: (theme) => set({ theme }),
      favorites: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id]
        })),
      setFavorites: (favorites) => set({ favorites }),
      recentProjects: [],
      addRecentProject: (idOrSlug) =>
        set((state) => ({
          recentProjects: [
            idOrSlug,
            ...state.recentProjects.filter((p) => p !== idOrSlug)
          ].slice(0, 10)
        })),
      isThreeLabOpen: false,
      setThreeLabOpen: (isThreeLabOpen) => set({ isThreeLabOpen }),
      sidebarOpen: true,
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      commandPaletteOpen: false,
      setCommandPaletteOpen: (commandPaletteOpen) => set({ commandPaletteOpen })
    }),
    {
      name: 'mahi-ui-storage',
      version: 2,
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {}
        };
      }),
      partialize: (state) => ({
        theme: state.theme,
        favorites: state.favorites,
        recentProjects: state.recentProjects,
        sidebarOpen: state.sidebarOpen
      })
    }
  )
);
