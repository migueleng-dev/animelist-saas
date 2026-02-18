import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-black/50 backdrop-blur-md mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-primary">ANIME</span>
              <span className="text-accent">HUB</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Plataforma completa para explorar e gerenciar sua coleção de animes favoritos.
              Desenvolvido com React, FastAPI e MongoDB.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="/browse" className="hover:text-primary transition-colors">Explorar</a>
              </li>
              <li>
                <a href="/favorites" className="hover:text-primary transition-colors">Favoritos</a>
              </li>
              <li>
                <a href="/profile" className="hover:text-primary transition-colors">Perfil</a>
              </li>
            </ul>
          </div>

          {/* Contact/Social */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Conecte-se</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/migueleng-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all hover:text-primary"
                aria-label="GitHub"
                title="Meu GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/miguel-faria"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all hover:text-primary"
                aria-label="LinkedIn"
                title="Meu LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:miguelangelorfaria@gmail.com"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all hover:text-primary"
                aria-label="Email"
                title="Enviar Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Desenvolvido por <span className="text-primary font-semibold">Miguel Angelo</span>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} AnimeHub. Projeto criado para fins educacionais.</p>
            <p className="text-xs">
              Dados fornecidos por{' '}
              <a 
                href="https://jikan.moe/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Jikan API
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
