# AnimeHub - Instruções de Configuração

## ✅ Correções Aplicadas

### 1. Arquivos de Ambiente
Criados arquivos `.env.example` para configuração:

**Backend** (`backend/.env.example`):
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=anime_tracker
JWT_SECRET=your-secret-key-change-in-production-12345
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

**Frontend** (`frontend/.env.example`):
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

### 2. .gitignore Limpo
Removidas linhas duplicadas e corrigida a estrutura do arquivo.

### 3. FastAPI Atualizado
Substituído `@app.on_event("shutdown")` (depreciado) por `lifespan` context manager moderno.

---

## 🚀 Como Configurar e Rodar o Projeto

### Pré-requisitos
Você precisa instalar:
- **Python 3.11+** - [Baixar aqui](https://www.python.org/downloads/)
- **Node.js 16+** - [Baixar aqui](https://nodejs.org/)
- **Yarn** - Instalar após Node.js: `npm install -g yarn`
- **MongoDB** - [Baixar aqui](https://www.mongodb.com/try/download/community)

### Passo 1: Configurar Backend

1. Copie o arquivo de exemplo:
```bash
cd backend
copy .env.example .env
```

2. Crie um ambiente virtual Python:
```bash
python -m venv venv
venv\Scripts\activate
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Inicie o MongoDB (em outro terminal):
```bash
mongod
```

5. Execute o servidor backend:
```bash
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Passo 2: Configurar Frontend

1. Abra um novo terminal e copie o arquivo de exemplo:
```bash
cd frontend
copy .env.example .env
```

2. Instale as dependências:
```bash
yarn install
```

3. Execute o servidor de desenvolvimento:
```bash
yarn start
```

### Passo 3: Acessar a Aplicação
Abra seu navegador em: `http://localhost:3000`

---

## 📝 Observações

- **Backend**: Roda na porta `8001`
- **Frontend**: Roda na porta `3000`
- **MongoDB**: Deve estar rodando na porta padrão `27017`

Se você não tiver Python, Node.js ou MongoDB instalados, siga os links de download acima.

---

## 🔧 Problemas Comuns

### MongoDB não conecta
- Certifique-se de que o MongoDB está rodando: `mongod`
- Verifique se a porta 27017 está livre

### Backend não inicia
- Ative o ambiente virtual: `venv\Scripts\activate`
- Verifique se todas as dependências foram instaladas: `pip list`

### Frontend não inicia
- Limpe o cache: `yarn cache clean`
- Delete `node_modules` e reinstale: `rmdir /s node_modules && yarn install`
