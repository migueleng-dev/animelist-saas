import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import AnimeCard from '../components/AnimeCard';
import { animeAPI } from '../services/api';
import { ChevronRight, Flame, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Home = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopAnime();
  }, []);

  const fetchTopAnime = async () => {
    try {
      const response = await animeAPI.getTop(1, 20);
      setTopAnime(response.data.data || []);
    } catch (error) {
      console.error('Error fetching top anime:', error);
      toast.error('Erro ao carregar animes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" data-testid="home-page">
      <Hero />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Flame className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Top Animes</h2>
              <p className="text-sm text-muted-foreground mt-1">Os mais populares agora</p>
            </div>
          </div>
          <Link to="/browse" data-testid="view-all-link">
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors"
            >
              Ver todos
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[2/3] bg-muted rounded-xl mb-3" />
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" data-testid="anime-grid">
            {topAnime.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="glass-panel rounded-3xl p-12 text-center">
          <Star className="w-16 h-16 text-primary mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">Crie sua coleção pessoal</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Salve seus animes favoritos, organize sua lista e nunca perca de vista aquelas séries que você quer assistir.
          </p>
          <Link to="/auth" data-testid="cta-signup-button">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-primary text-white font-semibold hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all duration-300"
            >
              Criar Conta Gratuita
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
