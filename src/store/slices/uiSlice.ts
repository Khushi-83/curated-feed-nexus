
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  activeSection: string;
  searchQuery: string;
  sidebarCollapsed: boolean;
  showSearch: boolean;
}

const initialState: UIState = {
  activeSection: 'feed',
  searchQuery: '',
  sidebarCollapsed: false,
  showSearch: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    toggleSearch: (state) => {
      state.showSearch = !state.showSearch;
    },
  },
});

export const {
  setActiveSection,
  setSearchQuery,
  toggleSidebar,
  toggleSearch,
} = uiSlice.actions;

export default uiSlice.reducer;
