
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
            {/* Main Content Grid - Tighter Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item, index) => (
                <DraggableContentCard
                  key={item.id}
                  content={item}
                  index={index}
                  isFavorite={favoriteItems.includes(item.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
            {provided.placeholder}
            
            {/* Load more trigger */}
            <div ref={loadMoreRef} className="flex items-center justify-center py-12">
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-3"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full"
                  />
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Loading more amazing content...</span>
                </motion.div>
              )}
              {!hasMore && items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    You've explored everything!
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Come back later for fresh content
                  </p>
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
