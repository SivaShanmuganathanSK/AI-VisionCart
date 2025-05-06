import React from "react";
import "../pages/HomePage.css";

const Footer = () => (
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
          <li>Order status</li>
          <li>Delivery</li>
          <li>Returns</li>
          <li>Shipping</li>
          <li>Return and replacement policy</li>
          <li>About us</li>
        </ul>
      </div>
      <div className="collections">
        <h4>Collections</h4>
        <ul>
          <li>Men</li>
          <li>Women</li>
          <li>Socks</li>
          <li>Sneakers</li>
          <li>Loafers</li>
          <li>Offers</li>
        </ul>
      </div>
      <div className="resources">
        <h4>Resources</h4>
        <ul>
          <li>Find a store</li>
          <li>Become a member</li>
          <li>Send us feedback</li>
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
);

export default Footer; 