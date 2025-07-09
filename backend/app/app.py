from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import Optional
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# FastAPI app initialization
app = FastAPI()

# Enable secure CORS (only your frontend domain allowed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "*")],  # fallback to "*" if not set
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper function to load product data
def load_products():
    try:
        # Fixed: Correct path for 'data/cleaned_1000_entries.json' from app/app.py
        json_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'cleaned_1000_entries.json')
        with open(json_path, "r") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading products: {e}")
        return []

# API: Get all products
@app.get("/api/products")
def get_products():
    return load_products()

# API: Get product by ID
@app.get("/api/products/{product_id}")
def get_product(product_id: str):
    products = load_products()
    for product in products:
        if product["uniq_id"] == product_id:
            return product
    raise HTTPException(status_code=404, detail="Product not found")
