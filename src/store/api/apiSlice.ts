
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface NewsArticle {
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

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

interface SocialPost {
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

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['News', 'Movies', 'Social'],
  endpoints: (builder) => ({
    getNews: builder.query<NewsArticle[], { categories: string[]; page?: number }>({
      query: ({ categories, page = 1 }) => ({
        url: `https://newsapi.org/v2/top-headlines?category=${categories.join(',')}&page=${page}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`,
      }),
      providesTags: ['News'],
    }),
    
    getMovies: builder.query<Movie[], { genres?: string[]; page?: number }>({
      query: ({ genres, page = 1 }) => ({
        url: `https://api.themoviedb.org/3/discover/movie?with_genres=${genres?.join(',') || ''}&page=${page}&api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
      }),
      providesTags: ['Movies'],
    }),
    
    searchContent: builder.query<any[], { query: string; type: 'news' | 'movies' | 'all' }>({
      query: ({ query, type }) => {
        if (type === 'news') {
          return `https://newsapi.org/v2/everything?q=${query}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
        } else if (type === 'movies') {
          return `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
        }
        return `https://newsapi.org/v2/everything?q=${query}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
      },
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetMoviesQuery,
  useSearchContentQuery,
} = apiSlice;
