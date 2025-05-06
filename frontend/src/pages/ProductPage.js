// src/pages/ProductPage.js
import React from 'react';
import { useParams } from 'react-router-dom';  // To access dynamic route params (e.g., productId)

const ProductPage = () => {
  const { productId } = useParams();  // Get the product ID from the URL
  return (
    <div>
      <h1>Product Page</h1>
      <p>Details about product {productId} will be displayed here.</p>
    </div>
  );
};

export default ProductPage;
