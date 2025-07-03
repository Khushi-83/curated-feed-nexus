
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Settings, Moon, Sun } from 'lucide-react';
import { RootState } from '../store';
import { toggleDarkMode } from '../store/slices/userPreferencesSlice';
import { setContent } from '../store/slices/contentSlice';
import EnhancedSidebar from './EnhancedSidebar';
import SearchBar from './SearchBar';
import InfiniteScrollContent from './InfiniteScrollContent';
import { mockContentData } from '../data/mockData';

const EnhancedDashboard: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { darkMode, categories, favoriteItems } = useSelector((state: RootState) => state.userPreferences);
  const { activeSection } = useSelector((state: RootState) => state.ui);
  const { items, loading } = useSelector((state: RootState) => state.content);

  // Initialize content data
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setContent(mockContentData));
    }, 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

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
                {loading ? t('loading') : `${filteredContent.length} items available`}
              </p>
            </motion.div>

            {/* Content */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 animate-pulse"
                  >
                    <div className="h-48 bg-gray-200 dark:bg-slate-700 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-2/3"></div>
                  </motion.div>
                ))}
              </div>
            ) : filteredContent.length > 0 ? (
              <InfiniteScrollContent />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('noContent')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Update your preferences to see more content
                </p>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
