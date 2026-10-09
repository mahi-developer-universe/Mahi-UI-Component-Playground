import { create } from 'zustand';
import { ThemeName } from '@/types';

interface AppStore {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isThreeLabOpen: boolean;
  setThreeLabOpen: (open: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
  favorites: [],
  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id]
    })),
  isThreeLabOpen: false,
  setThreeLabOpen: (isThreeLabOpen) => set({ isThreeLabOpen })
}));
