
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { RootState } from '../store';
import { reorderContent, appendContent, incrementPage, setLoading } from '../store/slices/contentSlice';
import DraggableContentCard from './DraggableContentCard';
import { toggleFavorite } from '../store/slices/userPreferencesSlice';
import { mockContentData } from '../data/mockData';

const InfiniteScrollContent: React.FC = () => {
  const dispatch = useDispatch();
  const { items, hasMore, loading, currentPage } = useSelector((state: RootState) => state.content);
  const { favoriteItems } = useSelector((state: RootState) => state.userPreferences);
  
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const loadMoreContent = useCallback(async () => {
    if (loading || !hasMore) return;
    
    dispatch(setLoading(true));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate new mock content with different IDs
    const newContent = mockContentData.map((item, index) => ({
      ...item,
      id: `${item.id}-page-${currentPage}-${index}`,
      title: currentPage === 1 ? item.title : `${item.title} (Page ${currentPage})`,
    }));
    
    dispatch(appendContent(newContent));
    dispatch(incrementPage());
    dispatch(setLoading(false));
    
    // Stop loading more after 3 pages for demo purposes
    if (currentPage >= 3) {
      // In a real app, you'd set hasMore based on API response
    }
  }, [loading, hasMore, dispatch, currentPage]);

  // Load initial content only once
  useEffect(() => {
    if (items.length === 0) {
      loadMoreContent();
    }
  }, []);

  // Trigger loading when the load more element comes into view
  useEffect(() => {
    if (inView && !loading && hasMore) {
      loadMoreContent();
    }
  }, [inView, loadMoreContent, loading, hasMore]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    dispatch(reorderContent({
      startIndex: result.source.index,
      endIndex: result.destination.index,
    }));
  };

  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="content-list">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-8"
          >
            {/* Main Content Grid - Enhanced Layout */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <DraggableContentCard
                    content={item}
                    index={index}
                    isFavorite={favoriteItems.includes(item.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                </motion.div>
              ))}
            </motion.div>
            {provided.placeholder}
            
            {/* Enhanced Load More Section */}
            <div ref={loadMoreRef} className="flex items-center justify-center py-16">
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center space-y-4"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-2 w-8 h-8 border-3 border-purple-500 border-b-transparent rounded-full"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Loading more content...</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Discovering amazing stories for you</p>
                  </div>
                </motion.div>
              )}
              {!hasMore && items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700"
                >
                  <div className="text-6xl mb-6">🎉</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    You've explored everything!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    You've reached the end of your personalized content feed
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    onClick={() => window.location.reload()}
                  >
                    Refresh Feed
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default InfiniteScrollContent;
