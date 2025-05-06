import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/HomePage.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Navigate to shop page with search query
    navigate(`/shop?search=${value}`);
  };

  return (
    <nav className="navbar">
      <div className="logo">Stride X</div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/shop" className="nav-link">Shop</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>
      <div className="nav-actions">
        <input 
          type="text" 
          placeholder="Search for products..." 
          className="search-bar"
          value={searchQuery}
          onChange={handleSearch}
        />
        <Link to="/login" className="login">LOGIN</Link>
        <span className="cart-icon">🛒</span>
      </div>
    </nav>
  );
};

export default Navbar; 