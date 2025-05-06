from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from app.api import recommender_routes

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/products")
def get_products():
    json_path = os.path.join(os.path.dirname(__file__), '../data/cleaned_1000_entries.json')
    with open(json_path, "r") as f:
        products = json.load(f)
    return products

app.include_router(recommender_routes.router)