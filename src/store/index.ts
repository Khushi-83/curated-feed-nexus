
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import contentSlice from './slices/contentSlice';
import uiSlice from './slices/uiSlice';
import userPreferencesSlice from './slices/userPreferencesSlice';
import { apiSlice } from './api/apiSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userPreferences'], // Only persist user preferences
};

const rootReducer = combineReducers({
  content: contentSlice,
  ui: uiSlice,
  userPreferences: userPreferencesSlice,
  api: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE', 
          'persist/REGISTER',
          'persist/PURGE',
          'persist/FLUSH',
          'persist/PAUSE',
        ],
        ignoredPaths: ['_persist'],
      },
    }).concat(apiSlice.middleware) as any,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
