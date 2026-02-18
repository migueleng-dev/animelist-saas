# 🎯 RESUMO RÁPIDO - Como Colocar Online em 15 Minutos

## 🚀 3 Passos Simples

### 1. MongoDB Atlas (Banco de Dados) - 5 min
📍 https://www.mongodb.com/cloud/atlas/register
- Criar conta grátis
- Criar cluster FREE (M0)
- Adicionar usuário admin
- Liberar acesso (0.0.0.0/0)
- **Copiar connection string**

### 2. Railway (Backend) - 5 min
📍 https://railway.app/
- Login com GitHub
- Deploy from GitHub > selecionar anime-hub
- Root Directory: `backend`
- Adicionar variáveis:
  - `MONGO_URL` = sua connection string
  - `DB_NAME` = anime_tracker
  - `JWT_SECRET` = qualquer-texto-secreto-123
  - `CORS_ORIGINS` = *
- **Copiar URL do backend**

### 3. Vercel (Frontend) - 5 min
📍 https://vercel.com/
- Login com GitHub
- Import project > anime-hub
- Root Directory: `frontend`
- Adicionar variável:
  - `REACT_APP_BACKEND_URL` = URL do Railway
- Deploy
- **✅ PRONTO! Copiar URL final**

---

## 📋 Antes de Começar

Envie o código para o GitHub:
```bash
cd anime-hub
git add .
git commit -m "deploy: preparar para produção"
git push origin main
```

---

## 🎉 Resultado

Você terá uma URL tipo:
- `https://anime-hub-seunome.vercel.app`

**Compartilhe no LinkedIn!** 🚀

---

## 📱 Modelo de Post LinkedIn

```
🎌 Projeto AnimeHub no ar!

Plataforma full-stack para explorar +29.000 animes

Stack:
✅ React 19 + Tailwind CSS
✅ FastAPI + MongoDB
✅ Deploy: Vercel + Railway

🔗 [SUA-URL-AQUI]

#React #Python #FullStack #WebDev
```

---

## 💰 Custo Total

**R$ 0,00 - COMPLETAMENTE GRÁTIS!**

- Railway: 500h/mês grátis
- Vercel: Ilimitado
- MongoDB: 512MB grátis

---

**Dúvidas? Veja os guias completos:**
- `DEPLOY_RAPIDO.md` - Passo a passo detalhado
- `GUIA_DEPLOY.md` - Guia completo com troubleshooting
