# 🌐 Guia Completo de Deploy - AnimeHub

Este guia mostra como colocar o AnimeHub online com URL permanente GRÁTIS!

---

## 📋 Passo a Passo

### 1️⃣ Criar Conta MongoDB Atlas (Banco de Dados Grátis)

1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie uma conta gratuita
3. Crie um novo cluster:
   - Escolha **FREE** (M0 Sandbox)
   - Região: escolha mais próxima
   - Nome do cluster: `anime-cluster`
4. Crie um usuário de banco:
   - Database Access > Add New User
   - Username: `admin`
   - Password: crie uma senha forte (anote!)
5. Libere acesso de qualquer IP:
   - Network Access > Add IP Address
   - Clique em "Allow Access from Anywhere" (0.0.0.0/0)
6. Pegue a Connection String:
   - Clusters > Connect > Connect your application
   - Copie a URL (vai parecer com):
   ```
   mongodb+srv://admin:<password>@anime-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Substitua `<password>` pela senha que você criou

---

### 2️⃣ Deploy do Backend (Railway - GRÁTIS)

1. Acesse: https://railway.app/
2. Faça login com GitHub
3. Clique em **"New Project"** > **"Deploy from GitHub repo"**
4. Conecte sua conta GitHub e selecione o repositório `anime-hub`
5. Selecione a pasta **backend**
6. Adicione as variáveis de ambiente:
   - Vá em **Variables**
   - Adicione:
   ```
   MONGO_URL=sua-connection-string-do-mongodb-atlas
   DB_NAME=anime_tracker
   JWT_SECRET=seu-secret-super-seguro-aqui-123456
   CORS_ORIGINS=*
   PORT=8000
   ```
7. O deploy será feito automaticamente!
8. Copie a URL pública do backend (vai ser algo como):
   ```
   https://seu-projeto-production.up.railway.app
   ```

---

### 3️⃣ Deploy do Frontend (Vercel - GRÁTIS)

1. Acesse: https://vercel.com/
2. Faça login com GitHub
3. Clique em **"Add New Project"**
4. Selecione o repositório `anime-hub`
5. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Create React App
6. Adicione variável de ambiente:
   - Vá em **Environment Variables**
   - Adicione:
   ```
   REACT_APP_BACKEND_URL=https://sua-url-do-backend-railway.up.railway.app
   ```
7. Clique em **Deploy**
8. Aguarde alguns minutos...
9. ✅ Pronto! Sua URL estará disponível:
   ```
   https://anime-hub-seu-usuario.vercel.app
   ```

---

## 🎯 Alternativa: Render (Backend e Frontend)

Se preferir tudo em um lugar só:

### Backend no Render:
1. Acesse: https://render.com/
2. Faça login com GitHub
3. **New** > **Web Service**
4. Conecte o repositório `anime-hub`
5. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements-minimal.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`
6. Adicione variáveis de ambiente (mesmas do Railway)
7. Escolha plano **FREE**

### Frontend no Render:
1. **New** > **Static Site**
2. Conecte o repositório
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
4. Adicione variável de ambiente `REACT_APP_BACKEND_URL`

---

## 📝 Preparação do Repositório GitHub

Antes de fazer o deploy, envie o código para o GitHub:

```bash
cd anime-hub

# Inicializar git (se ainda não estiver)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "chore: preparar projeto para deploy"

# Criar repositório no GitHub e conectar
git remote add origin https://github.com/migueleng-dev/anime-hub.git

# Enviar código
git push -u origin main
```

---

## ✅ Checklist Final

Antes de fazer deploy, certifique-se de:

- [ ] Código está no GitHub
- [ ] MongoDB Atlas configurado
- [ ] Connection string do MongoDB copiada
- [ ] Variáveis de ambiente anotadas
- [ ] CORS configurado para aceitar a URL do frontend

---

## 🚀 Resultado Final

Após seguir todos os passos, você terá:

- ✅ **Backend**: https://anime-hub-api.railway.app
- ✅ **Frontend**: https://anime-hub.vercel.app
- ✅ **Banco**: MongoDB Atlas (grátis para sempre)
- ✅ **Disponível 24/7** na internet!

---

## 💡 Dicas

### Domínio Personalizado (Opcional)
- Vercel permite adicionar domínio customizado gratuitamente
- Ex: `animehub.com.br`

### Limites Gratuitos
- **Railway**: 500 horas/mês (suficiente para hobby)
- **Vercel**: Ilimitado para projetos pessoais
- **MongoDB Atlas**: 512MB de storage grátis

### Monitoramento
- Railway e Render têm logs em tempo real
- Vercel mostra analytics de acesso

---

## 🔧 Troubleshooting

### Backend não conecta ao MongoDB
- Verifique se liberou acesso de qualquer IP (0.0.0.0/0)
- Confirme que a senha está correta na connection string
- Substitua `<password>` pela senha real

### Frontend não encontra o backend
- Verifique se a variável `REACT_APP_BACKEND_URL` está correta
- Não esqueça de adicionar `/api` nas rotas se necessário
- Confirme que CORS está configurado corretamente

### Erro 502/503
- Aguarde alguns minutos (serviço gratuito pode demorar para "acordar")
- Verifique logs no painel da plataforma

---

## 📞 Suporte

Se tiver dúvidas:
1. Verifique os logs na plataforma de deploy
2. Consulte a documentação oficial
3. Teste localmente primeiro

---

**Boa sorte com o deploy! 🚀**
