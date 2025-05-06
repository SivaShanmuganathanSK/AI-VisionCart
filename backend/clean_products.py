import pandas as pd

# Step 1: Load the data
df = pd.read_csv('backend/data/flipkart_com-ecommerce_sample.csv')

# Step 2: Check missing values
print("Before cleaning:")
print(df.isnull().sum())

# Step 3: Fill missing values
df['brand'] = df['brand'].fillna('Unknown Brand')
df['product_category_tree'] = df['product_category_tree'].fillna('Unknown Category')
df['description'] = df['description'].fillna('No description available')
df['retail_price'] = df['retail_price'].fillna(0)
df['discounted_price'] = df['discounted_price'].fillna(0)
df['product_specifications'] = df['product_specifications'].fillna('No specifications available')

# Step 4: Drop rows where 'product_name' or 'image' is missing
df = df.dropna(subset=['product_name', 'image'])

# Step 5: Check again
print("\nAfter cleaning:")
print(df.isnull().sum())

# =========================
# 🔹 OUTPUT 1: Full Cleaned Data
# =========================
df.to_csv('backend/data/cleaned_product_set.csv', index=False)
df.to_json('backend/data/cleaned_product_set.json', orient='records', indent=4)

# =========================
# 🔹 OUTPUT 2: Cleaned + Fewer Columns (All Rows)
# =========================
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
df_fewer_columns = df[desired_columns]
df_fewer_columns.to_csv('backend/data/cleaned_fewer_columns.csv', index=False)
df_fewer_columns.to_json('backend/data/cleaned_fewer_columns.json', orient='records', indent=4)

# =========================
# 🔹 OUTPUT 3: Cleaned + Fewer Columns + 1000 Entries
# =========================
df_1000 = df_fewer_columns.head(1000)
df_1000.to_csv('backend/data/cleaned_1000_entries.csv', index=False)
df_1000.to_json('backend/data/cleaned_1000_entries.json', orient='records', indent=4)

# =========================
print("\n✅ Final outputs generated:")
print("1. Full cleaned dataset (all columns, all rows):")
print("   - CSV: backend/data/cleaned_product_set.csv")
print("   - JSON: backend/data/cleaned_product_set.json")

print("2. Cleaned dataset with fewer columns (all rows):")
print("   - CSV: backend/data/cleaned_fewer_columns.csv")
print("   - JSON: backend/data/cleaned_fewer_columns.json")

print("3. Cleaned dataset with fewer columns (1000 rows):")
print("   - CSV: backend/data/cleaned_1000_entries.csv")
print("   - JSON: backend/data/cleaned_1000_entries.json")
