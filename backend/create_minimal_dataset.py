import pandas as pd

# Read the full cleaned dataset
df = pd.read_csv('backend/data/cleaned_product_set.csv')

# Select desired columns for the minimal dataset
desired_columns = [
    'uniq_id',
    'product_name',
    'brand',
    'retail_price',
    'discounted_price',
    'image',
    'product_category_tree',
    'description',
    'rating',
    'overall_rating',
    'product_specifications'
]

# Create minimal dataset with first 1000 items
df_minimal = df[desired_columns].head(1000)

# Save as CSV
df_minimal.to_csv('backend/data/products_1000.csv', index=False)

# Save as JSON
df_minimal.to_json('backend/data/products_1000.json', orient='records', indent=4)

print("✅ Created minimal dataset with 1000 items:")
print("  - CSV file: backend/data/products_1000.csv")
print("  - JSON file: backend/data/products_1000.json") 