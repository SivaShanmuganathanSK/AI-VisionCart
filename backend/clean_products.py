import pandas as pd

# Step 1: Load the data
df = pd.read_csv('data/flipkart_com-ecommerce_sample.csv')

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

# Step 6: Save the cleaned data
df.to_csv('data/cleaned_product_set.csv', index=False)

print("\n✅ Cleaning Done! Cleaned file saved as 'data/cleaned_product_set.csv'.")
