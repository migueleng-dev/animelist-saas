# 🎌 AnimeHub - Plataforma de Catálogo de Animes

![AnimeHub](https://img.shields.io/badge/Status-Completo-success)
![React](https://img.shields.io/badge/React-19.0-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-green)
![MongoDB](https://img.shields.io/badge/MongoDB-4.5-brightgreen)

Uma plataforma moderna e completa para explorar, descobrir e gerenciar sua coleção pessoal de animes. Desenvolvida com as melhores práticas de desenvolvimento full-stack.

## ✨ Características

### Frontend
- 🎨 **Design Cyberpunk Moderno** - Interface dark mode com tema cinematográfico
- ⚡ **Performance Otimizada** - Carregamento rápido e smooth scrolling
- 📱 **Totalmente Responsivo** - Funciona perfeitamente em mobile, tablet e desktop
- 🎭 **Animações Fluidas** - Microinterações usando Framer Motion
- ♿ **Acessível** - Componentes Radix UI com suporte a teclado e screen readers

### Backend
- 🚀 **API RESTful** - Endpoints bem documentados e organizados
- 🔐 **Autenticação JWT** - Sistema seguro de login e registro
- 🗄️ **MongoDB** - Banco de dados NoSQL performático
- 🔒 **Senhas Criptografadas** - Bcrypt para hash de senhas
- 📊 **Integração Jikan API** - Dados reais de animes do MyAnimeList

### Funcionalidades

✅ **Catálogo Completo**
- Browse com infinite scroll
- Busca por título
- Filtros por tipo (TV, Movie, OVA) e status
- Mais de 29.000 animes disponíveis

✅ **Sistema de Favoritos**
- Adicione animes à sua lista pessoal
- Acesso rápido aos seus favoritos
- Sincronização em tempo real

✅ **Páginas de Detalhes**
- Sinopse completa
- Informações detalhadas (episódios, score, gêneros)
- Trailer incorporado (quando disponível)
- Lista de personagens principais

✅ **Gerenciamento de Conta**
- Registro e login seguros
- Perfil personalizado
- Dashboard com estatísticas

## 🛠️ Tecnologias Utilizadas

### Frontend
```json
{
  "framework": "React 19.0",
  "routing": "React Router DOM 7.5",
  "styling": "Tailwind CSS 3.4",
  "animations": "Framer Motion 12.34",
  "components": "Radix UI",
  "icons": "Lucide React",
  "notifications": "Sonner",
  "http": "Axios 1.8"
}
```

### Backend
```python
{
  "framework": "FastAPI 0.110",
  "database": "MongoDB (Motor 3.3)",
  "auth": "PyJWT + Bcrypt",
  "async": "HTTPX + Aiohttp",
  "validation": "Pydantic 2.6"
}
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 16+ e Yarn
- Python 3.11+
- MongoDB

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/animehub.git
cd animehub
```

### 2. Configure o Backend

```bash
cd backend

# Crie um ambiente virtual
python -m venv venv
source venv/bin/activate  # No Windows: venv\\Scripts\\activate

# Instale as dependências
pip install -r requirements.txt

# Configure as variáveis de ambiente
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017
DB_NAME=anime_tracker
JWT_SECRET=seu-secret-key-aqui
CORS_ORIGINS=*
EOF

# Inicie o servidor
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### 3. Configure o Frontend

```bash
cd frontend

# Instale as dependências
yarn install

# Configure as variáveis de ambiente
cat > .env << EOF
REACT_APP_BACKEND_URL=http://localhost:8001
EOF

# Inicie o servidor de desenvolvimento
yarn start
```

### 4. Acesse a aplicação
Abra seu navegador e acesse: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
animehub/
├── backend/
│   ├── server.py          # API FastAPI
│   ├── requirements.txt   # Dependências Python
│   └── .env              # Variáveis de ambiente
│
├── frontend/
│   ├── public/           # Assets estáticos
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   │   ├── Navbar.js
│   │   │   ├── AnimeCard.js
│   │   │   ├── Hero.js
│   │   │   ├── Footer.js
│   │   │   └── ui/       # Componentes Shadcn/UI
│   │   ├── contexts/     # Context API
│   │   │   └── AuthContext.js
│   │   ├── pages/        # Páginas da aplicação
│   │   │   ├── Home.js
│   │   │   ├── Browse.js
│   │   │   ├── AnimeDetail.js
│   │   │   ├── Auth.js
│   │   │   ├── Favorites.js
│   │   │   └── Profile.js
│   │   ├── services/     # Serviços e API calls
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

## 🎯 Endpoints da API

### Autenticação
```
POST /api/auth/register  - Registrar novo usuário
POST /api/auth/login     - Login de usuário
GET  /api/user/me        - Obter dados do usuário autenticado
```

### Animes
```
GET  /api/anime/top              - Top animes
GET  /api/anime/search           - Buscar animes
GET  /api/anime/{id}             - Detalhes do anime
GET  /api/anime/{id}/characters  - Personagens do anime
```

### Favoritos
```
GET    /api/user/favorites        - Listar favoritos
POST   /api/user/favorites        - Adicionar favorito
DELETE /api/user/favorites/{id}   - Remover favorito
```

## 🎨 Design System

### Paleta de Cores
- **Background**: `#050505`
- **Primary (Violet)**: `#7C3AED`
- **Accent (Cyan)**: `#06B6D4`
- **Foreground**: `#FAFAFA`
- **Card**: `#0A0A0A`

### Tipografia
- **Headings**: Space Grotesk
- **Body**: Manrope
- **Mono**: JetBrains Mono

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de portfólio.

## 👤 Autor

**Miguel Angelo**
- GitHub: [@migueleng-dev](https://github.com/migueleng-dev)
- LinkedIn: [Miguel Faria](https://linkedin.com/in/miguel-faria)
- Email: miguelangelorfaria@gmail.com

## 🙏 Agradecimentos

- [Jikan API](https://jikan.moe/) - API pública do MyAnimeList
- [Unsplash](https://unsplash.com/) - Imagens de alta qualidade
- Comunidade open source por todas as bibliotecas incríveis

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
# Deploy fix
