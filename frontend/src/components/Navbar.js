import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../pages/HomePage.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Navigate to shop page with search query
    navigate(`/shop?search=${value}`);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const isActive = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <nav className="navbar">
      <div className="logo">Vision Cart</div>
      <div className="nav-links">
        <Link to="/" className={isActive("/")}>Home</Link>
        <Link to="/about" className={isActive("/about")}>About</Link>
        <Link to="/shop" className={isActive("/shop")}>Shop</Link>
        <Link to="/contact" className={isActive("/contact")}>Contact</Link>
        <Link to="/blog" className={isActive("/blog")}>Blog</Link>
        <Link to="/odop" className={isActive("/odop")}>ODOP</Link>
      </div>
      <div className="nav-actions">
        <input 
          type="text" 
          placeholder="Search for products..." 
          className="search-bar"
          value={searchQuery}
          onChange={handleSearch}
        />
        <Link to="/login" className="login">
          <span className="login-icon">👤</span>
          LOGIN
        </Link>
        <Link to="/cart" className="cart-icon">
          🛒
          {cartItemCount > 0 && (
            <span className="cart-count">{cartItemCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 