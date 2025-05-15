import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import './SingleProduct.css';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:8000/api/products/${id}`)
      .then(res => {
        if (!res.ok) {
          if (res.status === 404) throw new Error('Product not found');
          throw new Error('Failed to fetch product details');
        }
        return res.json();
      })
      .then(data => {
        let images = [];
        if (data.image) {
          try {
            images = JSON.parse(data.image);
          } catch (e) {
            images = data.image.split(',').map(img => img.trim().replace(/^"|"$/g, ''));
          }
        }
        setProduct({ ...data, images: images.length > 0 ? images : ["https://via.placeholder.com/400x400?text=No+Image"] });
        setLoading(false);
        
        // Fetch recommendations after getting product details
        if (data.product_name) {
          setLoadingRecommendations(true);
          console.log('Fetching recommendations for:', data.product_name);
          fetch(`http://localhost:8000/api/recommend?product_name=${encodeURIComponent(data.product_name)}`)
            .then(res => {
              console.log('Recommendation API response status:', res.status);
              return res.json();
            })
            .then(recData => {
              console.log('Recommendation data:', recData);
              setRecommendations(recData.recommendations);
              setLoadingRecommendations(false);
            })
            .catch(err => {
              console.error('Error fetching recommendations:', err);
              setLoadingRecommendations(false);
            });
        }
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

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
            <Link to="/shop"><button className="back-to-shop-btn">Back to Shop</button></Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return null;
  }

  const price = product.discounted_price && product.discounted_price !== 0 ? product.discounted_price : product.retail_price;
  const oldPrice = product.retail_price && product.discounted_price && product.discounted_price !== product.retail_price ? product.retail_price : null;
  const rating = product.rating && product.rating !== 'No rating available' ? product.rating : (product.overall_rating && product.overall_rating !== 'No rating available' ? product.overall_rating : null);
  const tags = product.tags ? product.tags.split(',').map(t => t.trim()) : [];

  return (
    <>
      <Navbar />
      <div className="single-product-container">
        <div className="product-main-section">
          <div className="product-gallery">
            <div className="gallery-thumbnails">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.product_name} - view ${idx + 1}`}
                  className={selectedImage === idx ? 'active' : ''}
                  onClick={() => setSelectedImage(idx)}
                />
              ))}
            </div>
            <div className="gallery-main">
              <img 
                src={product.images[selectedImage]} 
                alt={product.product_name}
              />
            </div>
          </div>
          <div className="product-info">
            <h2>{product.product_name}</h2>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">
              <span style={{ color: '#c97c2b', fontWeight: 700, fontSize: '1.5rem' }}>
                ₹{price}
              </span>
              {oldPrice && <span style={{ textDecoration: 'line-through', color: '#888', marginLeft: 8 }}>₹{oldPrice}</span>}
            </div>
            {rating && <div className="product-rating"><span>{rating} ★</span></div>}
            <p className="product-desc">{product.description}</p>
            {tags.length > 0 && <div className="product-tags">{tags.map((tag, i) => <span key={i} style={{ background: '#f3e9d2', color: '#c97c2b', borderRadius: 6, padding: '2px 10px', marginRight: 6, fontSize: 12 }}>{tag}</span>)}</div>}
            <div className="product-actions" style={{ marginTop: 24 }}>
              <button 
                className="add-to-cart" 
                onClick={() => addToCart(product, 1)}
                style={{
                  backgroundColor: '#c97c2b',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                Add to Cart
              </button>
              <Link to="/shop"><button className="back-to-shop-btn">Back to Shop</button></Link>
            </div>
          </div>
        </div>
        {product.description && (
          <div className="product-description" style={{ marginTop: 32 }}>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        )}

        {/* Recommended Products Section */}
        <div className="recommended-products" style={{ marginTop: 48 }}>
          <h3 style={{ fontSize: '1.5rem', color: '#2d3a22', marginBottom: 24 }}>Recommended for You</h3>
          {loadingRecommendations ? (
            <div className="loading-message">Loading recommendations...</div>
          ) : recommendations.length > 0 ? (
            <div className="recommended-grid">
              {recommendations.map((recProduct, index) => {
                let images = [];
                if (recProduct.image) {
                  try {
                    images = JSON.parse(recProduct.image);
                  } catch (e) {
                    images = recProduct.image.split(',').map(img => img.trim().replace(/^"|"$/g, ''));
                  }
                }
                const imageUrl = images.length > 0 ? images[0] : "https://via.placeholder.com/200x200?text=No+Image";
                
                return (
                  <div key={recProduct.uniq_id} className="recommended-product-card">
                    <Link to={`/product/${recProduct.uniq_id}`}>
                      <img 
                        src={imageUrl}
                        alt={recProduct.product_name}
                        className="recommended-product-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/200x200?text=No+Image";
                        }}
                      />
                      <div className="recommended-product-info">
                        <h4>{recProduct.product_name}</h4>
                        <p className="recommended-product-price">
                          ₹{recProduct.discounted_price || recProduct.retail_price}
                          {recProduct.discounted_price && recProduct.retail_price > recProduct.discounted_price && (
                            <span style={{ textDecoration: 'line-through', color: '#888', marginLeft: 8, fontSize: '0.9rem' }}>
                              ₹{recProduct.retail_price}
                            </span>
                          )}
                        </p>
                      </div>
                    </Link>
                    <button 
                      className="recommended-add-btn"
                      onClick={() => addToCart(recProduct, 1)}
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-recommendations">No recommendations available</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage; 