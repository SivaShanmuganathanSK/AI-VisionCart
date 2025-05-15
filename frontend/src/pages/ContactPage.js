import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h2 className="contact-title">Get In Touch With Us</h2>
        <p className="contact-desc">For More Information About Our Product & Services, Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
        <div className="contact-main">
          <div className="contact-info">
            <div className="contact-info-block">
              <span className="contact-icon">📍</span>
              <div>
                <div className="contact-info-title">Address</div>
                <div>91/30, east govindapuram, Dindigul</div>
              </div>
            </div>
            <div className="contact-info-block">
              <span className="contact-icon">📞</span>
              <div>
                <div className="contact-info-title">Phone</div>
                <div>Mobile: (+91) 8807803579</div>
                <div>Hotline: (+91) 8807803579</div>
              </div>
            </div>
            <div className="contact-info-block">
              <span className="contact-icon">⏰</span>
              <div>
                <div className="contact-info-title">Working Time</div>
                <div>Monday–Friday: 9:00 – 22:00</div>
                <div>Saturday–Sunday: 9:00 – 21:00</div>
              </div>
            </div>
          </div>
          <form className="contact-form">
            <label>
              Your name
              <input type="text" placeholder="Name" required />
            </label>
            <label>
              Email address
              <input type="email" placeholder="Abc@gmail.com" required />
            </label>
            <label>
              Subject
              <input type="text" placeholder="This is an optional" />
            </label>
            <label>
              Message
              <textarea placeholder="Hi I'd like to ask about" rows={4} />
            </label>
            <button type="submit" className="contact-submit">Submit</button>
          </form>
        </div>
        
      </div>
      
    </>
  );
};

export default ContactPage; 