from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import Optional
import json
import os
import pandas as pd
from app.api import recommender_routes, chat_routes
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

app = FastAPI()

# MongoDB connection
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client.ecommerce
users_collection = db.users

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = "your-secret-key"  # Change this to a secure secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Models
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class User(BaseModel):
    id: str
    name: str
    email: str
    role: str = "user"

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper functions
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# User Authentication Routes
@app.post("/api/auth/signup")
async def signup(user: UserCreate):
    # Check if user already exists
    if await users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    user_dict = user.dict()
    user_dict["password"] = pwd_context.hash(user.password)
    user_dict["role"] = "user"
    user_dict["created_at"] = datetime.utcnow()
    
    result = await users_collection.insert_one(user_dict)
    
    # Create access token
    access_token = create_access_token(
        data={"sub": str(result.inserted_id)}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(result.inserted_id),
            "name": user.name,
            "email": user.email,
            "role": "user"
        }
    }

@app.post("/api/auth/login")
async def login(user_data: UserLogin):
    # Find user
    user = await users_collection.find_one({"email": user_data.email})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    # Verify password
    if not pwd_context.verify(user_data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    # Create access token
    access_token = create_access_token(
        data={"sub": str(user["_id"])}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }
    }

@app.get("/api/products")
def get_products():
    csv_path = os.path.join(os.path.dirname(__file__), '../data/cleaned_1000_entries_with_tags.csv')
    df = pd.read_csv(csv_path)
    products = df.to_dict('records')
    return products

@app.get("/api/products/{product_id}")
def get_product(product_id: str):
    csv_path = os.path.join(os.path.dirname(__file__), '../data/cleaned_1000_entries_with_tags.csv')
    df = pd.read_csv(csv_path)
    product = df[df['uniq_id'] == product_id]
    if product.empty:
        raise HTTPException(status_code=404, detail="Product not found")
    return product.iloc[0].to_dict()

# Include the recommender routes
app.include_router(recommender_routes.router, prefix="/api", tags=["recommendations"])

# Include the chat routes
app.include_router(chat_routes.router, prefix="/api", tags=["chat"])