import json
import os
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

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
    
    # Create a DataFrame for easier manipulation
    df = pd.DataFrame(products)
    
    # Combine relevant features for similarity
    df['combined_features'] = df['brand'].fillna('') + " " + \
                            df['product_category_tree'].fillna('') + " " + \
                            df['description'].fillna('')
    
    # Create the count matrix
    cv = CountVectorizer(stop_words='english')
    count_matrix = cv.fit_transform(df['combined_features'])
    
    # Compute the cosine similarity
    cosine_sim = cosine_similarity(count_matrix)
    
    # Find the index of the product
    product_indices = df.index[df['product_name'] == product_name].tolist()
    if not product_indices:
        return []
    
    idx = product_indices[0]
    
    # Get similarity scores
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:6]  # Get top 5 similar products
    
    # Get product indices
    product_indices = [i[0] for i in sim_scores]
    
    # Return recommended products
    return [products[i] for i in product_indices] 