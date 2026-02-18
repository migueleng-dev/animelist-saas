import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { userAPI } from '../services/api';
import { toast } from 'sonner';

const AnimeCard = ({ anime }) => {
  const { user, updateUser } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.favorites) {
      setIsFavorite(user.favorites.includes(anime.mal_id));
    }
  }, [user, anime.mal_id]);

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error('Faça login para adicionar favoritos');
      return;
    }

    setLoading(true);
    try {
      if (isFavorite) {
        await userAPI.removeFavorite(anime.mal_id);
        setIsFavorite(false);
        toast.success('Removido dos favoritos');
        const updatedFavorites = user.favorites.filter(id => id !== anime.mal_id);
        updateUser({ ...user, favorites: updatedFavorites });
      } else {
        await userAPI.addFavorite(anime.mal_id);
        setIsFavorite(true);
        toast.success('Adicionado aos favoritos');
        const updatedFavorites = [...user.favorites, anime.mal_id];
        updateUser({ ...user, favorites: updatedFavorites });
      }
    } catch (error) {
      toast.error('Erro ao atualizar favoritos');
      console.error('Favorite error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link to={`/anime/${anime.mal_id}`} data-testid={`anime-card-${anime.mal_id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="group relative overflow-hidden rounded-xl bg-card border border-white/5 hover:border-primary/50 transition-all duration-500 h-full"
      >
        <div className="aspect-[2/3] overflow-hidden relative">
          <img
            src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
            alt={anime.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavorite}
            disabled={loading}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
              isFavorite 
                ? 'bg-primary text-white' 
                : 'bg-black/50 text-white hover:bg-black/70'
            }`}
            data-testid={`favorite-button-${anime.mal_id}`}
          >
            <Heart 
              className="w-4 h-4" 
              fill={isFavorite ? 'currentColor' : 'none'}
            />
          </motion.button>

          {anime.score && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-md rounded-lg text-xs font-semibold">
              ⭐ {anime.score}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {anime.title}
          </h3>
          {anime.type && (
            <p className="text-xs text-muted-foreground">
              {anime.type} {anime.episodes ? `• ${anime.episodes} eps` : ''}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default AnimeCard;
