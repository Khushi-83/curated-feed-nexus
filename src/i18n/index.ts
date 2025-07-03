
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      dashboard: 'Content Dashboard',
      feed: 'Feed',
      trending: 'Trending',
      favorites: 'Favorites',
      preferences: 'Preferences',
      search: 'Search content...',
      darkMode: 'Dark Mode',
      language: 'Language',
      personalizedFeed: 'Personalized Feed',
      trendingNow: 'Trending Now',
      yourFavorites: 'Your Favorites',
      noContent: 'No content found',
      loading: 'Loading...',
      readMore: 'Read More',
      watchNow: 'Watch Now',
      playNow: 'Play Now',
      categories: {
        technology: 'Technology',
        sports: 'Sports',
        music: 'Music',
        movies: 'Movies',
        news: 'News',
        gaming: 'Gaming',
        food: 'Food',
        travel: 'Travel'
      }
    }
  },
  es: {
    translation: {
      dashboard: 'Panel de Contenido',
      feed: 'Feed',
      trending: 'Tendencias',
      favorites: 'Favoritos',
      preferences: 'Preferencias',
      search: 'Buscar contenido...',
      darkMode: 'Modo Oscuro',
      language: 'Idioma',
      personalizedFeed: 'Feed Personalizado',
      trendingNow: 'Tendencias Ahora',
      yourFavorites: 'Tus Favoritos',
      noContent: 'No se encontró contenido',
      loading: 'Cargando...',
      readMore: 'Leer Más',
      watchNow: 'Ver Ahora',
      playNow: 'Reproducir Ahora',
      categories: {
        technology: 'Tecnología',
        sports: 'Deportes',
        music: 'Música',
        movies: 'Películas',
        news: 'Noticias',
        gaming: 'Juegos',
        food: 'Comida',
        travel: 'Viajes'
      }
    }
  },
  fr: {
    translation: {
      dashboard: 'Tableau de Bord du Contenu',
      feed: 'Flux',
      trending: 'Tendances',
      favorites: 'Favoris',
      preferences: 'Préférences',
      search: 'Rechercher du contenu...',
      darkMode: 'Mode Sombre',
      language: 'Langue',
      personalizedFeed: 'Flux Personnalisé',
      trendingNow: 'Tendances Actuelles',
      yourFavorites: 'Vos Favoris',
      noContent: 'Aucun contenu trouvé',
      loading: 'Chargement...',
      readMore: 'Lire Plus',
      watchNow: 'Regarder Maintenant',
      playNow: 'Jouer Maintenant',
      categories: {
        technology: 'Technologie',
        sports: 'Sports',
        music: 'Musique',
        movies: 'Films',
        news: 'Actualités',
        gaming: 'Jeux',
        food: 'Nourriture',
        travel: 'Voyage'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
