const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  uniq_id: {
    type: String,
    required: true,
    unique: true
  },
  product_name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  retail_price: {
    type: Number,
    required: true
  },
  discounted_price: {
    type: Number,
    default: null
  },
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
