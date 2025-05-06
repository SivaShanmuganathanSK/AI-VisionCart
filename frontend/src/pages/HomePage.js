import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import h1 from "../images/h1.png";
import h2 from "../images/h2.png";
import h3 from "../images/h3.png";
import h4 from "../images/h4.png";

const heroImages = [h1, h2, h3, h4];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (idx) => setCurrentSlide(idx);

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Stride X</div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/shop" className="nav-link">Shop</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
        <div className="nav-actions">
          <input type="text" placeholder="Search" className="search-bar" />
          <Link to="/login" className="login">LOGIN</Link>
          <span className="cart-icon">🛒</span>
        </div>
      </nav>

      {/* Full-width Hero Banner Carousel */}
      <section className="hero-banner-carousel">
        <img src={heroImages[currentSlide]} alt={`Hero ${currentSlide + 1}`} className="hero-carousel-img-full" />
        <div className="carousel-dots-full">
          {heroImages.map((_, idx) => (
            <span
              key={idx}
              className={`carousel-dot${currentSlide === idx ? " active" : ""}`}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>
        <Link to="/shop" className="shop-now-link">
          <button className="shop-now">SHOP NOW</button>
        </Link>
      </section>

      {/* Responsibility Statement */}
      <section className="responsibility">
        <p>At Stride X , Responsibility Goes beyond Just words.</p>
      </section>

      {/* Shop by Collection */}
      <section className="collections">
        <h3>Shop by collection</h3>
        <div className="collection-list">
          <div className="collection trending">
            <span>TRENDING.</span>
            <Link to="/shop"><button>VIEW PRODUCTS</button></Link>
          </div>
          <div className="collection limited">
            <span>LIMITED STOCK</span>
            <Link to="/shop"><button>VIEW PRODUCTS</button></Link>
          </div>
          <div className="collection men">
            <span>MEN</span>
            <Link to="/shop"><button>VIEW PRODUCTS</button></Link>
          </div>
          <div className="collection women">
            <span>WOMEN.</span>
            <Link to="/shop"><button>VIEW PRODUCTS</button></Link>
          </div>
        </div>
        <Link to="/shop"><button className="view-all">View all products</button></Link>
      </section>

      {/* Ratings */}
      <section className="ratings">
        <div className="rating-info">
          <p>We deliver comfort.<br />Customers deliver stars.</p>
          <div className="rating-stars">
            <div>
              <span className="star">4.5</span>
              <span>FLIPKART</span>
            </div>
            <div>
              <span className="star">4.2</span>
              <span>AMAZON</span>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Categories */}
      <section className="categories">
        <h3>Shop by categories</h3>
        <div className="category-list">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="category trending">
                <span>TRENDING.</span>
                <Link to="/shop"><button>VIEW PRODUCTS</button></Link>
              </div>
              <div className="category limited">
                <span>LIMITED STOCK</span>
                <Link to="/shop"><button>VIEW PRODUCTS</button></Link>
              </div>
              <div className="category men">
                <span>MEN</span>
                <Link to="/shop"><button>VIEW PRODUCTS</button></Link>
              </div>
              <div className="category women">
                <span>WOMEN.</span>
                <Link to="/shop"><button>VIEW PRODUCTS</button></Link>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="reviews">
        <h3>Customer reviews</h3>
        <div className="review-card">
          <img src="https://i.imgur.com/4M34hi2.png" alt="Customer" />
          <blockquote>
            <p>Very very comfortable</p>
            <span>These shoes are simply comfortable, stylish and fit me well. I recommend them to anyone looking for comfort and style in one package.</span>
          </blockquote>
          <Link to="/shop"><button>SHOP THIS</button></Link>
        </div>
      </section>

      {/* Blogs */}
      <section className="blogs">
        <h3>Our blogs</h3>
        <div className="blog-list">
          <div className="blog-card">
            <img src="https://i.imgur.com/8Km9tLL.jpg" alt="Blog 1" />
            <span>OCTOBER 18, 2023</span>
            <p>How hip-hop influenced sneaker culture</p>
            <Link to="/shop"><button>READ MORE</button></Link>
          </div>
          <div className="blog-card">
            <img src="https://i.imgur.com/8Km9tLL.jpg" alt="Blog 2" />
            <span>FEBRUARY 21, 2024</span>
            <p>2024 in footwear: The trends ruling the year</p>
            <Link to="/shop"><button>READ MORE</button></Link>
          </div>
          <div className="blog-card">
            <img src="https://i.imgur.com/8Km9tLL.jpg" alt="Blog 3" />
            <span>AUGUST 24, 2023</span>
            <p>Sneakerhead Chronicles: Unveiling the best releases</p>
            <Link to="/shop"><button>READ MORE</button></Link>
          </div>
          <div className="blog-card">
            <img src="https://i.imgur.com/8Km9tLL.jpg" alt="Blog 4" />
            <span>MARCH 01, 2024</span>
            <p>Fashion that cares, comfort that inspires</p>
            <Link to="/shop"><button>READ MORE</button></Link>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      <section className="similar-products">
        <h3>Similar products</h3>
        <div className="product-list">
          <div className="product-card">
            <img src="https://i.imgur.com/1Q9Z1Zm.png" alt="Adidas Men's wear" />
            <span>Adidas (Men's wear)</span>
            <span>Rs. 999 <s>Rs. 1399</s></span>
            <button>ADD TO CART</button>
          </div>
          <div className="product-card">
            <img src="https://i.imgur.com/1Q9Z1Zm.png" alt="Puma (Men's wear)" />
            <span>Puma (Men's wear)</span>
            <span>Rs. 899 <s>Rs. 1199</s></span>
            <button>ADD TO CART</button>
          </div>
          <div className="product-card">
            <img src="https://i.imgur.com/1Q9Z1Zm.png" alt="Reebok (Men's wear)" />
            <span>Reebok (Men's wear)</span>
            <span>Rs. 799 <s>Rs. 1099</s></span>
            <button>ADD TO CART</button>
          </div>
          <div className="product-card">
            <img src="https://i.imgur.com/1Q9Z1Zm.png" alt="Bata (Men's wear)" />
            <span>Bata (Men's wear)</span>
            <span>Rs. 699 <s>Rs. 999</s></span>
            <button>ADD TO CART</button>
          </div>
        </div>
      </section>

      {/* Personalized Suggestions */}
      <section className="suggestions">
        <h3>Want to see personalised suggestions?</h3>
        <Link to="/login"><button className="sign-in">Sign in</button></Link>
        <div className="new-customer">
          <Link to="/signup">New customer? Start here</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-end">Our page has come to an end, but our relationship with you has not.</div>
        <div className="subscribe">
          <input type="email" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </div>
        <div className="footer-links">
          <div className="help">
            <h4>Need help?</h4>
            <ul>
              <li><Link to="/about">About us</Link></li>
              <li>Order status</li>
              <li>Delivery</li>
              <li>Returns</li>
              <li>Shipping</li>
              <li>Return and replacement policy</li>
            </ul>
          </div>
          <div className="collections">
            <h4>Collections</h4>
            <ul>
              <li><Link to="/shop">Men</Link></li>
              <li><Link to="/shop">Women</Link></li>
              <li><Link to="/shop">Socks</Link></li>
              <li><Link to="/shop">Sneakers</Link></li>
              <li><Link to="/shop">Loafers</Link></li>
              <li><Link to="/shop">Offers</Link></li>
            </ul>
          </div>
          <div className="resources">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/contact">Find a store</Link></li>
              <li><Link to="/signup">Become a member</Link></li>
              <li><Link to="/contact">Send us feedback</Link></li>
            </ul>
          </div>
        </div>
        <div className="social-media">
          <span>Instagram</span>
          <span>Twitter</span>
          <span>Facebook</span>
          <span>YouTube</span>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
