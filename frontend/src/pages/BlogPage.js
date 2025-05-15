import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './BlogPage.css';

const BlogPage = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogs = [
    {
      id: 1,
      title: 'Top 10 Must-Have Gadgets for 2023',
      date: 'Posted on: January 15, 2023',
      content: 'Discover the latest gadgets that are making waves in 2023. From smart home devices to cutting-edge tech, find out what you need to stay ahead of the curve. This year, we have seen an incredible surge in innovation, with products that enhance productivity, entertainment, and everyday convenience. Whether you are a tech enthusiast or just looking to upgrade your home, these gadgets are sure to impress. Here are some of the top gadgets you should consider: Smart speakers that integrate with your home automation systems, wearable fitness trackers that monitor your health in real-time, and portable chargers that keep your devices powered on the go. Stay tuned for more updates on the latest tech trends!'
    },
    {
      id: 2,
      title: 'How to Choose the Perfect Gift for Any Occasion',
      date: 'Posted on: February 20, 2023',
      content: 'Struggling to find the perfect gift? Our guide offers tips and tricks to help you select thoughtful and unique gifts for birthdays, holidays, and special events. Consider the recipients interests, hobbies, and preferences to make your gift truly meaningful. With a little creativity and planning, you can find the ideal present that will bring joy and appreciation.'
    },
    {
      id: 3,
      title: 'Eco-Friendly Shopping: Sustainable Choices for a Better Planet',
      date: 'Posted on: March 10, 2023',
      content: 'Learn how to make eco-friendly shopping choices that benefit both you and the environment. Discover sustainable products and practices that can make a difference. By opting for items with minimal packaging, supporting brands that prioritize sustainability, and reducing waste, you can contribute to a healthier planet while enjoying quality products.'
    },
    {
      id: 4,
      title: 'Maximizing Your Online Shopping Experience',
      date: 'Posted on: April 5, 2023',
      content: 'Get the most out of your online shopping with our expert tips. From finding the best deals to ensuring secure transactions, we have got you covered. Explore various online platforms, read reviews, and compare prices to make informed decisions. With these strategies, you can enjoy a seamless and rewarding shopping experience.'
    }
  ];

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
  };

  return (
    <>
      <Navbar />
      <div className="blog-container">
        <h2 className="blog-title">Our Blog</h2>
        {selectedBlog ? (
          <div className="single-blog">
            <h3>{selectedBlog.title}</h3>
            <p className="blog-date">{selectedBlog.date}</p>
            <p className="blog-content">{selectedBlog.content}</p>
            <button onClick={() => setSelectedBlog(null)}>Back to Blogs</button>
          </div>
        ) : (
          <div className="blog-posts">
            {blogs.map(blog => (
              <div key={blog.id} className="blog-post">
                <h3>{blog.title}</h3>
                <p className="blog-date">{blog.date}</p>
                <p className="blog-content">{blog.content}</p>
                <button className="read-more" onClick={() => handleReadMore(blog)}>Read More</button>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </>
  );
};

export default BlogPage; 