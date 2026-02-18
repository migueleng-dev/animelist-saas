import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { animeAPI } from '../services/api';
import AnimeCard from '../components/AnimeCard';
import { toast } from 'sonner';
import { useInView } from 'react-intersection-observer';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
  });

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    setAnimeList([]);
    setPage(1);
    setHasMore(true);
    fetchAnime(1, true);
  }, [searchQuery, filters]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchAnime(page + 1);
    }
  }, [inView]);

  const fetchAnime = async (pageNum, reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = searchQuery
        ? await animeAPI.search(searchQuery, pageNum, filters)
        : await animeAPI.getTop(pageNum, 25);
      
      const newAnime = response.data.data || [];
      
      if (reset) {
        setAnimeList(newAnime);
      } else {
        setAnimeList(prev => [...prev, ...newAnime]);
      }
      
      setPage(pageNum);
      setHasMore(newAnime.length === 25);
    } catch (error) {
      console.error('Error fetching anime:', error);
      toast.error('Erro ao carregar animes');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ type: '', status: '' });
    setSearchQuery('');
    navigate('/browse');
  };

  return (
    <div className="min-h-screen pt-24 pb-12" data-testid="browse-page">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Explorar Animes</h1>
          
          <form onSubmit={handleSearch} className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por título..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/50 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-xl h-12 pl-12 pr-4 transition-all outline-none"
                data-testid="browse-search-input"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
              data-testid="filter-toggle-button"
            >
              <Filter className="w-5 h-5" />
              Filtros
            </motion.button>
          </form>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="glass-panel rounded-xl p-6 mb-4"
              data-testid="filter-panel"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Tipo</label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full bg-black/50 border-white/10 rounded-lg h-10 px-3 outline-none focus:border-primary"
                    data-testid="type-filter"
                  >
                    <option value="">Todos</option>
                    <option value="tv">TV</option>
                    <option value="movie">Filme</option>
                    <option value="ova">OVA</option>
                    <option value="special">Especial</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full bg-black/50 border-white/10 rounded-lg h-10 px-3 outline-none focus:border-primary"
                    data-testid="status-filter"
                  >
                    <option value="">Todos</option>
                    <option value="airing">Em Exibição</option>
                    <option value="complete">Completo</option>
                    <option value="upcoming">Em Breve</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full h-10 rounded-lg bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    data-testid="clear-filters-button"
                  >
                    <X className="w-4 h-4" />
                    Limpar
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" data-testid="browse-anime-grid">
          {animeList.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[2/3] bg-muted rounded-xl mb-3" />
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {hasMore && !loading && <div ref={ref} className="h-20" />}

        {!loading && animeList.length === 0 && (
          <div className="text-center py-20" data-testid="no-results">
            <p className="text-muted-foreground text-lg">Nenhum anime encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
