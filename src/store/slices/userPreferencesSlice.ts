
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPreferencesState {
  categories: string[];
  favoriteItems: string[];
  language: string;
  darkMode: boolean;
  feedOrder: string[];
}

const initialState: UserPreferencesState = {
  categories: ['Technology', 'News', 'Movies'],
  favoriteItems: [],
  language: 'en',
  darkMode: false,
  feedOrder: [],
};

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    updateCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const index = state.favoriteItems.indexOf(itemId);
      if (index >= 0) {
        state.favoriteItems.splice(index, 1);
      } else {
        state.favoriteItems.push(itemId);
      }
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    updateFeedOrder: (state, action: PayloadAction<string[]>) => {
      state.feedOrder = action.payload;
    },
  },
});

export const {
  updateCategories,
  toggleFavorite,
  setLanguage,
  toggleDarkMode,
  updateFeedOrder,
} = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;
