
import React, { useState, useEffect } from 'react';
import { Search, Settings, Moon, Sun, TrendingUp, Heart, Home } from 'lucide-react';
import Sidebar from './Sidebar';
import ContentCard from './ContentCard';
import { useContentStore } from '../store/contentStore';
import { mockContentData } from '../data/mockData';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('feed');
  const [isLoading, setIsLoading] = useState(true);
  
  const { 
    content, 
    favorites, 
    userPreferences,
    setContent,
    toggleFavorite,
    updatePreferences,
    filteredContent 
  } = useContentStore();

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setContent(mockContentData);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [setContent]);

  // Debounced search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      // Search functionality will be handled by the store
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const getFilteredContent = () => {
    const baseContent = activeSection === 'favorites' 
      ? content.filter(item => favorites.includes(item.id))
      : activeSection === 'trending'
      ? content.filter(item => item.trending)
      : content;

    if (!searchQuery) return baseContent;
    
    return baseContent.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'favorites': return 'Your Favorites';
      case 'trending': return 'Trending Now';
      default: return 'Personalized Feed';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        {/* Sidebar */}
        <Sidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          userPreferences={userPreferences}
          onPreferencesChange={updatePreferences}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
            <div className="flex items-center justify-between p-4 lg:p-6">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Content Dashboard
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-700 border-0 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 w-64"
                  />
                </div>
                
                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-4 lg:p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {getSectionTitle()}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {isLoading ? 'Loading your personalized content...' : `${getFilteredContent().length} items available`}
              </p>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 animate-pulse">
                    <div className="h-48 bg-gray-200 dark:bg-slate-700 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              /* Content Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredContent().map((item, index) => (
                  <ContentCard
                    key={item.id}
                    content={item}
                    isFavorite={favorites.includes(item.id)}
                    onToggleFavorite={toggleFavorite}
                    index={index}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && getFilteredContent().length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No content found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchQuery ? 'Try adjusting your search terms' : 'Update your preferences to see more content'}
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
