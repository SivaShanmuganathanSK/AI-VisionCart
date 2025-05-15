from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_products():
    json_path = os.path.join(os.path.dirname(__file__), '../data/cleaned_1000_entries.json')
    try:
        with open(json_path, "r") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading products: {e}")
        return []

@app.get("/api/products")
def get_products():
    return load_products()

@app.get("/api/products/{product_id}")
def get_product(product_id: str):
    products = load_products()
    for product in products:
        if product["uniq_id"] == product_id:
            return product
    raise HTTPException(status_code=404, detail="Product not found") 