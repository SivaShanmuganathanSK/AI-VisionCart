// src/pages/LoginPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login here (API request to backend)
  };

  return (
    <>
      <Navbar />
      <div className="login-page-centered">
        <div className="login-form-section">
          <h2 className="login-title">Sign in to your account</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
            <button type="submit" className="login-btn">Sign In</button>
          </form>
          <div className="login-links">
            <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
            <span> | </span>
            <Link to="/signup" className="signup-link">Create an account</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
