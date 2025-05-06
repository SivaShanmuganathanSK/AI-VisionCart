import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './SingleProduct.css';

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(`http://localhost:8000/api/products/${id}`)
      .then(res => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Product not found');
          }
          throw new Error('Failed to fetch product details');
        }
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleQuantityChange = (value) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="single-product-container">
          <div className="loading-message">Loading product details...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="single-product-container">
          <div className="error-message">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/shop')} className="back-to-shop-btn">
              Back to Shop
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="single-product-container">
          <div className="error-message">
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/shop')} className="back-to-shop-btn">
              Back to Shop
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="single-product-container">
        <div className="product-details">
          <div className="product-images">
            <div className="main-image">
              <img 
                src={product.image || 'https://via.placeholder.com/400x400?text=Product+Image'} 
                alt={product.product_name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x400?text=Product+Image';
                }}
              />
            </div>
          </div>
          
          <div className="product-info">
            <h1 className="product-name">{product.product_name}</h1>
            <div className="product-brand">Brand: {product.brand}</div>
            
            <div className="product-price">
              {product.discounted_price && product.discounted_price !== product.retail_price ? (
                <>
                  <span className="current-price">₹{product.discounted_price}</span>
                  <span className="original-price">₹{product.retail_price}</span>
                  <span className="discount-badge">
                    {Math.round(((product.retail_price - product.discounted_price) / product.retail_price) * 100)}% OFF
                  </span>
                </>
              ) : (
                <span className="current-price">₹{product.retail_price}</span>
              )}
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  min="1"
                />
                <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
              </div>
              
              <button className="add-to-cart-btn">Add to Cart</button>
              <button className="buy-now-btn">Buy Now</button>
            </div>

            <div className="product-meta">
              <div className="delivery-info">
                <h4>Delivery</h4>
                <p>Free delivery by {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              </div>
              
              <div className="return-info">
                <h4>Return Policy</h4>
                <p>7 days return available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct; 