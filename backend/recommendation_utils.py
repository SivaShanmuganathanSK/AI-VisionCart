import pandas as pd
import pickle

# Load cosine similarity matrix
def load_cosine_similarity(path='data/cosine_similarity.pkl'):
    with open(path, 'rb') as file:
        cosine_sim = pickle.load(file)
    return cosine_sim

# Recommendation function
def get_recommendations(product_name, df, cosine_sim, top_n=5):
    idx_list = df.index[df['product_name'] == product_name].tolist()
    if not idx_list:
        return "❌ Product not found in database."
    idx = idx_list[0]

    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:top_n+1]
    product_indices = [i[0] for i in sim_scores]

    return df['product_name'].iloc[product_indices].tolist()

# Search function
def search_products(user_input, df, top_n=10):
    user_input = user_input.lower()
    matching_products = df[df['product_name'].str.lower().str.contains(user_input, na=False)]
    return matching_products['product_name'].head(top_n).tolist()
