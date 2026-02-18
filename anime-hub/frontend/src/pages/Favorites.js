import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { animeAPI } from '../services/api';
import AnimeCard from '../components/AnimeCard';
import { toast } from 'sonner';

const Favorites = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchFavorites();
  }, [user]);

  const fetchFavorites = async () => {
    if (!user || !user.favorites || user.favorites.length === 0) {
      setLoading(false);
      return;
    }

    try {
      const promises = user.favorites.map(id => 
        animeAPI.getDetails(id).catch(err => {
          console.error(`Failed to fetch anime ${id}:`, err);
          return null;
        })
      );
      const results = await Promise.all(promises);
      const validAnimes = results
        .filter(res => res && res.data && res.data.data)
        .map(res => res.data.data);
      setFavorites(validAnimes);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Erro ao carregar favoritos');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 pb-12" data-testid="favorites-page">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Heart className="w-6 h-6 text-primary" fill="currentColor" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Meus Favoritos</h1>
                <p className="text-muted-foreground mt-1">{favorites.length} animes salvos</p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[2/3] bg-muted rounded-xl mb-3" />
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" data-testid="favorites-grid">
            {favorites.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20" data-testid="no-favorites">
            <div className="glass-panel rounded-3xl p-12 max-w-md mx-auto">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Nenhum favorito ainda</h3>
              <p className="text-muted-foreground mb-6">
                Começe a adicionar animes que você ama!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/browse')}
                className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
                data-testid="browse-from-empty"
              >
                Explorar Animes
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
