
export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  category: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface SocialPost {
  id: string;
  text: string;
  user: {
    name: string;
    screen_name: string;
    profile_image_url: string;
  };
  created_at: string;
  hashtags: string[];
}

export interface ContentItem {
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
