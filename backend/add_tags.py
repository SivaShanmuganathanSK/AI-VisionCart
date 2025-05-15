import pandas as pd
import random

def assign_tags(product_name):
    # Convert to lowercase for easier matching
    name = product_name.lower()
    
    # Initialize tags list
    tags = []
    
    # First determine gender
    if 'men' in name or 'male' in name or 'boy' in name:
        tags.append('men')
    elif 'women' in name or 'female' in name or 'girl' in name or 'ladies' in name:
        tags.append('women')
    else:
        # If gender is not clear, randomly assign one
        tags.append(random.choice(['men', 'women']))
    
    # Then determine if it's trending or limited stock
    if 'limited' in name or 'exclusive' in name or 'special' in name:
        tags.append('limited stock')
    elif 'trending' in name or 'popular' in name or 'new' in name or 'latest' in name:
        tags.append('trending')
    else:
        # If status is not clear, randomly assign one
        tags.append(random.choice(['trending', 'limited stock']))
    
    return ','.join(tags)

def main():
    # Read the CSV file
    df = pd.read_csv('data/cleaned_1000_entries.csv')
    
    # Add tags column
    df['tags'] = df['product_name'].apply(assign_tags)
    
    # Save the updated CSV
    df.to_csv('data/cleaned_1000_entries_with_tags.csv', index=False)
    
    # Print some statistics
    print("\nTag distribution:")
    print(df['tags'].value_counts())
    
    # Print some examples
    print("\nExample products with their tags:")
    for _, row in df.sample(5).iterrows():
        print(f"Product: {row['product_name']}")
        print(f"Tags: {row['tags']}\n")

if __name__ == "__main__":
    main() 