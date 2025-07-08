
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Settings, Moon, Sun, TrendingUp, Heart, Users, Clock, Activity, Menu, X } from 'lucide-react';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        // Show all content if no categories are selected
        if (categories.length === 0) {
          console.log('No categories selected, showing all items:', items.length);
          return items;
        }
        
        // Filter by selected categories
        const filteredContent = items.filter(item => {
          const itemCategory = item.category.toLowerCase();
          return categories.some(selectedCategory => 
            itemCategory.includes(selectedCategory.toLowerCase()) || 
            selectedCategory.toLowerCase().includes(itemCategory)
          );
        });
        console.log('Filtered items:', filteredContent.length);
        return filteredContent;
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
        
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Hidden on mobile, slide in when opened */}
        <div className={`fixed lg:relative inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <EnhancedSidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen w-full lg:w-auto">
          {/* Enhanced Header */}
          <motion.header 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40 shadow-sm"
          >
            <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6">
              <div className="flex items-center space-x-3 sm:space-x-6">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <Menu className="h-5 w-5" />
                </button>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-2 sm:space-x-3"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {t('dashboard')}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden md:block">Welcome back! Here's what's happening</p>
                  </div>
                </motion.div>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Search Bar - Hidden on very small screens */}
                <div className="hidden sm:block">
                  <SearchBar />
                </div>
                
                {/* Dark Mode Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => dispatch(toggleDarkMode())}
                  className="p-2 sm:p-3 rounded-xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200 shadow-sm"
                >
                  {darkMode ? <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />}
                </motion.button>

                {/* Profile Dropdown */}
                <Navigation />
              </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="sm:hidden px-3 pb-3">
              <SearchBar />
            </div>
          </motion.header>

          {/* Dashboard Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 sm:p-4 lg:p-6"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {/* Total Content Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Content</p>
                    <p className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">{items.length}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Activity className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
                <div className="mt-2 sm:mt-4 flex items-center text-xs sm:text-sm text-green-600 dark:text-green-400">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="hidden sm:inline">12% increase</span>
                  <span className="sm:hidden">+12%</span>
                </div>
              </motion.div>

              {/* Favorites Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Favorites</p>
                    <p className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">{favoriteItems.length}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
                <div className="mt-2 sm:mt-4 flex items-center text-xs sm:text-sm text-pink-600 dark:text-pink-400">
                  <Heart className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="hidden sm:inline">Recently saved</span>
                  <span className="sm:hidden">Saved</span>
                </div>
              </motion.div>

              {/* Trending Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Trending</p>
                    <p className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">{trendingCount}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
                <div className="mt-2 sm:mt-4 flex items-center text-xs sm:text-sm text-orange-600 dark:text-orange-400">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="hidden sm:inline">Hot topics</span>
                  <span className="sm:hidden">Hot</span>
                </div>
              </motion.div>

              {/* Categories Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
                    <p className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">{categories.length}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Settings className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
                <div className="mt-2 sm:mt-4 flex items-center text-xs sm:text-sm text-purple-600 dark:text-purple-400">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="hidden sm:inline">Active filters</span>
                  <span className="sm:hidden">Filters</span>
                </div>
              </motion.div>
            </div>

            {/* Content Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 sm:mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {getSectionTitle()}
                  </h2>
                  <div className="text-gray-600 dark:text-gray-400 flex items-center flex-wrap gap-2">
                    {loading && items.length === 0 ? (
                      <>
                        <Clock className="h-4 w-4" />
                        <span>{t('loading')}</span>
                      </>
                    ) : (
                      <>
                        <Activity className="h-4 w-4" />
                        <span>{filteredContent.length} items available</span>
                        {categories.length > 0 && (
                          <span className="text-xs sm:text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                            Filtered by: {categories.slice(0, 2).join(', ')}{categories.length > 2 ? '...' : ''}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                
                {/* Quick Action Buttons */}
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg sm:rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
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
