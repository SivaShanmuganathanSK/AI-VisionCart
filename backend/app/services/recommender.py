import json
import os

def load_products():
    json_path = os.path.join(os.path.dirname(__file__), '../../data/cleaned_1000_entries.json')
    with open(json_path, 'r') as f:
        return json.load(f)

def search_products(query: str):
    products = load_products()
    query = query.lower()
    results = [
        product for product in products 
        if query in product['product_name'].lower() or 
           query in product['brand'].lower() or 
           query in product['description'].lower()
    ]
    return results[:10]  # Return top 10 results

def get_recommendations(product_name: str):
    products = load_products()
    # For now, return random products as recommendations
    # TODO: Implement proper recommendation logic
    return [p for p in products if p['product_name'] != product_name][:5] 