import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import './ShopPage.css';

const PRODUCTS_PER_PAGE = 30;

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { addToCart } = useCart();
  const [selectedFilters, setSelectedFilters] = useState({
    gender: '',
    status: '',
    brand: '',
    priceRange: '',
    discount: ''
  });
  const [sortOption, setSortOption] = useState('');
  const [clickTimers, setClickTimers] = useState({});

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
        // Only keep products with uniq_id
        const cleanedData = data
          .filter(product => product.uniq_id)
          .map(product => {
            const parsed = {
              ...product,
              image: product.image 
                ? product.image.replace(/[[\]"]/g, '').split(',')[0].trim()
                : null,
              gender: product.tags?.split(',')[0]?.trim() || '',
              status: product.tags?.split(',')[1]?.trim() || ''
            };
            return parsed;
          });
        setProducts(cleanedData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter products based on all criteria
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery
      ? product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesGender = selectedFilters.gender
      ? product.gender?.toLowerCase() === selectedFilters.gender.toLowerCase()
      : true;

    const matchesStatus = selectedFilters.status
      ? product.status?.toLowerCase() === selectedFilters.status.toLowerCase()
      : true;

    // Debug logs for filtering
    if (selectedFilters.gender || selectedFilters.status) {
      console.log('Filtering product:', {
        productName: product.product_name,
        tags: product.tags,
        parsedGender: product.gender,
        parsedStatus: product.status,
        selectedGender: selectedFilters.gender,
        selectedStatus: selectedFilters.status,
        matchesGender,
        matchesStatus
      });
    }

    const matchesBrand = selectedFilters.brand
      ? product.brand === selectedFilters.brand
      : true;

    const matchesPrice = selectedFilters.priceRange
      ? {
          '0-500': p => p.retail_price <= 500,
          '500-1000': p => p.retail_price > 500 && p.retail_price <= 1000,
          '1000-2000': p => p.retail_price > 1000 && p.retail_price <= 2000,
          '2000-': p => p.retail_price > 2000
        }[selectedFilters.priceRange](product)
      : true;

    const matchesDiscount = selectedFilters.discount
      ? {
          '10': p => ((p.retail_price - p.discounted_price) / p.retail_price) * 100 >= 10,
          '20': p => ((p.retail_price - p.discounted_price) / p.retail_price) * 100 >= 20,
          '30': p => ((p.retail_price - p.discounted_price) / p.retail_price) * 100 >= 30,
          '50': p => ((p.retail_price - p.discounted_price) / p.retail_price) * 100 >= 50
        }[selectedFilters.discount](product)
      : true;

    return matchesSearch && matchesGender && matchesStatus && matchesBrand && matchesPrice && matchesDiscount;
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
    const now = Date.now();
    const lastClick = clickTimers[`${filterType}-${value}`] || 0;
    const isDoubleClick = now - lastClick < 300; // 300ms threshold for double click

    if (isDoubleClick) {
      // Double click - remove filter
      setSelectedFilters(prev => ({
        ...prev,
        [filterType]: ''
      }));
      setClickTimers(prev => ({
        ...prev,
        [`${filterType}-${value}`]: 0
      }));
    } else {
      // Single click - toggle filter
      setSelectedFilters(prev => ({
        ...prev,
        [filterType]: prev[filterType] === value ? '' : value
      }));
      setClickTimers(prev => ({
        ...prev,
        [`${filterType}-${value}`]: now
      }));
    }
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
          
          {/* Gender Filter */}
          <div className="shop-filter-group">
            <div className="shop-filter-label">Gender</div>
            <div className="shop-filter-options">
              <label>
                <input
                  type="checkbox"
                  name="gender"
                  checked={selectedFilters.gender === 'men'}
                  onChange={() => handleFilterChange('gender', 'men')}
                />
                Men
              </label>
              <label>
                <input
                  type="checkbox"
                  name="gender"
                  checked={selectedFilters.gender === 'women'}
                  onChange={() => handleFilterChange('gender', 'women')}
                />
                Women
              </label>
            </div>
          </div>

          {/* Status Filter */}
          <div className="shop-filter-group">
            <div className="shop-filter-label">Status</div>
            <div className="shop-filter-options">
              <label>
                <input
                  type="checkbox"
                  name="status"
                  checked={selectedFilters.status === 'trending'}
                  onChange={() => handleFilterChange('status', 'trending')}
                />
                Trending
              </label>
              <label>
                <input
                  type="checkbox"
                  name="status"
                  checked={selectedFilters.status === 'limited stock'}
                  onChange={() => handleFilterChange('status', 'limited stock')}
                />
                Limited Stock
              </label>
            </div>
          </div>

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

          {/* Clear Filters Button */}
          <button
            className="shop-clear-filters"
            onClick={() => {
              setSelectedFilters({
                gender: '',
                status: '',
                brand: '',
                priceRange: '',
                discount: ''
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
            {selectedFilters.gender && selectedFilters.status
              ? `${selectedFilters.gender.charAt(0).toUpperCase() + selectedFilters.gender.slice(1)}'s ${selectedFilters.status.charAt(0).toUpperCase() + selectedFilters.status.slice(1)} Products`
              : selectedFilters.gender
                ? `${selectedFilters.gender.charAt(0).toUpperCase() + selectedFilters.gender.slice(1)}'s Products`
                : selectedFilters.status
                  ? `${selectedFilters.status.charAt(0).toUpperCase() + selectedFilters.status.slice(1)} Products`
                  : searchQuery 
                    ? `Search Results for "${searchQuery}"` 
                    : 'Shop All Products'}
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
                    <button 
                      className="shop-add-btn" 
                      onClick={() => addToCart(product, 1)}
                    >
                      Add to Cart
                    </button>
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
                {(() => {
                  const pages = [];
                  if (totalPages <= 6) {
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(
                        <button
                          key={i}
                          className={`shop-page-btn${page === i ? ' active' : ''}`}
                          onClick={() => setPage(i)}
                        >
                          {i}
                        </button>
                      );
                    }
                  } else {
                    // Always show first 2
                    for (let i = 1; i <= 2; i++) {
                      pages.push(
                        <button
                          key={i}
                          className={`shop-page-btn${page === i ? ' active' : ''}`}
                          onClick={() => setPage(i)}
                        >
                          {i}
                        </button>
                      );
                    }
                    // Dots after first 2
                    if (page > 4) {
                      pages.push(<span key="start-ellipsis" className="shop-page-ellipsis">...</span>);
                    }
                    // Current page (if not in first 2 or last 2)
                    if (page > 2 && page < totalPages - 1) {
                      pages.push(
                        <button
                          key={page}
                          className={`shop-page-btn active`}
                          onClick={() => setPage(page)}
                        >
                          {page}
                        </button>
                      );
                    }
                    // Dots before last 2
                    if (page < totalPages - 3) {
                      pages.push(<span key="end-ellipsis" className="shop-page-ellipsis">...</span>);
                    }
                    // Always show last 2
                    for (let i = totalPages - 1; i <= totalPages; i++) {
                      if (i > 2) {
                        pages.push(
                          <button
                            key={i}
                            className={`shop-page-btn${page === i ? ' active' : ''}`}
                            onClick={() => setPage(i)}
                          >
                            {i}
                          </button>
                        );
                      }
                    }
                  }
                  return pages;
                })()}
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
      
    </>
  );
};

export default ShopPage; 