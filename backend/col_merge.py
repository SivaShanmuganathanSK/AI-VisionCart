import pandas as pd
import os
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Import helper functions
from recommendation_utils import get_recommendations, search_products, load_cosine_similarity

# Step 1: Load the cleaned dataset
df = pd.read_csv('backend/data/cleaned_1000_entries.csv')

# Step 2: Preprocessing combined features
for col in ['brand', 'product_category_tree', 'description']:
    if col not in df.columns:
        df[col] = 'Missing'

df['brand'] = df['brand'].fillna('Unknown Brand')
df['product_category_tree'] = df['product_category_tree'].fillna('Unknown Category')
df['description'] = df['description'].fillna('No description available')

df['combined_features'] = df['brand'] + " " + df['product_category_tree'] + " " + df['description']

# Remove duplicates
df = df.drop_duplicates(subset=['combined_features'])
df = df.drop_duplicates(subset=['product_name'])

# Save cosine similarity only if not already saved
cosine_sim_path = 'backend/data/cosine_similarity.pkl'

if not os.path.exists(cosine_sim_path):
    print("⏳ Calculating cosine similarity and saving...")
    cv = CountVectorizer(stop_words='english')
    count_matrix = cv.fit_transform(df['combined_features'])
    cosine_sim = cosine_similarity(count_matrix)

    with open(cosine_sim_path, 'wb') as file:
        pickle.dump(cosine_sim, file)

    print("✅ Cosine similarity matrix saved!")
else:
    print("✅ Cosine similarity matrix already exists!")

# Load cosine similarity
cosine_sim = load_cosine_similarity(cosine_sim_path)

# Test Recommendation
sample_product = "Alisha Solid Women's Cycling Shorts"
recommendations = get_recommendations(sample_product, df, cosine_sim)

print(f"🎯 Recommended products similar to '{sample_product}':")
for rec in recommendations:
    print(f"👉 {rec}")

# Test Search
search_results = search_products("shorts", df)
if search_results:
    print("🔎 Search Results:", search_results)
else:
    print("❌ No products found matching your search.")
