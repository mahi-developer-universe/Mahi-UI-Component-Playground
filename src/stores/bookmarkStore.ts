import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  category: string;
  tags: string[];
  notes?: string;
  createdAt: string;
}

interface BookmarkStore {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => { success: boolean; message: string };
  updateBookmark: (id: string, updates: Partial<Omit<Bookmark, 'id' | 'createdAt'>>) => void;
  deleteBookmark: (id: string) => void;
  importBookmarks: (jsonString: string) => { success: boolean; count: number; error?: string };
  exportBookmarks: () => string;
  clearAllBookmarks: () => void;
}

const DEFAULT_BOOKMARKS: Bookmark[] = [
  {
    id: 'bm-1',
    title: 'Cult UI - Micro-interactions',
    url: 'https://www.cult-ui.com/',
    category: 'Component Libraries',
    tags: ['components', 'primitives', 'dark-mode'],
    notes: 'Inspiration for high-end micro-interactions',
    createdAt: new Date().toISOString()
  },
  {
    id: 'bm-2',
    title: '21st.dev Magic Catalog',
    url: 'https://21st.dev/',
    category: 'Component Libraries',
    tags: ['react', 'tailwind', 'animations'],
    notes: 'Next generation community design library',
    createdAt: new Date().toISOString()
  },
  {
    id: 'bm-3',
    title: 'Shadcn UI',
    url: 'https://ui.shadcn.com/',
    category: 'Design Systems',
    tags: ['radix', 'accessible', 'tailwind'],
    notes: 'Industry benchmark accessible component system',
    createdAt: new Date().toISOString()
  }
];

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: DEFAULT_BOOKMARKS,
      addBookmark: (data) => {
        const state = get();
        // Check for duplicate URL
        const normalizedUrl = data.url.trim().toLowerCase().replace(/\/$/, '');
        const duplicate = state.bookmarks.find(
          (b) => b.url.trim().toLowerCase().replace(/\/$/, '') === normalizedUrl
        );

        if (duplicate) {
          return { success: false, message: `Bookmark with URL already exists: ${duplicate.title}` };
        }

        const newBookmark: Bookmark = {
          ...data,
          id: `bm-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          createdAt: new Date().toISOString()
        };

        set({ bookmarks: [newBookmark, ...state.bookmarks] });
        return { success: true, message: 'Bookmark saved successfully' };
      },
      updateBookmark: (id, updates) =>
        set((state) => ({
          bookmarks: state.bookmarks.map((b) => (b.id === id ? { ...b, ...updates } : b))
        })),
      deleteBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id)
        })),
      importBookmarks: (jsonString) => {
        try {
          const parsed = JSON.parse(jsonString);
          if (!Array.isArray(parsed)) {
            return { success: false, count: 0, error: 'JSON payload must be an array of bookmarks' };
          }

          let added = 0;
          const current = get().bookmarks;
          const existingUrls = new Set(
            current.map((b) => b.url.trim().toLowerCase().replace(/\/$/, ''))
          );

          const validToInsert: Bookmark[] = [];
          for (const item of parsed) {
            if (item && item.url && item.title) {
              const norm = String(item.url).trim().toLowerCase().replace(/\/$/, '');
              if (!existingUrls.has(norm)) {
                existingUrls.add(norm);
                validToInsert.push({
                  id: item.id || `bm-import-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                  title: String(item.title).slice(0, 100),
                  url: String(item.url).slice(0, 500),
                  category: String(item.category || 'General').slice(0, 50),
                  tags: Array.isArray(item.tags) ? item.tags.map(String).slice(0, 10) : [],
                  notes: item.notes ? String(item.notes).slice(0, 500) : '',
                  createdAt: item.createdAt || new Date().toISOString()
                });
                added++;
              }
            }
          }

          set({ bookmarks: [...validToInsert, ...current] });
          return { success: true, count: added };
        } catch (err: any) {
          return { success: false, count: 0, error: err.message || 'Malformed JSON' };
        }
      },
      exportBookmarks: () => {
        return JSON.stringify(get().bookmarks, null, 2);
      },
      clearAllBookmarks: () => set({ bookmarks: [] })
    }),
    {
      name: 'mahi-ui-bookmarks',
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
