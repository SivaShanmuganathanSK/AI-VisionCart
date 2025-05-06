import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ShopPage.css';

const PRODUCTS_PER_PAGE = 30;

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [selectedFilters, setSelectedFilters] = useState({
    brand: '',
    priceRange: '',
    discount: '',
    category: ''
  });
  const [sortOption, setSortOption] = useState('');

  // Add fallback image
  const fallbackImage = 'https://via.placeholder.com/200x200?text=Product+Image';

  // Add image error handler
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = fallbackImage;
  };

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8000/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        const cleanedData = data.map(product => ({
          ...product,
          image: product.image 
            ? product.image.replace(/[\[\]"]/g, '').split(',')[0].trim()
            : null
        }));
        setProducts(cleanedData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter products based on all criteria
  const filteredProducts = products.filter(p => {
    if (!p) return false;
    
    // Search query filter
    const matchesSearch = !searchQuery || (
      (p.product_name && p.product_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Brand filter
    const matchesBrand = !selectedFilters.brand || p.brand === selectedFilters.brand;

    // Price range filter
    const price = p.discounted_price || p.retail_price;
    let matchesPrice = true;
    if (selectedFilters.priceRange) {
      const [min, max] = selectedFilters.priceRange.split('-').map(Number);
      matchesPrice = price >= min && (!max || price <= max);
    }

    // Discount filter
    let matchesDiscount = true;
    if (selectedFilters.discount) {
      const discountPercent = ((p.retail_price - p.discounted_price) / p.retail_price) * 100;
      matchesDiscount = discountPercent >= Number(selectedFilters.discount);
    }

    // Category filter
    const matchesCategory = !selectedFilters.category || (
      p.product_category_tree && 
      JSON.parse(p.product_category_tree)[0].split(' >> ')[0] === selectedFilters.category
    );

    return matchesSearch && matchesBrand && matchesPrice && matchesDiscount && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.discounted_price || a.retail_price;
    const priceB = b.discounted_price || b.retail_price;

    switch (sortOption) {
      case 'price-low-high':
        return priceA - priceB;
      case 'price-high-low':
        return priceB - priceA;
      case 'discount':
        const discountA = ((a.retail_price - a.discounted_price) / a.retail_price) * 100;
        const discountB = ((b.retail_price - b.discounted_price) / b.retail_price) * 100;
        return discountB - discountA;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const startIdx = (page - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const productsToShow = sortedProducts.slice(startIdx, endIdx);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }));
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSortOption(prev => prev === value ? '' : value);
    setPage(1);
  };

  // Get unique brands and categories from products
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
  const categories = [...new Set(products.map(p => {
    if (p.product_category_tree) {
      try {
        const categoryTree = JSON.parse(p.product_category_tree);
        return categoryTree[0].split(' >> ')[0];
      } catch (e) {
        return null;
      }
    }
    return null;
  }).filter(Boolean))];

  // Price ranges for filter
  const priceRanges = [
    { label: 'Under ₹500', value: '0-500' },
    { label: '₹500 - ₹1000', value: '500-1000' },
    { label: '₹1000 - ₹2000', value: '1000-2000' },
    { label: 'Above ₹2000', value: '2000-' }
  ];

  // Discount ranges for filter
  const discountRanges = [
    { label: '10% and above', value: '10' },
    { label: '20% and above', value: '20' },
    { label: '30% and above', value: '30' },
    { label: '50% and above', value: '50' }
  ];

  return (
    <>
      <Navbar />
      <div className="shop-page-centered shop-page-flex">
        {/* Sidebar Filters */}
        <aside className="shop-sidebar">
          <div className="shop-sidebar-title">SORT & FILTERS</div>
          
          {/* Sort Options */}
          <div className="shop-filter-group">
            <div className="shop-filter-label">Sort By</div>
            <div className="shop-filter-options">
              <label>
                <input
                  type="checkbox"
                  name="sort"
                  checked={sortOption === 'price-low-high'}
                  onChange={() => handleSortChange('price-low-high')}
                />
                Price: Low to High
              </label>
              <label>
                <input
                  type="checkbox"
                  name="sort"
                  checked={sortOption === 'price-high-low'}
                  onChange={() => handleSortChange('price-high-low')}
                />
                Price: High to Low
              </label>
              <label>
                <input
                  type="checkbox"
                  name="sort"
                  checked={sortOption === 'discount'}
                  onChange={() => handleSortChange('discount')}
                />
                Discount
              </label>
            </div>
          </div>

          {/* Price Filter */}
          <div className="shop-filter-group">
            <div className="shop-filter-label">Price Range</div>
            <div className="shop-filter-options">
              {priceRanges.map(range => (
                <label key={range.value}>
                  <input
                    type="checkbox"
                    name="price"
                    checked={selectedFilters.priceRange === range.value}
                    onChange={() => handleFilterChange('priceRange', range.value)}
                  />
                  {range.label}
                </label>
              ))}
            </div>
          </div>

          {/* Discount Filter */}
          <div className="shop-filter-group">
            <div className="shop-filter-label">Discount</div>
            <div className="shop-filter-options">
              {discountRanges.map(range => (
                <label key={range.value}>
                  <input
                    type="checkbox"
                    name="discount"
                    checked={selectedFilters.discount === range.value}
                    onChange={() => handleFilterChange('discount', range.value)}
                  />
                  {range.label}
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="shop-filter-group">
            <div className="shop-filter-label">Brands</div>
            <div className="shop-filter-options">
              {brands.slice(0, 10).map(brand => (
                <label key={brand}>
                  <input
                    type="checkbox"
                    name="brand"
                    checked={selectedFilters.brand === brand}
                    onChange={() => handleFilterChange('brand', brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="shop-filter-group">
            <div className="shop-filter-label">Categories</div>
            <div className="shop-filter-options">
              {categories.slice(0, 10).map(category => (
                <label key={category}>
                  <input
                    type="checkbox"
                    name="category"
                    checked={selectedFilters.category === category}
                    onChange={() => handleFilterChange('category', category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters Button */}
          <button
            className="shop-clear-filters"
            onClick={() => {
              setSelectedFilters({
                brand: '',
                priceRange: '',
                discount: '',
                category: ''
              });
              setSortOption('');
              setPage(1);
            }}
          >
            Clear All Filters
          </button>
        </aside>

        {/* Main Content */}
        <div className="shop-main-content">
          <h2 className="shop-title">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Shop All Products'}
          </h2>
          {loading ? (
            <div style={{ textAlign: 'center', margin: '40px 0' }}>Loading products...</div>
          ) : error ? (
            <div style={{ color: 'red', textAlign: 'center', margin: '40px 0' }}>{error}</div>
          ) : sortedProducts.length === 0 ? (
            <div style={{ textAlign: 'center', margin: '40px 0' }}>
              No products found {searchQuery ? `matching "${searchQuery}"` : 'with selected filters'}
            </div>
          ) : (
            <>
              <div className="shop-products-grid">
                {productsToShow.map(product => (
                  <div className="shop-product-card" key={product.uniq_id}>
                    <Link to={`/product/${product.uniq_id}`} className="product-link">
                      <img 
                        src={product.image || fallbackImage}
                        alt={product.product_name}
                        className="shop-product-img"
                        onError={handleImageError}
                        loading="lazy"
                      />
                      <div className="shop-product-info">
                        <div className="shop-product-name">{product.product_name}</div>
                        <div className="shop-product-price">
                          {product.discounted_price && product.discounted_price !== 0 ? (
                            <>
                              <span>₹{product.discounted_price}</span>
                              {product.retail_price && product.retail_price !== product.discounted_price && (
                                <span>₹{product.retail_price}</span>
                              )}
                            </>
                          ) : (
                            <span>₹{product.retail_price}</span>
                          )}
                        </div>
                        <div className="shop-product-brand">{product.brand}</div>
                      </div>
                    </Link>
                    <button className="shop-add-btn">Add to Cart</button>
                  </div>
                ))}
              </div>
              {/* Pagination */}
              <div className="shop-pagination">
                <button
                  className="shop-page-btn"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Prev
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`shop-page-btn${page === i + 1 ? ' active' : ''}`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                {totalPages > 5 && <span className="shop-page-ellipsis">...</span>}
                <button
                  className="shop-page-btn"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopPage; 