
import React, { useState } from 'react';
import { Home, TrendingUp, Heart, Settings, ChevronDown, ChevronRight, Zap, Gamepad2, Utensils, Plane, Music, Film, Newspaper, Trophy } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userPreferences: string[];
  onPreferencesChange: (preferences: string[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
  userPreferences,
  onPreferencesChange
}) => {
  const [showPreferences, setShowPreferences] = useState(false);

  const menuItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'favorites', label: 'Favorites', icon: Heart },
  ];

  const categories = [
    { name: 'Technology', icon: Zap, color: 'text-blue-500' },
    { name: 'Sports', icon: Trophy, color: 'text-green-500' },
    { name: 'Music', icon: Music, color: 'text-purple-500' },
    { name: 'Movies', icon: Film, color: 'text-red-500' },
    { name: 'News', icon: Newspaper, color: 'text-orange-500' },
    { name: 'Gaming', icon: Gamepad2, color: 'text-indigo-500' },
    { name: 'Food', icon: Utensils, color: 'text-yellow-500' },
    { name: 'Travel', icon: Plane, color: 'text-teal-500' }
  ];

  const togglePreference = (category: string) => {
    const updated = userPreferences.includes(category)
      ? userPreferences.filter(p => p !== category)
      : [...userPreferences, category];
    onPreferencesChange(updated);
  };

  return (
    <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeSection === item.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </button>
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
            <span>Preferences</span>
          </div>
          <div className="transition-transform duration-200">
            {showPreferences ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </div>
        </button>

        {showPreferences && (
          <div className="space-y-3 animate-fade-in">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Select your interests
            </div>
            {categories.map((category) => {
              const isSelected = userPreferences.includes(category.name);
              return (
                <label key={category.name} className="group cursor-pointer block">
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
                        {category.name}
                      </span>
                    </div>
                    <div className="flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => togglePreference(category.name)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 transition-all duration-200"
                      />
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              Active Preferences
            </h4>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{userPreferences.length}</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {userPreferences.length === 0 
              ? 'Select categories to personalize your feed' 
              : `${userPreferences.length} ${userPreferences.length === 1 ? 'category' : 'categories'} selected`
            }
          </p>
          {userPreferences.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {userPreferences.slice(0, 3).map((pref) => (
                <span key={pref} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {pref}
                </span>
              ))}
              {userPreferences.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  +{userPreferences.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
