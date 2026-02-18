import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, User, Heart, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" data-testid="logo-link">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-heading font-bold tracking-tighter"
          >
            <span className="text-primary">ANIME</span>
            <span className="text-accent">HUB</span>
          </motion.div>
        </Link>

        <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/50 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-full h-10 pl-10 pr-4 transition-all outline-none text-sm"
              data-testid="search-input"
            />
          </div>
        </form>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/browse" data-testid="browse-link">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Explorar
            </motion.button>
          </Link>

          {user ? (
            <>
              <Link to="/favorites" data-testid="favorites-link">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-white/5 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/profile" data-testid="profile-link">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-white/5 transition-colors"
                >
                  <User className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-white/5 transition-colors"
                data-testid="logout-button"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </>
          ) : (
            <Link to="/auth" data-testid="auth-link">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-full bg-primary text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
              >
                Entrar
              </motion.button>
            </Link>
          )}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
          data-testid="mobile-menu-button"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5 p-6"
          data-testid="mobile-menu"
        >
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/50 border-white/10 focus:border-primary rounded-full h-10 pl-10 pr-4 transition-all outline-none"
              />
            </div>
          </form>
          <div className="flex flex-col gap-3">
            <Link to="/browse" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors">
                Explorar
              </button>
            </Link>
            {user ? (
              <>
                <Link to="/favorites" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors">
                    Favoritos
                  </button>
                </Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors">
                    Perfil
                  </button>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-2 rounded-full bg-primary text-white">
                  Entrar
                </button>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
