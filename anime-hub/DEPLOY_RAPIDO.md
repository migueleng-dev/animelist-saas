# 🚀 Script de Deploy Automatizado - AnimeHub

## Passo 1: Commit e Push para GitHub

Execute estes comandos no terminal (PowerShell/CMD):

```bash
cd anime-hub

# Adicionar todas as alterações
git add .

# Fazer commit
git commit -m "chore: preparar projeto para deploy em produção"

# Enviar para GitHub
git push origin main
```

Se der erro de branch, tente:
```bash
git push origin defeitos
```

---

## Passo 2: Deploy do Backend no Railway

1. Acesse: **https://railway.app/**
2. Login com GitHub
3. **New Project** > **Deploy from GitHub repo**
4. Selecione: `migueleng-dev/anime-hub`
5. **Settings** > **Root Directory**: `backend`
6. **Variables** > Adicione:
   ```
   MONGO_URL=mongodb+srv://usuario:senha@cluster.mongodb.net/
   DB_NAME=anime_tracker
   JWT_SECRET=sua-chave-secreta-muito-segura-123456
   CORS_ORIGINS=https://seu-frontend.vercel.app,http://localhost:3000
   PORT=8000
   ```

**⚠️ IMPORTANTE**: Primeiro crie o MongoDB Atlas (Passo 3 abaixo) para pegar a MONGO_URL!

---

## Passo 3: Criar MongoDB Atlas (5 minutos)

1. Acesse: **https://www.mongodb.com/cloud/atlas/register**
2. Crie conta gratuita
3. **Create a Cluster** > Escolha **FREE (M0)**
4. Região: `AWS / US East`
5. Cluster Name: `anime-cluster`
6. **Create Cluster**

### Configurar Acesso:

1. **Database Access** > **Add New Database User**
   - Username: `admin`
   - Password: criar senha forte (ANOTE!)
   
2. **Network Access** > **Add IP Address**
   - Clique em **"Allow Access from Anywhere"** (0.0.0.0/0)

3. **Connect** > **Connect your application**
   - Copie a string:
   ```
   mongodb+srv://admin:<password>@anime-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Troque `<password>` pela sua senha

4. Cole essa string na variável `MONGO_URL` do Railway (Passo 2)

---

## Passo 4: Deploy do Frontend no Vercel

1. Acesse: **https://vercel.com/**
2. Login com GitHub
3. **Add New** > **Project**
4. Import: `migueleng-dev/anime-hub`
5. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Create React App (detecta automaticamente)
6. **Environment Variables** > Add:
   ```
   REACT_APP_BACKEND_URL=https://seu-backend.up.railway.app
   ```
   (Pegue essa URL no Railway após o deploy do backend)

7. Clique em **Deploy**
8. Aguarde 2-3 minutos...
9. ✅ **Pronto!** Sua URL: `https://anime-hub-xxx.vercel.app`

---

## Passo 5: Atualizar CORS no Backend

Depois que o frontend estiver no ar:

1. Volte no **Railway** > Seu projeto backend
2. **Variables** > Edite `CORS_ORIGINS`
3. Adicione a URL do Vercel:
   ```
   CORS_ORIGINS=https://anime-hub-xxx.vercel.app,http://localhost:3000
   ```
4. Salve > Railway vai redeployar automaticamente

---

## ✅ Checklist Final

- [ ] Código enviado para GitHub
- [ ] MongoDB Atlas criado e connection string copiada
- [ ] Backend deployado no Railway
- [ ] URL do backend copiada
- [ ] Frontend deployado no Vercel com a URL do backend
- [ ] CORS atualizado no Railway com URL do Vercel
- [ ] Testado criar conta e fazer login
- [ ] Testado buscar animes
- [ ] Testado adicionar favoritos

---

## 🎉 URLs Finais

Após completar todos os passos, você terá:

- **Frontend**: `https://anime-hub-[seu-usuario].vercel.app`
- **Backend**: `https://anime-hub-[projeto].up.railway.app`
- **Documentação API**: `https://[backend-url]/docs`

**Compartilhe a URL do frontend no LinkedIn!** 🚀

---

## 📱 Para Compartilhar no LinkedIn

Copie e cole este modelo:

```
🎌 Acabei de lançar meu projeto AnimeHub!

Uma plataforma completa para explorar e gerenciar sua lista de animes favoritos.

🔧 Stack:
• Frontend: React 19 + Tailwind CSS + Framer Motion
• Backend: FastAPI (Python) + MongoDB
• Deploy: Vercel + Railway

✨ Funcionalidades:
• Catálogo com +29.000 animes
• Sistema de busca e filtros
• Autenticação JWT
• Lista de favoritos personalizada
• Design dark mode moderno

🔗 Confira: [SUA-URL-AQUI]

#WebDevelopment #React #Python #FastAPI #MongoDB #FullStack
```

---

## 💡 Dicas Extras

### Domínio Personalizado
- Vercel permite adicionar domínio gratuito
- Ex: `meuanimehub.com`

### Monitoramento
- Railway: Ver logs em tempo real
- Vercel: Analytics de visitantes
- MongoDB Atlas: Monitorar queries

### Custos
- **TUDO GRÁTIS!** 🎉
- Railway: 500h/mês gratuitas
- Vercel: Ilimitado para projetos pessoais
- MongoDB: 512MB grátis (suficiente para milhares de usuários)

---

## 🆘 Problemas Comuns

**Frontend não carrega:**
- Verifique se `REACT_APP_BACKEND_URL` está correto
- Limpe cache do navegador

**Backend não conecta ao MongoDB:**
- Confirme que liberou IP 0.0.0.0/0 no MongoDB Atlas
- Verifique senha na connection string

**Erro de CORS:**
- Adicione a URL do Vercel no `CORS_ORIGINS` do Railway
- Não esqueça de incluir `https://`

---

**Boa sorte! 🚀 Em 20 minutos seu projeto estará online!**
