from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt
import httpx

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'anime_tracker')

try:
    client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000)
    db = client[db_name]
    logger.info(f"Connected to MongoDB at {mongo_url}")
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {e}")
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]

JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_HOURS = 72

JIKAN_API_BASE = 'https://api.jikan.moe/v4'

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    client.close()

app = FastAPI(lifespan=lifespan)
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    favorites: List[int] = Field(default_factory=list)
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class AuthResponse(BaseModel):
    token: str
    user: User

class FavoriteRequest(BaseModel):
    anime_id: int

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_token(user_id: str) -> str:
    payload = {
        'user_id': user_id,
        'exp': datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
    try:
        token = credentials.credentials
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get('user_id')
        
        user_doc = await db.users.find_one({'id': user_id}, {'_id': 0, 'password_hash': 0})
        if not user_doc:
            raise HTTPException(status_code=401, detail='User not found')
        
        return User(**user_doc)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token expired')
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail='Invalid token')

@api_router.post('/auth/register', response_model=AuthResponse)
async def register(user_data: UserCreate):
    existing = await db.users.find_one({'email': user_data.email}, {'_id': 0})
    if existing:
        raise HTTPException(status_code=400, detail='Email already registered')
    
    user = User(
        name=user_data.name,
        email=user_data.email,
        favorites=[]
    )
    
    user_dict = user.model_dump()
    user_dict['password_hash'] = hash_password(user_data.password)
    
    await db.users.insert_one(user_dict)
    
    token = create_token(user.id)
    return AuthResponse(token=token, user=user)

@api_router.post('/auth/login', response_model=AuthResponse)
async def login(credentials: UserLogin):
    user_doc = await db.users.find_one({'email': credentials.email}, {'_id': 0})
    if not user_doc:
        raise HTTPException(status_code=401, detail='Invalid credentials')
    
    if not verify_password(credentials.password, user_doc['password_hash']):
        raise HTTPException(status_code=401, detail='Invalid credentials')
    
    del user_doc['password_hash']
    user = User(**user_doc)
    
    token = create_token(user.id)
    return AuthResponse(token=token, user=user)

@api_router.get('/user/me', response_model=User)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@api_router.get('/user/favorites')
async def get_favorites(current_user: User = Depends(get_current_user)):
    return {'favorites': current_user.favorites}

@api_router.post('/user/favorites')
async def add_favorite(request: FavoriteRequest, current_user: User = Depends(get_current_user)):
    if request.anime_id in current_user.favorites:
        raise HTTPException(status_code=400, detail='Already in favorites')
    
    await db.users.update_one(
        {'id': current_user.id},
        {'$push': {'favorites': request.anime_id}}
    )
    
    return {'message': 'Added to favorites', 'anime_id': request.anime_id}

@api_router.delete('/user/favorites/{anime_id}')
async def remove_favorite(anime_id: int, current_user: User = Depends(get_current_user)):
    await db.users.update_one(
        {'id': current_user.id},
        {'$pull': {'favorites': anime_id}}
    )
    
    return {'message': 'Removed from favorites', 'anime_id': anime_id}

@api_router.get('/anime/top')
async def get_top_anime(page: int = 1, limit: int = 25):
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.get(f'{JIKAN_API_BASE}/top/anime', params={'page': page, 'limit': limit})
        if response.status_code == 200:
            return response.json()
        raise HTTPException(status_code=response.status_code, detail='Failed to fetch anime')

@api_router.get('/anime/search')
async def search_anime(q: str = '', page: int = 1, limit: int = 25, type: Optional[str] = None, status: Optional[str] = None, genres: Optional[str] = None):
    params = {'page': page, 'limit': limit}
    if q:
        params['q'] = q
    if type:
        params['type'] = type
    if status:
        params['status'] = status
    if genres:
        params['genres'] = genres
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.get(f'{JIKAN_API_BASE}/anime', params=params)
        if response.status_code == 200:
            return response.json()
        raise HTTPException(status_code=response.status_code, detail='Failed to search anime')

@api_router.get('/anime/{anime_id}')
async def get_anime_details(anime_id: int):
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.get(f'{JIKAN_API_BASE}/anime/{anime_id}/full')
        if response.status_code == 200:
            return response.json()
        raise HTTPException(status_code=response.status_code, detail='Anime not found')

@api_router.get('/anime/{anime_id}/characters')
async def get_anime_characters(anime_id: int):
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.get(f'{JIKAN_API_BASE}/anime/{anime_id}/characters')
        if response.status_code == 200:
            return response.json()
        raise HTTPException(status_code=response.status_code, detail='Failed to fetch characters')

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
