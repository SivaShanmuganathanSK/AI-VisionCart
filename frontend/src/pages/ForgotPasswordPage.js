import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPasswordPage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
  };

  return (
    <>
      <Navbar />
      <div className="forgot-page-centered">
        <div className="forgot-form-section">
          <h2 className="forgot-title">Forgot your password?</h2>
          <p className="forgot-desc">Enter your email address and we'll send you a link to reset your password.</p>
          <form className="forgot-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="forgot-input"
              required
            />
            <button type="submit" className="forgot-btn">Send Reset Link</button>
          </form>
          <div className="forgot-links">
            <Link to="/login" className="login-link">Back to Login</Link>
            <span> | </span>
            <Link to="/signup" className="signup-link">Create an account</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPasswordPage; 