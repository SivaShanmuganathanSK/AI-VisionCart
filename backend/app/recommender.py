import pandas as pd
import pickle

# These are passed in, not loaded here — clean and decoupled

def get_recommendations(product_name, df, cosine_sim, top_n=5):
    idx_list = df.index[df['product_name'] == product_name].tolist()
    if not idx_list:
        return []

    idx = idx_list[0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:top_n+1]
    product_indices = [i[0] for i in sim_scores]

    return df['product_name'].iloc[product_indices].tolist()

# def search_products(user_input, df, top_n=10):
#     user_input = user_input.lower()
#     matching_products = df[df['product_name'].str.lower().str.contains(user_input, na=False)]
#     # Remove duplicates based on 'product_name' column
#     unique_matching_products = matching_products.drop_duplicates(subset='product_name')
#     return unique_matching_products['product_name'].head(top_n).tolist()

def search_products(user_input, df, top_n=10):
    user_input = user_input.lower()
    matching_products = df[df['product_name'].str.lower().str.contains(user_input, na=False)]
    
    # Remove duplicates based on 'product_name' column
    unique_matching_products = matching_products.drop_duplicates(subset='product_name')
    
    # Optionally, sort by the length of the match (longer matches are likely more relevant)
    unique_matching_products['match_length'] = unique_matching_products['product_name'].apply(
        lambda x: len(set(user_input.split()).intersection(set(x.lower().split())))
    )
    
    # Sort by match length (you can also tweak this logic further)
    unique_matching_products = unique_matching_products.sort_values(by='match_length', ascending=False)
    
    return unique_matching_products['product_name'].head(top_n).tolist()


