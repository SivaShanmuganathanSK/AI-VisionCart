import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <h2 className="about-title">About Us</h2>
        <p className="about-desc">Vision Cart is your trusted destination for quality products and the latest trends. We are a passionate team dedicated to bringing you a wide variety of items, from everyday essentials to unique finds, all in one convenient place.</p>
        <section className="about-section">
          <h3>Our Story</h3>
          <p>Founded in Dindigul, Vision Cart began as a small local shop and has grown into a leading e-commerce platform serving thousands of customers across India. Our journey is driven by a commitment to quality, innovation, and putting our customers first. Every product we offer is carefully selected to ensure it meets our high standards for value, reliability, and satisfaction.</p>
        </section>
        <section className="about-section">
          <h3>Our Mission</h3>
          <p>Our mission is to empower people to shop with confidence and convenience, enjoying a seamless experience and a diverse selection of products. We strive to deliver exceptional service, curated collections, and a user-friendly shopping experience both online and offline.</p>
        </section>
        <section className="about-section">
          <h3>Our Values</h3>
          <ul className="about-values">
            <li>Customer First: We listen, we care, and we deliver.</li>
            <li>Quality: Only the best products make it to our shelves.</li>
            <li>Innovation: We embrace new trends and technologies.</li>
            <li>Integrity: Honesty and transparency guide everything we do.</li>
            <li>Community: We support and give back to our local community.</li>
          </ul>
        </section>
        <section className="about-section">
          <h3>Meet Our Team</h3>
          <div className="about-team">
            <div className="team-member">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Founder" />
              <div className="team-name">Arun Kumar</div>
              <div className="team-role">Founder & CEO</div>
            </div>
            <div className="team-member">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Head of Design" />
              <div className="team-name">Priya Sharma</div>
              <div className="team-role">Head of Design</div>
            </div>
            <div className="team-member">
              <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Operations Manager" />
              <div className="team-name">Rahul Singh</div>
              <div className="team-role">Operations Manager</div>
            </div>
            <div className="team-member">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Customer Support" />
              <div className="team-name">Sneha Patel</div>
              <div className="team-role">Customer Support Lead</div>
            </div>
          </div>
        </section>
      </div>
      
    </>
  );
};

export default AboutPage; 