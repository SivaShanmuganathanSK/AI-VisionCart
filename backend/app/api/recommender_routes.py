from fastapi import APIRouter
from ..services.recommender import get_recommendations, search_products

router = APIRouter()

# Route 1: Search products
@router.get("/search/")
def search_products_route(query: str):
    results = search_products(query)
    return {"results": results}

# Route 2: Get recommendations
@router.get("/recommend/")
def recommend_products_route(product_name: str):
    recommendations = get_recommendations(product_name)
    return {"recommendations": recommendations}
