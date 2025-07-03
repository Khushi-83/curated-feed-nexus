
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Settings, Moon, Sun } from 'lucide-react';
import { RootState } from '../store';
import { toggleDarkMode } from '../store/slices/userPreferencesSlice';
import { resetContent } from '../store/slices/contentSlice';
import EnhancedSidebar from './EnhancedSidebar';
import SearchBar from './SearchBar';
import InfiniteScrollContent from './InfiniteScrollContent';

const EnhancedDashboard: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { darkMode, categories, favoriteItems } = useSelector((state: RootState) => state.userPreferences);
  const { activeSection } = useSelector((state: RootState) => state.ui);
  const { items, loading } = useSelector((state: RootState) => state.content);

  // Reset content when section changes to ensure fresh data
  useEffect(() => {
    dispatch(resetContent());
  }, [activeSection, dispatch]);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const getFilteredContent = () => {
    switch (activeSection) {
      case 'favorites':
        return items.filter(item => favoriteItems.includes(item.id));
      case 'trending':
        return items.filter(item => item.trending);
      default:
        return categories.length > 0 
          ? items.filter(item => categories.includes(item.category))
          : items;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'favorites': return t('yourFavorites');
      case 'trending': return t('trendingNow');
      default: return t('personalizedFeed');
    }
  };

  const filteredContent = getFilteredContent();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        {/* Sidebar */}
        <EnhancedSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <motion.header 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40"
          >
            <div className="flex items-center justify-between p-4 lg:p-6">
              <div className="flex items-center space-x-4">
                <motion.h1 
                  whileHover={{ scale: 1.02 }}
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  {t('dashboard')}
                </motion.h1>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Search Bar */}
                <SearchBar />
                
                {/* Dark Mode Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => dispatch(toggleDarkMode())}
                  className="p-2 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.button>
              </div>
            </div>
          </motion.header>

          {/* Main Content Area */}
          <main className="flex-1 p-4 lg:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {getSectionTitle()}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {loading && items.length === 0 ? t('loading') : `${filteredContent.length} items available`}
              </p>
            </motion.div>

            {/* Content with Infinite Scroll */}
            <InfiniteScrollContent />
          </main>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
