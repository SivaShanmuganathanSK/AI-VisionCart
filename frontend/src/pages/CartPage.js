import React from 'react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './CartPage.css';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  console.log('Cart contents:', cart);

  return (
    <>
      <Navbar />
      <div className="cart-page-container">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <div className="empty-cart">
            Your cart is empty.<br />
            <Link to="/shop">
              <button className="back-to-shop-btn">Back to Shop</button>
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item, idx) => (
                <li key={idx} className="cart-item">
                  <img src={item.product.images?.[0] || item.product.image || 'https://via.placeholder.com/80'} alt={item.product.title || item.product.product_name} />
                  <div className="cart-item-info">
                    <div>{item.product.title || item.product.product_name}</div>
                    <div>Color: <span style={{background:item.color, display:'inline-block', width:16, height:16, borderRadius:'50%', border:'1px solid #ccc'}}></span></div>
                    <div>Size: {item.size}</div>
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div>Price: ₹{item.product.price || item.product.discounted_price || item.product.retail_price}</div>
                    <div>Total: ₹{(item.product.price || item.product.discounted_price || item.product.retail_price) * item.quantity}</div>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id, item.color, item.size)}>Remove</button>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <div className="cart-total">
                Total: ₹{cart.reduce((total, item) => 
                  total + ((item.product.price || item.product.discounted_price || item.product.retail_price) * item.quantity), 0
                )}
              </div>
              <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
              <Link to="/shop">
                <button className="back-to-shop-btn">Continue Shopping</button>
              </Link>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage; 