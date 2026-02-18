import React from 'react';
import { motion } from 'framer-motion';
import { User as UserIcon, Mail, Calendar, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 pb-12" data-testid="profile-page">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-2xl p-8"
        >
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                <UserIcon className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold" data-testid="profile-name">{user.name}</h1>
                <p className="text-muted-foreground">Otaku desde sempre</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all flex items-center gap-2"
              data-testid="profile-logout-button"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </motion.button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium" data-testid="profile-email">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <Heart className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Animes Favoritos</p>
                <p className="font-medium">{user.favorites?.length || 0} animes</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Membro desde</p>
                <p className="font-medium">
                  {new Date(user.created_at).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/favorites')}
              className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
              data-testid="view-favorites-button"
            >
              Ver Meus Favoritos
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
