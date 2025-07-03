
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { RootState } from '../store';
import { reorderContent, appendContent, incrementPage } from '../store/slices/contentSlice';
import DraggableContentCard from './DraggableContentCard';
import { toggleFavorite } from '../store/slices/userPreferencesSlice';

const InfiniteScrollContent: React.FC = () => {
  const dispatch = useDispatch();
  const { items, hasMore, loading } = useSelector((state: RootState) => state.content);
  const { favoriteItems } = useSelector((state: RootState) => state.userPreferences);
  
  const loadMoreContent = useCallback(() => {
    if (!loading && hasMore) {
      // Simulate loading more content
      dispatch(incrementPage());
      // In a real app, you'd trigger an API call here
    }
  }, [loading, hasMore, dispatch]);

  useEffect(() => {
    // Load initial content
    loadMoreContent();
  }, []);

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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {items.map((item, index) => (
              <DraggableContentCard
                key={item.id}
                content={item}
                index={index}
                isFavorite={favoriteItems.includes(item.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
            {provided.placeholder}
            
            {/* Load more trigger */}
            <div className="col-span-full h-20 flex items-center justify-center">
              {loading && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
                />
              )}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default InfiniteScrollContent;
