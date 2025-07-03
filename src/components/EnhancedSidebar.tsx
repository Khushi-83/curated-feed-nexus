
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Home, TrendingUp, Heart, Settings, ChevronDown, ChevronRight, Zap, Gamepad2, Utensils, Plane, Music, Film, Newspaper, Trophy, Globe } from 'lucide-react';
import { RootState } from '../store';
import { setActiveSection } from '../store/slices/uiSlice';
import { updateCategories, setLanguage, toggleDarkMode } from '../store/slices/userPreferencesSlice';

const EnhancedSidebar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { activeSection } = useSelector((state: RootState) => state.ui);
  const { categories, language, darkMode } = useSelector((state: RootState) => state.userPreferences);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);

  const menuItems = [
    { id: 'feed', label: t('feed'), icon: Home },
    { id: 'trending', label: t('trending'), icon: TrendingUp },
    { id: 'favorites', label: t('favorites'), icon: Heart },
  ];

  const categoryOptions = [
    { name: 'Technology', icon: Zap, color: 'text-blue-500', key: 'technology' },
    { name: 'Sports', icon: Trophy, color: 'text-green-500', key: 'sports' },
    { name: 'Music', icon: Music, color: 'text-purple-500', key: 'music' },
    { name: 'Movies', icon: Film, color: 'text-red-500', key: 'movies' },
    { name: 'News', icon: Newspaper, color: 'text-orange-500', key: 'news' },
    { name: 'Gaming', icon: Gamepad2, color: 'text-indigo-500', key: 'gaming' },
    { name: 'Food', icon: Utensils, color: 'text-yellow-500', key: 'food' },
    { name: 'Travel', icon: Plane, color: 'text-teal-500', key: 'travel' }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' }
  ];

  const toggleCategory = (category: string) => {
    const updated = categories.includes(category)
      ? categories.filter(c => c !== category)
      : [...categories, category];
    dispatch(updateCategories(updated));
  };

  const handleLanguageChange = (langCode: string) => {
    dispatch(setLanguage(langCode));
    i18n.changeLanguage(langCode);
    setShowLanguages(false);
  };

  return (
    <motion.aside 
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col"
    >
      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => dispatch(setActiveSection(item.id))}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeSection === item.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* Preferences Section */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setShowPreferences(!showPreferences)}
          className="w-full flex items-center justify-between text-gray-700 dark:text-gray-300 font-medium mb-4 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
        >
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>{t('preferences')}</span>
          </div>
          <motion.div
            animate={{ rotate: showPreferences ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </button>

        <motion.div
          initial={false}
          animate={{ height: showPreferences ? 'auto' : 0, opacity: showPreferences ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {showPreferences && (
            <div className="space-y-4">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('darkMode')}
                </span>
                <button
                  onClick={() => dispatch(toggleDarkMode())}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    darkMode ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <motion.span
                    animate={{ x: darkMode ? 20 : 2 }}
                    className="inline-block h-4 w-4 transform rounded-full bg-white transition"
                  />
                </button>
              </div>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguages(!showLanguages)}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm font-medium">{t('language')}</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 transform transition-transform ${showLanguages ? 'rotate-90' : ''}`} />
                </button>
                
                {showLanguages && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 space-y-1"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                          language === lang.code
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                            : 'hover:bg-gray-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Select your interests
                </div>
                {categoryOptions.map((category) => {
                  const isSelected = categories.includes(category.name);
                  return (
                    <motion.label 
                      key={category.name} 
                      className="group cursor-pointer block"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-200 ${
                        isSelected 
                          ? 'border-blue-200 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700'
                      }`}>
                        <div className={`flex-shrink-0 ${category.color}`}>
                          <category.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <span className={`text-sm font-medium transition-colors ${
                            isSelected 
                              ? 'text-blue-700 dark:text-blue-300' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {t(`categories.${category.key}`)}
                          </span>
                        </div>
                        <div className="flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleCategory(category.name)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 transition-all duration-200"
                          />
                        </div>
                      </div>
                    </motion.label>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Stats */}
      <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-700">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              Active Preferences
            </h4>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{categories.length}</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {categories.length === 0 
              ? 'Select categories to personalize your feed' 
              : `${categories.length} ${categories.length === 1 ? 'category' : 'categories'} selected`
            }
          </p>
          {categories.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {categories.slice(0, 3).map((pref) => (
                <span key={pref} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {pref}
                </span>
              ))}
              {categories.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  +{categories.length - 3}
                </span>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </motion.aside>
  );
};

export default EnhancedSidebar;
