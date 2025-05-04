from fastapi import FastAPI
from functools import lru_cache
import pandas as pd
import pickle

# Absolute import (ensure recommender.py is in the same directory)
from .recommender import get_recommendations, search_products

app = FastAPI()

# Lazy load and cache the data
@lru_cache()
def load_data():
    df = pd.read_csv('data/cleaned_product_set.csv')
    with open('data/cosine_similarity.pkl', 'rb') as f:
        cosine_sim = pickle.load(f)
    return df, cosine_sim

@app.get("/search/")
def search_products_api(query: str):
    df, _ = load_data()
    results = search_products(query, df)
    return {"results": results}

@app.get("/recommend/")
def recommend_products_api(product_name: str):
    df, cosine_sim = load_data()
    recommendations = get_recommendations(product_name, df, cosine_sim)
    return {"recommendations": recommendations}
