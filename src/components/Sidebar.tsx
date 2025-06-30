
import React, { useState } from 'react';
import { Home, TrendingUp, Heart, Settings, ChevronDown, ChevronRight } from 'lucide-react';

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
    'Technology', 'Sports', 'Music', 'Movies', 'News', 'Gaming', 'Food', 'Travel'
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
          className="w-full flex items-center justify-between text-gray-700 dark:text-gray-300 font-medium mb-3"
        >
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Preferences</span>
          </div>
          {showPreferences ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>

        {showPreferences && (
          <div className="space-y-2 animate-fade-in">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={userPreferences.includes(category)}
                  onChange={() => togglePreference(category)}
                  className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-lg p-3">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            Active Preferences
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {userPreferences.length} categories selected
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
