import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const animeAPI = {
  getTop: (page = 1, limit = 25) => 
    api.get('/anime/top', { params: { page, limit } }),
  
  search: (query, page = 1, filters = {}) => 
    api.get('/anime/search', { 
      params: { q: query, page, limit: 25, ...filters } 
    }),
  
  getDetails: (animeId) => 
    api.get(`/anime/${animeId}`),
  
  getCharacters: (animeId) => 
    api.get(`/anime/${animeId}/characters`),
};

export const userAPI = {
  getFavorites: () => api.get('/user/favorites'),
  addFavorite: (animeId) => api.post('/user/favorites', { anime_id: animeId }),
  removeFavorite: (animeId) => api.delete(`/user/favorites/${animeId}`),
};

export default api;
