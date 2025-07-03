
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import ContentCard from './ContentCard';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'news' | 'movie' | 'music' | 'social';
  imageUrl: string;
  url: string;
  publishedAt: string;
  trending?: boolean;
  readTime?: string;
}

interface DraggableContentCardProps {
  content: ContentItem;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const DraggableContentCard: React.FC<DraggableContentCardProps> = ({
  content,
  index,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <Draggable draggableId={content.id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          style={{
            ...provided.draggableProps.style,
            transform: snapshot.isDragging
              ? `${provided.draggableProps.style?.transform} rotate(5deg)`
              : provided.draggableProps.style?.transform,
          }}
          className={`${
            snapshot.isDragging ? 'shadow-2xl ring-2 ring-blue-500' : ''
          }`}
        >
          <ContentCard
            content={content}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
            index={index}
          />
        </motion.div>
      )}
    </Draggable>
  );
};

export default DraggableContentCard;
