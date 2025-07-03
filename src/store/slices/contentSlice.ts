
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface ContentState {
  items: ContentItem[];
  currentPage: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  items: [],
  currentPage: 1,
  hasMore: true,
  loading: false,
  error: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
    },
    appendContent: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = [...state.items, ...action.payload];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    incrementPage: (state) => {
      state.currentPage += 1;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    reorderContent: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
      const { startIndex, endIndex } = action.payload;
      const result = Array.from(state.items);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      state.items = result;
    },
  },
});

export const {
  setContent,
  appendContent,
  setLoading,
  setError,
  incrementPage,
  setHasMore,
  reorderContent,
} = contentSlice.actions;

export default contentSlice.reducer;
