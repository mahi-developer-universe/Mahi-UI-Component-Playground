import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ThemeName } from '@/types';

interface AppStore {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  recentProjects: string[];
  addRecentProject: (id: string) => void;
  isThreeLabOpen: boolean;
  setThreeLabOpen: (open: boolean) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      favorites: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id]
        })),
      recentProjects: [],
      addRecentProject: (id) =>
        set((state) => ({
          recentProjects: [id, ...state.recentProjects.filter((p) => p !== id)].slice(0, 10)
        })),
      isThreeLabOpen: false,
      setThreeLabOpen: (isThreeLabOpen) => set({ isThreeLabOpen })
    }),
    {
      name: 'mahi-ui-storage',
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
        recentProjects: state.recentProjects
      })
    }
  )
);
