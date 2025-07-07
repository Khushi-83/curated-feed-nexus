
import React, { useState } from 'react';
import { Heart, ExternalLink, Play, Clock, Tag, TrendingUp } from 'lucide-react';

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
  const [isHovered, setIsHovered] = useState(false);

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
      case 'news': return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'movie': return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white';
      case 'music': return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      case 'social': return 'bg-gradient-to-r from-pink-500 to-pink-600 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const getCategoryGradient = () => {
    switch (content.category) {
      case 'Technology': return 'from-cyan-400 to-blue-500';
      case 'Movies': return 'from-purple-400 to-pink-500';
      case 'Sports': return 'from-orange-400 to-red-500';
      case 'Music': return 'from-green-400 to-teal-500';
      case 'Gaming': return 'from-indigo-400 to-purple-500';
      case 'Food': return 'from-yellow-400 to-orange-500';
      case 'Travel': return 'from-emerald-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getActionText = () => {
    switch (content.type) {
      case 'movie': return 'Watch Now';
      case 'music': return 'Listen Now';
      default: return 'Read More';
    }
  };

  return (
    <div 
      className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 dark:border-slate-700 animate-fade-in transform hover:scale-[1.02]"
      style={{ animationDelay: `${index * 50}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Border Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryGradient()} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
      <div className="absolute inset-0.5 bg-white dark:bg-slate-800 rounded-2xl" />
      
      {/* Content Container */}
      <div className="relative z-10">
        {/* Image Section */}
        <div className="relative h-52 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600 rounded-t-2xl overflow-hidden">
          <img
            src={content.imageUrl}
            alt={content.title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse text-gray-400">Loading...</div>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Trending Badge */}
          {content.trending && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 shadow-lg backdrop-blur-sm">
              <TrendingUp className="h-3 w-3" />
              <span>Trending</span>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={() => onToggleFavorite(content.id)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-200 shadow-lg"
          >
            <Heart 
              className={`h-4 w-4 transition-all duration-200 ${
                isFavorite ? 'text-red-500 fill-red-500 scale-110' : 'text-white hover:text-red-300'
              }`}
            />
          </button>

          {/* Type Badge */}
          <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor()} shadow-lg`}>
            {content.category}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Header with Read Time */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="h-3 w-3" />
              <span>{content.readTime || '5 min read'}</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(content.publishedAt).toLocaleDateString()}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
            {content.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 line-clamp-3 leading-relaxed">
            {content.description}
          </p>

          {/* Action Button */}
          <button 
            onClick={() => window.open(content.url, '_blank')}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r ${getCategoryGradient()} text-white rounded-xl text-sm font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 shadow-md`}
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
