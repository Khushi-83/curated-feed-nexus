
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'news' | 'movie' | 'music' | 'social';
  imageUrl: string;
  url: string;
  publishedAt: string;
  trending?: boolean;
  readTime?: string;
}

interface ContentStore {
  content: ContentItem[];
  favorites: string[];
  userPreferences: string[];
  setContent: (content: ContentItem[]) => void;
  toggleFavorite: (id: string) => void;
  updatePreferences: (preferences: string[]) => void;
  filteredContent: ContentItem[];
}

export const useContentStore = create<ContentStore>()(
  persist(
    (set, get) => ({
      content: [],
      favorites: [],
      userPreferences: ['Technology', 'News', 'Movies'],
      
      setContent: (content) => set({ content }),
      
      toggleFavorite: (id) => set((state) => ({
        favorites: state.favorites.includes(id)
          ? state.favorites.filter(fav => fav !== id)
          : [...state.favorites, id]
      })),
      
      updatePreferences: (preferences) => set({ userPreferences: preferences }),
      
      get filteredContent() {
        const { content, userPreferences } = get();
        if (userPreferences.length === 0) return content;
        return content.filter(item => 
          userPreferences.includes(item.category)
        );
      }
    }),
    {
      name: 'content-dashboard-storage',
      partialize: (state) => ({ 
        favorites: state.favorites, 
        userPreferences: state.userPreferences 
      }),
    }
  )
);
