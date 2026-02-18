import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Calendar, Tv, Heart, Play, Users } from 'lucide-react';
import { animeAPI, userAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const AnimeDetail = () => {
  const { id } = useParams();
  const { user, updateUser } = useAuth();
  const [anime, setAnime] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchAnimeDetails();
  }, [id]);

  useEffect(() => {
    if (user && user.favorites && anime) {
      setIsFavorite(user.favorites.includes(anime.mal_id));
    }
  }, [user, anime]);

  const fetchAnimeDetails = async () => {
    try {
      const [animeRes, charRes] = await Promise.all([
        animeAPI.getDetails(id),
        animeAPI.getCharacters(id),
      ]);
      setAnime(animeRes.data.data);
      setCharacters(charRes.data.data?.slice(0, 8) || []);
    } catch (error) {
      console.error('Error fetching anime details:', error);
      toast.error('Erro ao carregar detalhes do anime');
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (!user) {
      toast.error('Faça login para adicionar favoritos');
      return;
    }

    try {
      if (isFavorite) {
        await userAPI.removeFavorite(anime.mal_id);
        setIsFavorite(false);
        toast.success('Removido dos favoritos');
        const updatedFavorites = user.favorites.filter(fid => fid !== anime.mal_id);
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
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="aspect-[2/3] bg-muted rounded-xl" />
              </div>
              <div className="lg:col-span-2">
                <div className="h-12 bg-muted rounded w-3/4 mb-4" />
                <div className="h-4 bg-muted rounded w-1/2 mb-8" />
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <p className="text-muted-foreground">Anime não encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" data-testid="anime-detail-page">
      <div 
        className="relative h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-background" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-64 relative z-10 pb-12">
        <Link to="/browse" data-testid="back-button">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </motion.button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-24"
            >
              <img
                src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
                alt={anime.title}
                className="w-full rounded-xl shadow-2xl border border-white/10"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFavorite}
                className={`w-full mt-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  isFavorite
                    ? 'bg-primary text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
                data-testid="detail-favorite-button"
              >
                <Heart fill={isFavorite ? 'currentColor' : 'none'} className="w-5 h-5" />
                {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
              </motion.button>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2" data-testid="anime-title">
                {anime.title}
              </h1>
              {anime.title_english && anime.title_english !== anime.title && (
                <p className="text-lg text-muted-foreground mb-6">{anime.title_english}</p>
              )}

              <div className="flex flex-wrap gap-4 mb-8">
                {anime.score && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Star className="w-5 h-5 text-primary" fill="currentColor" />
                    <span className="font-semibold">{anime.score}</span>
                  </div>
                )}
                {anime.year && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                    <Calendar className="w-5 h-5" />
                    <span>{anime.year}</span>
                  </div>
                )}
                {anime.type && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                    <Tv className="w-5 h-5" />
                    <span>{anime.type}</span>
                  </div>
                )}
                {anime.episodes && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                    <Play className="w-5 h-5" />
                    <span>{anime.episodes} eps</span>
                  </div>
                )}
              </div>

              {anime.genres && anime.genres.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Gêneros</h3>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre) => (
                      <span
                        key={genre.mal_id}
                        className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm border border-accent/20"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {anime.synopsis && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Sinopse</h3>
                  <p className="text-base leading-relaxed text-foreground/90" data-testid="anime-synopsis">
                    {anime.synopsis}
                  </p>
                </div>
              )}

              {anime.trailer?.embed_url && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Trailer</h3>
                  <div className="aspect-video rounded-xl overflow-hidden border border-white/10">
                    <iframe
                      src={anime.trailer.embed_url}
                      className="w-full h-full"
                      allowFullScreen
                      title="Anime Trailer"
                    />
                  </div>
                </div>
              )}

              {characters.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="w-5 h-5 text-primary" />
                    <h3 className="text-2xl font-bold">Personagens</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {characters.map((char) => (
                      <div
                        key={char.character.mal_id}
                        className="glass-panel rounded-xl p-3 hover:border-primary/50 transition-all"
                      >
                        <img
                          src={char.character.images?.jpg?.image_url}
                          alt={char.character.name}
                          className="w-full aspect-square object-cover rounded-lg mb-2"
                        />
                        <p className="text-sm font-semibold line-clamp-2">{char.character.name}</p>
                        <p className="text-xs text-muted-foreground">{char.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
