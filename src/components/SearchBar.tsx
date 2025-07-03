
import React from 'react';
import { Search, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../store';
import { setSearchQuery, toggleSearch } from '../store/slices/uiSlice';
import { useDebounce } from '../hooks/useDebounce';
import { useSearchContentQuery } from '../store/api/apiSlice';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const { searchQuery, showSearch } = useSelector((state: RootState) => state.ui);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data: searchResults, isLoading } = useSearchContentQuery(
    { query: debouncedSearchQuery, type: 'all' },
    { skip: !debouncedSearchQuery }
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const clearSearch = () => {
    dispatch(setSearchQuery(''));
    dispatch(toggleSearch());
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showSearch ? (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-2 bg-gray-100 dark:bg-slate-700 border-0 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              autoFocus
            />
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ) : (
          <button
            onClick={() => dispatch(toggleSearch())}
            className="p-2 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
          >
            <Search className="h-5 w-5" />
          </button>
        )}
      </AnimatePresence>

      {/* Search Results Dropdown */}
      {searchQuery && searchResults && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 max-h-96 overflow-y-auto z-50"
        >
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : searchResults.length > 0 ? (
            searchResults.slice(0, 5).map((result: any, index: number) => (
              <div
                key={index}
                className="p-3 hover:bg-gray-50 dark:hover:bg-slate-700 border-b border-gray-100 dark:border-slate-600 last:border-b-0 cursor-pointer"
              >
                <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                  {result.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {result.description || result.overview}
                </p>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No results found</div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
