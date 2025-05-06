import json
import os

def clean_image_urls(input_file, output_file):
    print(f"Reading from: {os.path.abspath(input_file)}")
    # Read the JSON file
    with open(input_file, 'r', encoding='utf-8') as f:
        products = json.load(f)
    
    # Print some sample image URLs before cleaning
    print("\nSample image URLs before cleaning:")
    for i, product in enumerate(products[:3]):
        print(f"Product {i + 1}: {product.get('image', 'No image')}")
    
    # Clean image URLs
    for product in products:
        if 'image' in product:
            # If image is a string, try to parse it as JSON
            if isinstance(product['image'], str):
                try:
                    # Remove any leading/trailing whitespace and quotes
                    cleaned = product['image'].strip().strip('"[]')
                    # Split by comma and take the first URL
                    urls = [url.strip().strip('"') for url in cleaned.split(',')]
                    product['image'] = urls[0] if urls else None
                except:
                    product['image'] = None
            # If image is a list, take the first item
            elif isinstance(product['image'], list) and len(product['image']) > 0:
                product['image'] = product['image'][0].strip().strip('"')
            # If image is empty or invalid, set to None
            else:
                product['image'] = None
    
    # Print some sample image URLs after cleaning
    print("\nSample image URLs after cleaning:")
    for i, product in enumerate(products[:3]):
        print(f"Product {i + 1}: {product.get('image', 'No image')}")
    
    print(f"\nSaving to: {os.path.abspath(output_file)}")
    # Save the cleaned data
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    
    print(f"\nCleaned {len(products)} products")
    print(f"Saved cleaned data to {output_file}")

if __name__ == "__main__":
    # Define input and output file paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_file = os.path.join(script_dir, 'data', 'cleaned_1000_entries.json')
    output_file = os.path.join(script_dir, 'data', 'cleaned_1000_entries_fixed.json')
    
    # Clean the image URLs
    clean_image_urls(input_file, output_file) 