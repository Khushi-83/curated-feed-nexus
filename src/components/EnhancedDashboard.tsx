
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Settings, Moon, Sun, TrendingUp, Heart, Users, Clock, Activity } from 'lucide-react';
import { RootState } from '../store';
import { toggleDarkMode } from '../store/slices/userPreferencesSlice';
import { resetContent } from '../store/slices/contentSlice';
import EnhancedSidebar from './EnhancedSidebar';
import SearchBar from './SearchBar';
import InfiniteScrollContent from './InfiniteScrollContent';
import Navigation from './Navigation';

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

  // Category mapping to match user selections with data categories
  const categoryMapping: { [key: string]: string[] } = {
    'Technology': ['tech', 'technology'],
    'Sports': ['sports', 'sport'],
    'Music': ['music', 'entertainment'],
    'Movies': ['movies', 'entertainment', 'movie'],
    'News': ['news', 'politics'],
    'Gaming': ['gaming', 'games'],
    'Food': ['food', 'cooking'],
    'Travel': ['travel', 'lifestyle']
  };

  const getFilteredContent = () => {
    console.log('Active section:', activeSection);
    console.log('Selected categories:', categories);
    console.log('All items:', items.length);
    
    switch (activeSection) {
      case 'favorites':
        const favoriteContent = items.filter(item => favoriteItems.includes(item.id));
        console.log('Favorite items:', favoriteContent.length);
        return favoriteContent;
      case 'trending':
        const trendingContent = items.filter(item => item.trending);
        console.log('Trending items:', trendingContent.length);
        return trendingContent;
      default:
        if (categories.length > 0) {
          // Get all mapped category values for selected categories
          const mappedCategories = categories.flatMap(category => 
            categoryMapping[category] || [category.toLowerCase()]
          );
          console.log('Mapped categories:', mappedCategories);
          
          const filteredContent = items.filter(item => {
            const itemCategory = item.category.toLowerCase();
            const matches = mappedCategories.some(cat => 
              itemCategory.includes(cat) || cat.includes(itemCategory)
            );
            return matches;
          });
          console.log('Filtered items:', filteredContent.length);
          return filteredContent;
        }
        console.log('No filters, returning all items:', items.length);
        return items;
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
  const trendingCount = items.filter(item => item.trending).length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Sidebar */}
        <EnhancedSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Enhanced Header */}
          <motion.header 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40 shadow-sm"
          >
            <div className="flex items-center justify-between p-4 lg:p-6">
              <div className="flex items-center space-x-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {t('dashboard')}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back! Here's what's happening</p>
                  </div>
                </motion.div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Search Bar */}
                <SearchBar />
                
                {/* Dark Mode Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => dispatch(toggleDarkMode())}
                  className="p-3 rounded-xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200 shadow-sm"
                >
                  {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-slate-600" />}
                </motion.button>

                {/* Profile Dropdown */}
                <Navigation />
              </div>
            </div>
          </motion.header>

          {/* Dashboard Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 lg:p-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Total Content Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Content</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{items.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>12% increase</span>
                </div>
              </motion.div>

              {/* Favorites Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Favorites</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{favoriteItems.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-pink-600 dark:text-pink-400">
                  <Heart className="h-4 w-4 mr-1" />
                  <span>Recently saved</span>
                </div>
              </motion.div>

              {/* Trending Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Trending</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{trendingCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-orange-600 dark:text-orange-400">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>Hot topics</span>
                </div>
              </motion.div>

              {/* Categories Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{categories.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-purple-600 dark:text-purple-400">
                  <Users className="h-4 w-4 mr-1" />
                  <span>Active filters</span>
                </div>
              </motion.div>
            </div>

            {/* Content Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {getSectionTitle()}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center">
                    {loading && items.length === 0 ? (
                      <>
                        <Clock className="h-4 w-4 mr-2" />
                        {t('loading')}
                      </>
                    ) : (
                      <>
                        <Activity className="h-4 w-4 mr-2" />
                        {filteredContent.length} items available
                        {categories.length > 0 && (
                          <span className="ml-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                            Filtered by: {categories.join(', ')}
                          </span>
                        )}
                      </>
                    )}
                  </p>
                </div>
                
                {/* Quick Action Buttons */}
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    onClick={() => dispatch(resetContent())}
                  >
                    Refresh
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Content with Infinite Scroll */}
            <InfiniteScrollContent />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
