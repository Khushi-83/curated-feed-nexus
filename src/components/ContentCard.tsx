
import React, { useState } from 'react';
import { Heart, ExternalLink, Play, Clock, Tag } from 'lucide-react';

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

interface ContentCardProps {
  content: ContentItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  index: number;
}

const ContentCard: React.FC<ContentCardProps> = ({
  content,
  isFavorite,
  onToggleFavorite,
  index
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getTypeIcon = () => {
    switch (content.type) {
      case 'movie':
      case 'music':
        return <Play className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  const getTypeColor = () => {
    switch (content.type) {
      case 'news': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'movie': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'music': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'social': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getActionText = () => {
    switch (content.type) {
      case 'movie': return 'Watch Now';
      case 'music': return 'Play Now';
      default: return 'Read More';
    }
  };

  return (
    <div 
      className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600">
        <img
          src={content.imageUrl}
          alt={content.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading...</div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Trending Badge */}
        {content.trending && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <span>🔥</span>
            <span>Trending</span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(content.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
        >
          <Heart 
            className={`h-4 w-4 transition-colors duration-200 ${
              isFavorite ? 'text-red-500 fill-red-500' : 'text-white'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor()}`}>
            {content.category}
          </span>
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="h-3 w-3" />
            <span>{content.readTime || '5 min read'}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {content.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {content.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(content.publishedAt).toLocaleDateString()}
          </span>
          
          <button 
            onClick={() => window.open(content.url, '_blank')}
            className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            {getTypeIcon()}
            <span>{getActionText()}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
