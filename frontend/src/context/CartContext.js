import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, color = 'default', size = 'default') => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.id === product.uniq_id && 
        item.color === color && 
        item.size === size
      );
      
      if (existingItem) {
        return prevCart.map(item =>
          (item.id === product.uniq_id && item.color === color && item.size === size)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { 
        id: product.uniq_id,
        product: product,
        quantity: quantity,
        color: color,
        size: size
      }];
    });
  };

  const removeFromCart = (productId, color, size) => {
    setCart(prevCart => prevCart.filter(item => 
      !(item.id === productId && item.color === color && item.size === size)
    ));
  };

  const updateQuantity = (productId, color, size, quantity) => {
    if (quantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        (item.id === productId && item.color === color && item.size === size)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => 
      total + ((item.product.price || item.product.discounted_price || item.product.retail_price) * item.quantity), 
      0
    );
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 