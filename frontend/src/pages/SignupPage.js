// src/pages/SignupPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignupPage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <>
      <Navbar />
      <div className="signup-page-centered">
        <div className="signup-form-section">
          <h2 className="signup-title">Create your account</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="signup-input"
              required
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-input"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="signup-input"
              required
            />
            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
          <div className="signup-links">
            <Link to="/login" className="login-link">Already have an account? Login</Link>
            <span> | </span>
            <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignupPage;
