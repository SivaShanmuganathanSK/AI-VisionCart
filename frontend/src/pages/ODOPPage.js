import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ODOPPage.css';
import { imageUrls } from '../assets/images/imageUrls';

const districts = [
  {
    id: 1,
    name: 'Kanchipuram',
    description: 'Famous for Kanchipuram Silk Sarees, known as the "Silk City"',
    products: [
      {
        id: 1,
        name: 'Kanchipuram Silk Saree',
        description: 'Traditional handloom silk sarees with pure gold and silver zari work',
        price: 25000,
        category: 'Textiles'
      },
      {
        id: 2,
        name: 'Temple Jewelry',
        description: 'Traditional temple jewelry with intricate designs',
        price: 15000,
        category: 'Jewelry'
      },
      {
        id: 3,
        name: 'Brass Lamps',
        description: 'Handcrafted brass lamps with traditional motifs',
        price: 2000,
        category: 'Handicrafts'
      },
      {
        id: 4,
        name: 'Wooden Carvings',
        description: 'Intricate wooden carvings of deities and temple architecture',
        price: 5000,
        category: 'Handicrafts'
      },
      {
        id: 5,
        name: 'Traditional Paintings',
        description: 'Hand-painted traditional art on canvas',
        price: 3000,
        category: 'Art'
      },
      {
        id: 6,
        name: 'Stone Sculptures',
        description: 'Hand-carved stone sculptures of deities',
        price: 8000,
        category: 'Art'
      },
      {
        id: 7,
        name: 'Bronze Statues',
        description: 'Traditional bronze statues with fine detailing',
        price: 12000,
        category: 'Art'
      },
      {
        id: 8,
        name: 'Cotton Handloom',
        description: 'Pure cotton handloom fabrics with traditional designs',
        price: 1500,
        category: 'Textiles'
      },
      {
        id: 9,
        name: 'Silver Filigree',
        description: 'Delicate silver filigree work jewelry',
        price: 6000,
        category: 'Jewelry'
      },
      {
        id: 10,
        name: 'Brass Utensils',
        description: 'Traditional brass utensils with engravings',
        price: 2500,
        category: 'Handicrafts'
      },
      {
        id: 11,
        name: 'Temple Bells',
        description: 'Handcrafted temple bells with traditional designs',
        price: 1800,
        category: 'Handicrafts'
      },
      {
        id: 12,
        name: 'Wooden Toys',
        description: 'Traditional wooden toys and dolls',
        price: 800,
        category: 'Handicrafts'
      },
      {
        id: 13,
        name: 'Brass Idols',
        description: 'Handcrafted brass idols of deities',
        price: 3500,
        category: 'Handicrafts'
      },
      {
        id: 14,
        name: 'Traditional Masks',
        description: 'Hand-painted traditional dance masks',
        price: 1200,
        category: 'Art'
      },
      {
        id: 15,
        name: 'Stone Jewelry',
        description: 'Handcrafted stone jewelry with traditional designs',
        price: 2800,
        category: 'Jewelry'
      },
      {
        id: 16,
        name: 'Brass Wall Hangings',
        description: 'Traditional brass wall hangings with temple motifs',
        price: 2200,
        category: 'Handicrafts'
      },
      {
        id: 17,
        name: 'Wooden Furniture',
        description: 'Handcrafted wooden furniture with traditional carvings',
        price: 15000,
        category: 'Furniture'
      },
      {
        id: 18,
        name: 'Silver Utensils',
        description: 'Traditional silver utensils with engravings',
        price: 8000,
        category: 'Handicrafts'
      },
      {
        id: 19,
        name: 'Brass Musical Instruments',
        description: 'Traditional brass musical instruments',
        price: 4500,
        category: 'Musical'
      },
      {
        id: 20,
        name: 'Traditional Pottery',
        description: 'Handcrafted traditional pottery items',
        price: 1500,
        category: 'Handicrafts'
      }
    ]
  },
  {
    id: 2,
    name: 'Madurai',
    description: 'Known for Madurai Sungudi Sarees and traditional tie and dye technique',
    products: [
      {
        id: 1,
        name: 'Madurai Sungudi Saree',
        description: 'Traditional tie and dye sarees with unique dot patterns',
        price: 15000,
        category: 'Textiles'
      },
      {
        id: 2,
        name: 'Jasmine Flowers',
        description: 'Fresh and fragrant jasmine garlands',
        price: 200,
        category: 'Floral'
      },
      {
        id: 3,
        name: 'Temple Jewelry',
        description: 'Traditional temple jewelry with intricate designs',
        price: 12000,
        category: 'Jewelry'
      },
      {
        id: 4,
        name: 'Brass Lamps',
        description: 'Handcrafted brass lamps with temple motifs',
        price: 1800,
        category: 'Handicrafts'
      },
      {
        id: 5,
        name: 'Wooden Carvings',
        description: 'Intricate wooden carvings of temple architecture',
        price: 4500,
        category: 'Handicrafts'
      },
      {
        id: 6,
        name: 'Traditional Paintings',
        description: 'Hand-painted traditional art on canvas',
        price: 2800,
        category: 'Art'
      },
      {
        id: 7,
        name: 'Stone Sculptures',
        description: 'Hand-carved stone sculptures of deities',
        price: 7500,
        category: 'Art'
      },
      {
        id: 8,
        name: 'Bronze Statues',
        description: 'Traditional bronze statues with fine detailing',
        price: 11000,
        category: 'Art'
      },
      {
        id: 9,
        name: 'Cotton Handloom',
        description: 'Pure cotton handloom fabrics with traditional designs',
        price: 1300,
        category: 'Textiles'
      },
      {
        id: 10,
        name: 'Silver Filigree',
        description: 'Delicate silver filigree work jewelry',
        price: 5500,
        category: 'Jewelry'
      },
      {
        id: 11,
        name: 'Brass Utensils',
        description: 'Traditional brass utensils with engravings',
        price: 2200,
        category: 'Handicrafts'
      },
      {
        id: 12,
        name: 'Temple Bells',
        description: 'Handcrafted temple bells with traditional designs',
        price: 1600,
        category: 'Handicrafts'
      },
      {
        id: 13,
        name: 'Wooden Toys',
        description: 'Traditional wooden toys and dolls',
        price: 700,
        category: 'Handicrafts'
      },
      {
        id: 14,
        name: 'Brass Idols',
        description: 'Handcrafted brass idols of deities',
        price: 3200,
        category: 'Handicrafts'
      },
      {
        id: 15,
        name: 'Traditional Masks',
        description: 'Hand-painted traditional dance masks',
        price: 1100,
        category: 'Art'
      },
      {
        id: 16,
        name: 'Stone Jewelry',
        description: 'Handcrafted stone jewelry with traditional designs',
        price: 2500,
        category: 'Jewelry'
      },
      {
        id: 17,
        name: 'Brass Wall Hangings',
        description: 'Traditional brass wall hangings with temple motifs',
        price: 2000,
        category: 'Handicrafts'
      },
      {
        id: 18,
        name: 'Wooden Furniture',
        description: 'Handcrafted wooden furniture with traditional carvings',
        price: 14000,
        category: 'Furniture'
      },
      {
        id: 19,
        name: 'Silver Utensils',
        description: 'Traditional silver utensils with engravings',
        price: 7500,
        category: 'Handicrafts'
      },
      {
        id: 20,
        name: 'Traditional Pottery',
        description: 'Handcrafted traditional pottery items',
        price: 1300,
        category: 'Handicrafts'
      }
    ]
  },
  {
    id: 3,
    name: 'Thanjavur',
    description: 'Famous for Thanjavur Paintings and traditional art forms',
    products: [
      {
        id: 1,
        name: 'Thanjavur Painting',
        description: 'Traditional paintings with gold leaf work and religious themes',
        price: 20000,
        category: 'Art'
      },
      {
        id: 2,
        name: 'Thanjavur Dolls',
        description: 'Traditional handcrafted dolls with unique bobble-head design',
        price: 1500,
        category: 'Handicrafts'
      },
      {
        id: 3,
        name: 'Thanjavur Veena',
        description: 'Classical musical instrument with intricate carvings',
        price: 35000,
        category: 'Musical'
      },
      {
        id: 4,
        name: 'Brass Lamps',
        description: 'Handcrafted brass lamps with temple motifs',
        price: 2000,
        category: 'Handicrafts'
      },
      {
        id: 5,
        name: 'Wooden Carvings',
        description: 'Intricate wooden carvings of temple architecture',
        price: 5000,
        category: 'Handicrafts'
      },
      {
        id: 6,
        name: 'Traditional Paintings',
        description: 'Hand-painted traditional art on canvas',
        price: 3000,
        category: 'Art'
      },
      {
        id: 7,
        name: 'Stone Sculptures',
        description: 'Hand-carved stone sculptures of deities',
        price: 8000,
        category: 'Art'
      },
      {
        id: 8,
        name: 'Bronze Statues',
        description: 'Traditional bronze statues with fine detailing',
        price: 12000,
        category: 'Art'
      },
      {
        id: 9,
        name: 'Cotton Handloom',
        description: 'Pure cotton handloom fabrics with traditional designs',
        price: 1500,
        category: 'Textiles'
      },
      {
        id: 10,
        name: 'Silver Filigree',
        description: 'Delicate silver filigree work jewelry',
        price: 6000,
        category: 'Jewelry'
      },
      {
        id: 11,
        name: 'Brass Utensils',
        description: 'Traditional brass utensils with engravings',
        price: 2500,
        category: 'Handicrafts'
      },
      {
        id: 12,
        name: 'Temple Bells',
        description: 'Handcrafted temple bells with traditional designs',
        price: 1800,
        category: 'Handicrafts'
      },
      {
        id: 13,
        name: 'Wooden Toys',
        description: 'Traditional wooden toys and dolls',
        price: 800,
        category: 'Handicrafts'
      },
      {
        id: 14,
        name: 'Brass Idols',
        description: 'Handcrafted brass idols of deities',
        price: 3500,
        category: 'Handicrafts'
      },
      {
        id: 15,
        name: 'Traditional Masks',
        description: 'Hand-painted traditional dance masks',
        price: 1200,
        category: 'Art'
      },
      {
        id: 16,
        name: 'Stone Jewelry',
        description: 'Handcrafted stone jewelry with traditional designs',
        price: 2800,
        category: 'Jewelry'
      },
      {
        id: 17,
        name: 'Brass Wall Hangings',
        description: 'Traditional brass wall hangings with temple motifs',
        price: 2200,
        category: 'Handicrafts'
      },
      {
        id: 18,
        name: 'Wooden Furniture',
        description: 'Handcrafted wooden furniture with traditional carvings',
        price: 15000,
        category: 'Furniture'
      },
      {
        id: 19,
        name: 'Silver Utensils',
        description: 'Traditional silver utensils with engravings',
        price: 8000,
        category: 'Handicrafts'
      },
      {
        id: 20,
        name: 'Traditional Pottery',
        description: 'Handcrafted traditional pottery items',
        price: 1500,
        category: 'Handicrafts'
      }
    ]
  },
  {
    id: 4,
    name: 'Coimbatore',
    description: 'Known as "Manchester of South India" for its textile industry',
    products: [
      {
        id: 1,
        name: 'Kovai Cora Cotton',
        description: 'Traditional cotton fabric with unique designs',
        price: 5000,
        category: 'Textiles'
      },
      {
        id: 2,
        name: 'Handloom Sarees',
        description: 'Traditional handloom sarees with modern designs',
        price: 8000,
        category: 'Textiles'
      },
      {
        id: 3,
        name: 'Cotton Kurta',
        description: 'Handcrafted cotton kurtas with traditional patterns',
        price: 1500,
        category: 'Textiles'
      },
      {
        id: 4,
        name: 'Silk Blouse',
        description: 'Traditional silk blouses with intricate designs',
        price: 2500,
        category: 'Textiles'
      },
      {
        id: 5,
        name: 'Cotton Dresses',
        description: 'Modern cotton dresses with traditional motifs',
        price: 2000,
        category: 'Textiles'
      },
      {
        id: 6,
        name: 'Handloom Stoles',
        description: 'Traditional handloom stoles with unique patterns',
        price: 1200,
        category: 'Textiles'
      },
      {
        id: 7,
        name: 'Cotton Bags',
        description: 'Handcrafted cotton bags with traditional designs',
        price: 800,
        category: 'Accessories'
      },
      {
        id: 8,
        name: 'Silk Scarves',
        description: 'Traditional silk scarves with intricate patterns',
        price: 1500,
        category: 'Textiles'
      },
      {
        id: 9,
        name: 'Cotton Bedspreads',
        description: 'Handloom cotton bedspreads with traditional designs',
        price: 3000,
        category: 'Textiles'
      },
      {
        id: 10,
        name: 'Silk Cushions',
        description: 'Traditional silk cushions with intricate patterns',
        price: 1200,
        category: 'Home'
      },
      {
        id: 11,
        name: 'Cotton Table Runners',
        description: 'Handloom cotton table runners with traditional designs',
        price: 800,
        category: 'Home'
      },
      {
        id: 12,
        name: 'Silk Curtains',
        description: 'Traditional silk curtains with intricate patterns',
        price: 4000,
        category: 'Home'
      },
      {
        id: 13,
        name: 'Cotton Wall Hangings',
        description: 'Handloom cotton wall hangings with traditional designs',
        price: 1500,
        category: 'Home'
      },
      {
        id: 14,
        name: 'Silk Ties',
        description: 'Traditional silk ties with intricate patterns',
        price: 1000,
        category: 'Accessories'
      },
      {
        id: 15,
        name: 'Cotton Belts',
        description: 'Handcrafted cotton belts with traditional designs',
        price: 600,
        category: 'Accessories'
      },
      {
        id: 16,
        name: 'Silk Handkerchiefs',
        description: 'Traditional silk handkerchiefs with intricate patterns',
        price: 400,
        category: 'Accessories'
      },
      {
        id: 17,
        name: 'Cotton Napkins',
        description: 'Handloom cotton napkins with traditional designs',
        price: 500,
        category: 'Home'
      },
      {
        id: 18,
        name: 'Silk Table Cloths',
        description: 'Traditional silk table cloths with intricate patterns',
        price: 2500,
        category: 'Home'
      },
      {
        id: 19,
        name: 'Cotton Quilts',
        description: 'Handloom cotton quilts with traditional designs',
        price: 3500,
        category: 'Home'
      },
      {
        id: 20,
        name: 'Silk Bed Sheets',
        description: 'Traditional silk bed sheets with intricate patterns',
        price: 5000,
        category: 'Home'
      }
    ]
  },
  {
    id: 5,
    name: 'Salem',
    description: 'Famous for Silver Anklets and traditional jewelry making',
    products: [
      {
        id: 1,
        name: 'Salem Silver Anklets',
        description: 'Traditional silver anklets with intricate designs',
        price: 8000,
        category: 'Jewelry'
      },
      {
        id: 2,
        name: 'Silver Bangles',
        description: 'Traditional silver bangles with unique patterns',
        price: 5000,
        category: 'Jewelry'
      },
      {
        id: 3,
        name: 'Silver Necklaces',
        description: 'Handcrafted silver necklaces with traditional designs',
        price: 12000,
        category: 'Jewelry'
      },
      {
        id: 4,
        name: 'Silver Earrings',
        description: 'Traditional silver earrings with intricate patterns',
        price: 3000,
        category: 'Jewelry'
      },
      {
        id: 5,
        name: 'Silver Rings',
        description: 'Handcrafted silver rings with traditional designs',
        price: 2000,
        category: 'Jewelry'
      },
      {
        id: 6,
        name: 'Silver Chains',
        description: 'Traditional silver chains with unique patterns',
        price: 4000,
        category: 'Jewelry'
      },
      {
        id: 7,
        name: 'Silver Pendants',
        description: 'Handcrafted silver pendants with traditional designs',
        price: 2500,
        category: 'Jewelry'
      },
      {
        id: 8,
        name: 'Silver Bracelets',
        description: 'Traditional silver bracelets with intricate patterns',
        price: 3500,
        category: 'Jewelry'
      },
      {
        id: 9,
        name: 'Silver Toe Rings',
        description: 'Handcrafted silver toe rings with traditional designs',
        price: 1000,
        category: 'Jewelry'
      },
      {
        id: 10,
        name: 'Silver Nose Pins',
        description: 'Traditional silver nose pins with unique patterns',
        price: 800,
        category: 'Jewelry'
      },
      {
        id: 11,
        name: 'Silver Waist Chains',
        description: 'Handcrafted silver waist chains with traditional designs',
        price: 6000,
        category: 'Jewelry'
      },
      {
        id: 12,
        name: 'Silver Hair Pins',
        description: 'Traditional silver hair pins with intricate patterns',
        price: 1500,
        category: 'Jewelry'
      },
      {
        id: 13,
        name: 'Silver Armlets',
        description: 'Handcrafted silver armlets with traditional designs',
        price: 4500,
        category: 'Jewelry'
      },
      {
        id: 14,
        name: 'Silver Anklet Chains',
        description: 'Traditional silver anklet chains with unique patterns',
        price: 3000,
        category: 'Jewelry'
      },
      {
        id: 15,
        name: 'Silver Toe Chains',
        description: 'Handcrafted silver toe chains with traditional designs',
        price: 2000,
        category: 'Jewelry'
      },
      {
        id: 16,
        name: 'Silver Finger Rings',
        description: 'Traditional silver finger rings with intricate patterns',
        price: 1800,
        category: 'Jewelry'
      },
      {
        id: 17,
        name: 'Silver Ear Cuffs',
        description: 'Handcrafted silver ear cuffs with traditional designs',
        price: 2200,
        category: 'Jewelry'
      },
      {
        id: 18,
        name: 'Silver Nose Studs',
        description: 'Traditional silver nose studs with unique patterns',
        price: 1200,
        category: 'Jewelry'
      },
      {
        id: 19,
        name: 'Silver Hair Clips',
        description: 'Handcrafted silver hair clips with traditional designs',
        price: 1500,
        category: 'Jewelry'
      },
      {
        id: 20,
        name: 'Silver Anklet Bells',
        description: 'Traditional silver anklet bells with intricate patterns',
        price: 4000,
        category: 'Jewelry'
      }
    ]
  },
  {
    id: 6,
    name: 'Tirunelveli',
    description: 'Known for its famous Tirunelveli Halwa and palm leaf products',
    products: [
      {
        id: 1,
        name: 'Tirunelveli Halwa',
        description: 'Traditional sweet made with wheat, sugar, and ghee',
        price: 500,
        category: 'Food'
      },
      {
        id: 2,
        name: 'Palm Leaf Products',
        description: 'Eco-friendly products made from palm leaves',
        price: 300,
        category: 'Handicrafts'
      },
      {
        id: 3,
        name: 'Tirunelveli Idli',
        description: 'Soft and fluffy idlis served with sambar and chutney',
        price: 100,
        category: 'Food'
      },
      {
        id: 4,
        name: 'Tirunelveli Palkova',
        description: 'Traditional milk-based sweet delicacy',
        price: 400,
        category: 'Food'
      },
      {
        id: 5,
        name: 'Palm Leaf Baskets',
        description: 'Handcrafted palm leaf baskets with traditional designs',
        price: 250,
        category: 'Handicrafts'
      },
      {
        id: 6,
        name: 'Palm Leaf Mats',
        description: 'Traditional palm leaf mats with unique patterns',
        price: 350,
        category: 'Handicrafts'
      },
      {
        id: 7,
        name: 'Palm Leaf Fans',
        description: 'Handcrafted palm leaf fans with traditional designs',
        price: 200,
        category: 'Handicrafts'
      },
      {
        id: 8,
        name: 'Palm Leaf Hats',
        description: 'Traditional palm leaf hats with intricate patterns',
        price: 300,
        category: 'Handicrafts'
      },
      {
        id: 9,
        name: 'Palm Leaf Bags',
        description: 'Handcrafted palm leaf bags with traditional designs',
        price: 400,
        category: 'Handicrafts'
      },
      {
        id: 10,
        name: 'Palm Leaf Boxes',
        description: 'Traditional palm leaf boxes with unique patterns',
        price: 350,
        category: 'Handicrafts'
      },
      {
        id: 11,
        name: 'Palm Leaf Trays',
        description: 'Handcrafted palm leaf trays with traditional designs',
        price: 300,
        category: 'Handicrafts'
      },
      {
        id: 12,
        name: 'Palm Leaf Containers',
        description: 'Traditional palm leaf containers with intricate patterns',
        price: 250,
        category: 'Handicrafts'
      },
      {
        id: 13,
        name: 'Palm Leaf Decorations',
        description: 'Handcrafted palm leaf decorations with traditional designs',
        price: 200,
        category: 'Handicrafts'
      },
      {
        id: 14,
        name: 'Palm Leaf Wall Hangings',
        description: 'Traditional palm leaf wall hangings with unique patterns',
        price: 450,
        category: 'Handicrafts'
      },
      {
        id: 15,
        name: 'Palm Leaf Lamps',
        description: 'Handcrafted palm leaf lamps with traditional designs',
        price: 500,
        category: 'Handicrafts'
      },
      {
        id: 16,
        name: 'Palm Leaf Coasters',
        description: 'Traditional palm leaf coasters with intricate patterns',
        price: 150,
        category: 'Handicrafts'
      },
      {
        id: 17,
        name: 'Palm Leaf Placemats',
        description: 'Handcrafted palm leaf placemats with traditional designs',
        price: 300,
        category: 'Handicrafts'
      },
      {
        id: 18,
        name: 'Palm Leaf Storage Boxes',
        description: 'Traditional palm leaf storage boxes with unique patterns',
        price: 350,
        category: 'Handicrafts'
      },
      {
        id: 19,
        name: 'Palm Leaf Gift Boxes',
        description: 'Handcrafted palm leaf gift boxes with traditional designs',
        price: 350,
        category: 'Handicrafts'
      },
      {
        id: 20,
        name: 'Palm Leaf Decorative Items',
        description: 'Traditional palm leaf decorative items with intricate patterns',
        price: 250,
        category: 'Handicrafts'
      }
    ]
  },
  {
    id: 7,
    name: 'Kanyakumari',
    description: 'Famous for its fish products and sea shell crafts',
    products: [
      {
        id: 1,
        name: 'Dried Fish',
        description: 'Traditional dried fish products with authentic taste',
        price: 400,
        category: 'Food'
      },
      {
        id: 2,
        name: 'Sea Shell Crafts',
        description: 'Beautiful crafts made from sea shells',
        price: 600,
        category: 'Handicrafts'
      },
      {
        id: 3,
        name: 'Pearl Jewelry',
        description: 'Handcrafted pearl jewelry with traditional designs',
        price: 8000,
        category: 'Jewelry'
      },
      {
        id: 4,
        name: 'Coral Products',
        description: 'Unique coral-based decorative items',
        price: 1200,
        category: 'Handicrafts'
      },
      {
        id: 5,
        name: 'Sea Salt',
        description: 'Natural sea salt from salt pans',
        price: 100,
        category: 'Food'
      },
      {
        id: 6,
        name: 'Fish Pickles',
        description: 'Traditional fish pickles with local spices',
        price: 300,
        category: 'Food'
      },
      {
        id: 7,
        name: 'Shell Necklaces',
        description: 'Handcrafted shell necklaces with unique designs',
        price: 500,
        category: 'Jewelry'
      },
      {
        id: 8,
        name: 'Coconut Shell Crafts',
        description: 'Eco-friendly products made from coconut shells',
        price: 400,
        category: 'Handicrafts'
      },
      {
        id: 9,
        name: 'Fish Curry Powder',
        description: 'Traditional fish curry spice mix',
        price: 200,
        category: 'Food'
      },
      {
        id: 10,
        name: 'Shell Wind Chimes',
        description: 'Musical wind chimes made from sea shells',
        price: 800,
        category: 'Handicrafts'
      },
      {
        id: 11,
        name: 'Pearl Earrings',
        description: 'Elegant pearl earrings with traditional designs',
        price: 2500,
        category: 'Jewelry'
      },
      {
        id: 12,
        name: 'Fish Masala',
        description: 'Special masala mix for fish dishes',
        price: 150,
        category: 'Food'
      },
      {
        id: 13,
        name: 'Shell Wall Hangings',
        description: 'Decorative wall hangings made from sea shells',
        price: 700,
        category: 'Handicrafts'
      },
      {
        id: 14,
        name: 'Coral Jewelry',
        description: 'Unique coral jewelry pieces',
        price: 3500,
        category: 'Jewelry'
      },
      {
        id: 15,
        name: 'Fish Chutney',
        description: 'Traditional fish chutney with local spices',
        price: 250,
        category: 'Food'
      },
      {
        id: 16,
        name: 'Shell Coasters',
        description: 'Decorative coasters made from sea shells',
        price: 300,
        category: 'Handicrafts'
      },
      {
        id: 17,
        name: 'Pearl Bangles',
        description: 'Elegant pearl bangles with traditional designs',
        price: 1800,
        category: 'Jewelry'
      },
      {
        id: 18,
        name: 'Fish Masala Powder',
        description: 'Special masala powder for fish dishes',
        price: 180,
        category: 'Food'
      },
      {
        id: 19,
        name: 'Shell Photo Frames',
        description: 'Decorative photo frames made from sea shells',
        price: 600,
        category: 'Handicrafts'
      },
      {
        id: 20,
        name: 'Coral Necklaces',
        description: 'Unique coral necklaces with traditional designs',
        price: 2800,
        category: 'Jewelry'
      }
    ]
  },
  {
    id: 8,
    name: 'Erode',
    description: 'Known for turmeric and handloom products',
    products: [
      {
        id: 1,
        name: 'Turmeric Powder',
        description: 'High-quality turmeric powder',
        price: 200,
        category: 'Spices'
      },
      {
        id: 2,
        name: 'Handloom Sarees',
        description: 'Traditional handloom sarees with unique designs',
        price: 3000,
        category: 'Textiles'
      },
      {
        id: 3,
        name: 'Turmeric Soap',
        description: 'Natural turmeric soap with skin benefits',
        price: 150,
        category: 'Beauty'
      },
      {
        id: 4,
        name: 'Cotton Dhotis',
        description: 'Traditional cotton dhotis with fine quality',
        price: 800,
        category: 'Textiles'
      },
      {
        id: 5,
        name: 'Turmeric Face Pack',
        description: 'Natural turmeric face pack for glowing skin',
        price: 250,
        category: 'Beauty'
      },
      {
        id: 6,
        name: 'Handloom Shirts',
        description: 'Traditional handloom shirts with unique patterns',
        price: 1200,
        category: 'Textiles'
      },
      {
        id: 7,
        name: 'Turmeric Oil',
        description: 'Pure turmeric oil for hair and skin',
        price: 300,
        category: 'Beauty'
      },
      {
        id: 8,
        name: 'Cotton Kurta',
        description: 'Traditional cotton kurtas with fine quality',
        price: 1000,
        category: 'Textiles'
      },
      {
        id: 9,
        name: 'Turmeric Cream',
        description: 'Natural turmeric cream for skin care',
        price: 280,
        category: 'Beauty'
      },
      {
        id: 10,
        name: 'Handloom Stoles',
        description: 'Traditional handloom stoles with unique designs',
        price: 800,
        category: 'Textiles'
      },
      {
        id: 11,
        name: 'Turmeric Powder (Organic)',
        description: 'Organic turmeric powder for cooking',
        price: 250,
        category: 'Spices'
      },
      {
        id: 12,
        name: 'Cotton Bedsheets',
        description: 'Traditional cotton bedsheets with fine quality',
        price: 1500,
        category: 'Textiles'
      },
      {
        id: 13,
        name: 'Turmeric Face Wash',
        description: 'Natural turmeric face wash for glowing skin',
        price: 200,
        category: 'Beauty'
      },
      {
        id: 14,
        name: 'Handloom Towels',
        description: 'Traditional handloom towels with unique designs',
        price: 400,
        category: 'Textiles'
      },
      {
        id: 15,
        name: 'Turmeric Hair Oil',
        description: 'Pure turmeric hair oil for healthy hair',
        price: 350,
        category: 'Beauty'
      },
      {
        id: 16,
        name: 'Cotton Table Cloths',
        description: 'Traditional cotton table cloths with fine quality',
        price: 600,
        category: 'Textiles'
      },
      {
        id: 17,
        name: 'Turmeric Body Scrub',
        description: 'Natural turmeric body scrub for glowing skin',
        price: 300,
        category: 'Beauty'
      },
      {
        id: 18,
        name: 'Handloom Napkins',
        description: 'Traditional handloom napkins with unique designs',
        price: 200,
        category: 'Textiles'
      },
      {
        id: 19,
        name: 'Turmeric Face Toner',
        description: 'Natural turmeric face toner for glowing skin',
        price: 220,
        category: 'Beauty'
      },
      {
        id: 20,
        name: 'Cotton Cushion Covers',
        description: 'Traditional cotton cushion covers with fine quality',
        price: 500,
        category: 'Textiles'
      }
    ]
  },
  {
    id: 9,
    name: 'Karur',
    description: 'Famous for bedspreads and paper products',
    products: [
      {
        id: 1,
        name: 'Bedspreads',
        description: 'Handwoven bedspreads with traditional designs',
        price: 2000,
        category: 'Textiles'
      },
      {
        id: 2,
        name: 'Paper Products',
        description: 'Eco-friendly paper products',
        price: 300,
        category: 'Stationery'
      },
      {
        id: 3,
        name: 'Cotton Quilts',
        description: 'Traditional cotton quilts with unique patterns',
        price: 3500,
        category: 'Textiles'
      },
      {
        id: 4,
        name: 'Paper Bags',
        description: 'Eco-friendly paper bags with traditional designs',
        price: 200,
        category: 'Stationery'
      },
      {
        id: 5,
        name: 'Bed Covers',
        description: 'Handwoven bed covers with traditional designs',
        price: 2500,
        category: 'Textiles'
      },
      {
        id: 6,
        name: 'Paper Notebooks',
        description: 'Eco-friendly paper notebooks with traditional designs',
        price: 150,
        category: 'Stationery'
      },
      {
        id: 7,
        name: 'Cotton Pillows',
        description: 'Traditional cotton pillows with unique patterns',
        price: 800,
        category: 'Textiles'
      },
      {
        id: 8,
        name: 'Paper Envelopes',
        description: 'Eco-friendly paper envelopes with traditional designs',
        price: 100,
        category: 'Stationery'
      },
      {
        id: 9,
        name: 'Bed Sheets',
        description: 'Handwoven bed sheets with traditional designs',
        price: 1800,
        category: 'Textiles'
      },
      {
        id: 10,
        name: 'Paper Cards',
        description: 'Eco-friendly paper cards with traditional designs',
        price: 50,
        category: 'Stationery'
      },
      {
        id: 11,
        name: 'Cotton Cushions',
        description: 'Traditional cotton cushions with unique patterns',
        price: 600,
        category: 'Textiles'
      },
      {
        id: 12,
        name: 'Paper Boxes',
        description: 'Eco-friendly paper boxes with traditional designs',
        price: 250,
        category: 'Stationery'
      },
      {
        id: 13,
        name: 'Bed Throws',
        description: 'Handwoven bed throws with traditional designs',
        price: 1200,
        category: 'Textiles'
      },
      {
        id: 14,
        name: 'Paper Wrappers',
        description: 'Eco-friendly paper wrappers with traditional designs',
        price: 80,
        category: 'Stationery'
      },
      {
        id: 15,
        name: 'Cotton Blankets',
        description: 'Traditional cotton blankets with unique patterns',
        price: 2800,
        category: 'Textiles'
      },
      {
        id: 16,
        name: 'Paper Folders',
        description: 'Eco-friendly paper folders with traditional designs',
        price: 120,
        category: 'Stationery'
      },
      {
        id: 17,
        name: 'Bed Runners',
        description: 'Handwoven bed runners with traditional designs',
        price: 900,
        category: 'Textiles'
      },
      {
        id: 18,
        name: 'Paper Bookmarks',
        description: 'Eco-friendly paper bookmarks with traditional designs',
        price: 40,
        category: 'Stationery'
      },
      {
        id: 19,
        name: 'Cotton Curtains',
        description: 'Traditional cotton curtains with unique patterns',
        price: 2200,
        category: 'Textiles'
      },
      {
        id: 20,
        name: 'Paper Gift Wraps',
        description: 'Eco-friendly paper gift wraps with traditional designs',
        price: 150,
        category: 'Stationery'
      }
    ]
  },
  {
    id: 10,
    name: 'Dindigul',
    description: 'Known for locks and leather products',
    products: [
      {
        id: 1,
        name: 'Dindigul Locks',
        description: 'High-quality traditional locks',
        price: 800,
        category: 'Hardware'
      },
      {
        id: 2,
        name: 'Leather Bags',
        description: 'Handcrafted leather bags with traditional designs',
        price: 2500,
        category: 'Accessories'
      },
      {
        id: 3,
        name: 'Padlocks',
        description: 'Traditional padlocks with unique designs',
        price: 500,
        category: 'Hardware'
      },
      {
        id: 4,
        name: 'Leather Wallets',
        description: 'Handcrafted leather wallets with traditional designs',
        price: 800,
        category: 'Accessories'
      },
      {
        id: 5,
        name: 'Door Locks',
        description: 'Traditional door locks with unique designs',
        price: 1200,
        category: 'Hardware'
      },
      {
        id: 6,
        name: 'Leather Belts',
        description: 'Handcrafted leather belts with traditional designs',
        price: 600,
        category: 'Accessories'
      },
      {
        id: 7,
        name: 'Safety Locks',
        description: 'Traditional safety locks with unique designs',
        price: 900,
        category: 'Hardware'
      },
      {
        id: 8,
        name: 'Leather Shoes',
        description: 'Handcrafted leather shoes with traditional designs',
        price: 1800,
        category: 'Footwear'
      },
      {
        id: 9,
        name: 'Bicycle Locks',
        description: 'Traditional bicycle locks with unique designs',
        price: 400,
        category: 'Hardware'
      },
      {
        id: 10,
        name: 'Leather Sandals',
        description: 'Handcrafted leather sandals with traditional designs',
        price: 1200,
        category: 'Footwear'
      },
      {
        id: 11,
        name: 'Chain Locks',
        description: 'Traditional chain locks with unique designs',
        price: 600,
        category: 'Hardware'
      },
      {
        id: 12,
        name: 'Leather Jackets',
        description: 'Handcrafted leather jackets with traditional designs',
        price: 3500,
        category: 'Clothing'
      },
      {
        id: 13,
        name: 'Security Locks',
        description: 'Traditional security locks with unique designs',
        price: 1500,
        category: 'Hardware'
      },
      {
        id: 14,
        name: 'Leather Gloves',
        description: 'Handcrafted leather gloves with traditional designs',
        price: 500,
        category: 'Accessories'
      },
      {
        id: 15,
        name: 'Gate Locks',
        description: 'Traditional gate locks with unique designs',
        price: 1800,
        category: 'Hardware'
      },
      {
        id: 16,
        name: 'Leather Watch Straps',
        description: 'Handcrafted leather watch straps with traditional designs',
        price: 400,
        category: 'Accessories'
      },
      {
        id: 17,
        name: 'Window Locks',
        description: 'Traditional window locks with unique designs',
        price: 700,
        category: 'Hardware'
      },
      {
        id: 18,
        name: 'Leather Key Chains',
        description: 'Handcrafted leather key chains with traditional designs',
        price: 300,
        category: 'Accessories'
      },
      {
        id: 19,
        name: 'Cabinet Locks',
        description: 'Traditional cabinet locks with unique designs',
        price: 450,
        category: 'Hardware'
      },
      {
        id: 20,
        name: 'Leather Phone Cases',
        description: 'Handcrafted leather phone cases with traditional designs',
        price: 600,
        category: 'Accessories'
      }
    ]
  },
  {
    id: 11,
    name: 'Sivaganga',
    description: 'Famous for Chettinad cuisine and sarees',
    products: [
      {
        id: 1,
        name: 'Chettinad Spices',
        description: 'Authentic Chettinad spice mix',
        price: 400,
        category: 'Spices'
      },
      {
        id: 2,
        name: 'Chettinad Sarees',
        description: 'Traditional Chettinad silk sarees',
        price: 5000,
        category: 'Textiles'
      },
      {
        id: 3,
        name: 'Chettinad Masala',
        description: 'Special masala mix for Chettinad dishes',
        price: 300,
        category: 'Spices'
      },
      {
        id: 4,
        name: 'Chettinad Blouse',
        description: 'Traditional Chettinad blouse pieces',
        price: 1500,
        category: 'Textiles'
      },
      {
        id: 5,
        name: 'Chettinad Pickle',
        description: 'Traditional Chettinad pickles',
        price: 250,
        category: 'Food'
      },
      {
        id: 6,
        name: 'Chettinad Stoles',
        description: 'Traditional Chettinad stoles',
        price: 800,
        category: 'Textiles'
      },
      {
        id: 7,
        name: 'Chettinad Chutney',
        description: 'Traditional Chettinad chutneys',
        price: 200,
        category: 'Food'
      },
      {
        id: 8,
        name: 'Chettinad Dupattas',
        description: 'Traditional Chettinad dupattas',
        price: 1200,
        category: 'Textiles'
      },
      {
        id: 9,
        name: 'Chettinad Podi',
        description: 'Traditional Chettinad spice powder',
        price: 350,
        category: 'Spices'
      },
      {
        id: 10,
        name: 'Chettinad Shawls',
        description: 'Traditional Chettinad shawls',
        price: 1800,
        category: 'Textiles'
      },
      {
        id: 11,
        name: 'Chettinad Curry Powder',
        description: 'Special curry powder for Chettinad dishes',
        price: 280,
        category: 'Spices'
      },
      {
        id: 12,
        name: 'Chettinad Handkerchiefs',
        description: 'Traditional Chettinad handkerchiefs',
        price: 300,
        category: 'Textiles'
      },
      {
        id: 13,
        name: 'Chettinad Sambar Powder',
        description: 'Special sambar powder for Chettinad dishes',
        price: 320,
        category: 'Spices'
      },
      {
        id: 14,
        name: 'Chettinad Table Runners',
        description: 'Traditional Chettinad table runners',
        price: 600,
        category: 'Textiles'
      },
      {
        id: 15,
        name: 'Chettinad Rasam Powder',
        description: 'Special rasam powder for Chettinad dishes',
        price: 300,
        category: 'Spices'
      },
      {
        id: 16,
        name: 'Chettinad Cushion Covers',
        description: 'Traditional Chettinad cushion covers',
        price: 500,
        category: 'Textiles'
      },
      {
        id: 17,
        name: 'Chettinad Chutney Powder',
        description: 'Special chutney powder for Chettinad dishes',
        price: 250,
        category: 'Spices'
      },
      {
        id: 18,
        name: 'Chettinad Curtains',
        description: 'Traditional Chettinad curtains',
        price: 2200,
        category: 'Textiles'
      },
      {
        id: 19,
        name: 'Chettinad Biryani Masala',
        description: 'Special biryani masala for Chettinad dishes',
        price: 400,
        category: 'Spices'
      },
      {
        id: 20,
        name: 'Chettinad Bedspreads',
        description: 'Traditional Chettinad bedspreads',
        price: 3500,
        category: 'Textiles'
      }
    ]
  },
  {
    id: 12,
    name: 'Pudukkottai',
    description: 'Known for palm leaf art and stone carvings',
    products: [
      {
        id: 1,
        name: 'Palm Leaf Art',
        description: 'Traditional palm leaf paintings',
        price: 1500,
        category: 'Art'
      },
      {
        id: 2,
        name: 'Stone Carvings',
        description: 'Hand-carved stone sculptures',
        price: 3000,
        category: 'Art'
      },
      {
        id: 3,
        name: 'Palm Leaf Baskets',
        description: 'Traditional palm leaf baskets',
        price: 400,
        category: 'Handicrafts'
      },
      {
        id: 4,
        name: 'Stone Idols',
        description: 'Hand-carved stone idols',
        price: 5000,
        category: 'Art'
      },
      {
        id: 5,
        name: 'Palm Leaf Wall Hangings',
        description: 'Traditional palm leaf wall hangings',
        price: 800,
        category: 'Handicrafts'
      },
      {
        id: 6,
        name: 'Stone Lamps',
        description: 'Hand-carved stone lamps',
        price: 2500,
        category: 'Art'
      },
      {
        id: 7,
        name: 'Palm Leaf Boxes',
        description: 'Traditional palm leaf boxes',
        price: 600,
        category: 'Handicrafts'
      },
      {
        id: 8,
        name: 'Stone Statues',
        description: 'Hand-carved stone statues',
        price: 4000,
        category: 'Art'
      },
      {
        id: 9,
        name: 'Palm Leaf Mats',
        description: 'Traditional palm leaf mats',
        price: 500,
        category: 'Handicrafts'
      },
      {
        id: 10,
        name: 'Stone Decorations',
        description: 'Hand-carved stone decorations',
        price: 1800,
        category: 'Art'
      },
      {
        id: 11,
        name: 'Palm Leaf Fans',
        description: 'Traditional palm leaf fans',
        price: 300,
        category: 'Handicrafts'
      },
      {
        id: 12,
        name: 'Stone Jewelry',
        description: 'Hand-carved stone jewelry',
        price: 1200,
        category: 'Art'
      },
      {
        id: 13,
        name: 'Palm Leaf Containers',
        description: 'Traditional palm leaf containers',
        price: 450,
        category: 'Handicrafts'
      },
      {
        id: 14,
        name: 'Stone Coasters',
        description: 'Hand-carved stone coasters',
        price: 800,
        category: 'Art'
      },
      {
        id: 15,
        name: 'Palm Leaf Trays',
        description: 'Traditional palm leaf trays',
        price: 350,
        category: 'Handicrafts'
      },
      {
        id: 16,
        name: 'Stone Photo Frames',
        description: 'Hand-carved stone photo frames',
        price: 1500,
        category: 'Art'
      },
      {
        id: 17,
        name: 'Palm Leaf Decorations',
        description: 'Traditional palm leaf decorations',
        price: 400,
        category: 'Handicrafts'
      },
      {
        id: 18,
        name: 'Stone Bookends',
        description: 'Hand-carved stone bookends',
        price: 1200,
        category: 'Art'
      },
      {
        id: 19,
        name: 'Palm Leaf Storage Boxes',
        description: 'Traditional palm leaf storage boxes',
        price: 700,
        category: 'Handicrafts'
      },
      {
        id: 20,
        name: 'Stone Wind Chimes',
        description: 'Hand-carved stone wind chimes',
        price: 2000,
        category: 'Art'
      }
    ]
  },
  {
    id: 13,
    name: 'Ramanathapuram',
    description: 'Famous for pearl farming and sea salt',
    products: [
      {
        id: 1,
        name: 'Pearl Jewelry',
        description: 'Handcrafted pearl jewelry',
        price: 8000,
        category: 'Jewelry'
      },
      {
        id: 2,
        name: 'Sea Salt',
        description: 'Natural sea salt from salt pans',
        price: 100,
        category: 'Food'
      },
      {
        id: 3,
        name: 'Pearl Necklaces',
        description: 'Traditional pearl necklaces',
        price: 12000,
        category: 'Jewelry'
      },
      {
        id: 4,
        name: 'Salt Lamps',
        description: 'Natural salt lamps',
        price: 800,
        category: 'Home'
      },
      {
        id: 5,
        name: 'Pearl Earrings',
        description: 'Traditional pearl earrings',
        price: 5000,
        category: 'Jewelry'
      },
      {
        id: 6,
        name: 'Salt Scrub',
        description: 'Natural sea salt scrub',
        price: 300,
        category: 'Beauty'
      },
      {
        id: 7,
        name: 'Pearl Bangles',
        description: 'Traditional pearl bangles',
        price: 6000,
        category: 'Jewelry'
      },
      {
        id: 8,
        name: 'Salt Soap',
        description: 'Natural sea salt soap',
        price: 200,
        category: 'Beauty'
      },
      {
        id: 9,
        name: 'Pearl Rings',
        description: 'Traditional pearl rings',
        price: 4000,
        category: 'Jewelry'
      },
      {
        id: 10,
        name: 'Salt Crystals',
        description: 'Natural sea salt crystals',
        price: 150,
        category: 'Home'
      },
      {
        id: 11,
        name: 'Pearl Pendants',
        description: 'Traditional pearl pendants',
        price: 3500,
        category: 'Jewelry'
      },
      {
        id: 12,
        name: 'Salt Candles',
        description: 'Natural salt candles',
        price: 400,
        category: 'Home'
      },
      {
        id: 13,
        name: 'Pearl Bracelets',
        description: 'Traditional pearl bracelets',
        price: 4500,
        category: 'Jewelry'
      },
      {
        id: 14,
        name: 'Salt Bath',
        description: 'Natural sea salt bath',
        price: 250,
        category: 'Beauty'
      },
      {
        id: 15,
        name: 'Pearl Hair Pins',
        description: 'Traditional pearl hair pins',
        price: 1800,
        category: 'Jewelry'
      },
      {
        id: 16,
        name: 'Salt Diffusers',
        description: 'Natural salt diffusers',
        price: 600,
        category: 'Home'
      },
      {
        id: 17,
        name: 'Pearl Brooches',
        description: 'Traditional pearl brooches',
        price: 2800,
        category: 'Jewelry'
      },
      {
        id: 18,
        name: 'Salt Ornaments',
        description: 'Natural salt ornaments',
        price: 350,
        category: 'Home'
      },
      {
        id: 19,
        name: 'Pearl Anklets',
        description: 'Traditional pearl anklets',
        price: 3200,
        category: 'Jewelry'
      },
      {
        id: 20,
        name: 'Salt Decorations',
        description: 'Natural salt decorations',
        price: 500,
        category: 'Home'
      }
    ]
  },
  {
    id: 14,
    name: 'Thoothukudi',
    description: 'Known for pearl industry and seafood',
    products: [
      {
        id: 1,
        name: 'Pearl Products',
        description: 'High-quality pearl products',
        price: 12000,
        category: 'Jewelry'
      },
      {
        id: 2,
        name: 'Seafood Products',
        description: 'Fresh and dried seafood',
        price: 1500,
        category: 'Food'
      },
      {
        id: 3,
        name: 'Pearl Necklaces',
        description: 'Traditional pearl necklaces',
        price: 15000,
        category: 'Jewelry'
      },
      {
        id: 4,
        name: 'Dried Fish',
        description: 'Traditional dried fish products',
        price: 800,
        category: 'Food'
      },
      {
        id: 5,
        name: 'Pearl Earrings',
        description: 'Traditional pearl earrings',
        price: 6000,
        category: 'Jewelry'
      },
      {
        id: 6,
        name: 'Fish Pickles',
        description: 'Traditional fish pickles',
        price: 400,
        category: 'Food'
      },
      {
        id: 7,
        name: 'Pearl Bangles',
        description: 'Traditional pearl bangles',
        price: 8000,
        category: 'Jewelry'
      },
      {
        id: 8,
        name: 'Fish Masala',
        description: 'Traditional fish masala',
        price: 300,
        category: 'Food'
      },
      {
        id: 9,
        name: 'Pearl Rings',
        description: 'Traditional pearl rings',
        price: 5000,
        category: 'Jewelry'
      },
      {
        id: 10,
        name: 'Fish Curry Powder',
        description: 'Traditional fish curry powder',
        price: 250,
        category: 'Food'
      },
      {
        id: 11,
        name: 'Pearl Pendants',
        description: 'Traditional pearl pendants',
        price: 4500,
        category: 'Jewelry'
      },
      {
        id: 12,
        name: 'Fish Chutney',
        description: 'Traditional fish chutney',
        price: 350,
        category: 'Food'
      },
      {
        id: 13,
        name: 'Pearl Bracelets',
        description: 'Traditional pearl bracelets',
        price: 5500,
        category: 'Jewelry'
      },
      {
        id: 14,
        name: 'Fish Powder',
        description: 'Traditional fish powder',
        price: 200,
        category: 'Food'
      },
      {
        id: 15,
        name: 'Pearl Hair Pins',
        description: 'Traditional pearl hair pins',
        price: 2000,
        category: 'Jewelry'
      },
      {
        id: 16,
        name: 'Fish Masala Powder',
        description: 'Traditional fish masala powder',
        price: 280,
        category: 'Food'
      },
      {
        id: 17,
        name: 'Pearl Brooches',
        description: 'Traditional pearl brooches',
        price: 3500,
        category: 'Jewelry'
      },
      {
        id: 18,
        name: 'Fish Curry Paste',
        description: 'Traditional fish curry paste',
        price: 320,
        category: 'Food'
      },
      {
        id: 19,
        name: 'Pearl Anklets',
        description: 'Traditional pearl anklets',
        price: 4000,
        category: 'Jewelry'
      },
      {
        id: 20,
        name: 'Fish Spice Mix',
        description: 'Traditional fish spice mix',
        price: 380,
        category: 'Food'
      }
    ]
  },
  {
    id: 15,
    name: 'Tiruchirappalli',
    description: 'Known for rock art and handloom products',
    products: [
      {
        id: 1,
        name: 'Rock Art',
        description: 'Traditional rock art sculptures',
        price: 10000,
        category: 'Art'
      },
      {
        id: 2,
        name: 'Handloom Products',
        description: 'Traditional handloom textiles',
        price: 4000,
        category: 'Textiles'
      },
      {
        id: 3,
        name: 'Rock Carvings',
        description: 'Traditional rock carvings',
        price: 8000,
        category: 'Art'
      },
      {
        id: 4,
        name: 'Handloom Sarees',
        description: 'Traditional handloom sarees',
        price: 5000,
        category: 'Textiles'
      },
      {
        id: 5,
        name: 'Rock Statues',
        description: 'Traditional rock statues',
        price: 12000,
        category: 'Art'
      },
      {
        id: 6,
        name: 'Handloom Dhotis',
        description: 'Traditional handloom dhotis',
        price: 1500,
        category: 'Textiles'
      },
      {
        id: 7,
        name: 'Rock Decorations',
        description: 'Traditional rock decorations',
        price: 6000,
        category: 'Art'
      },
      {
        id: 8,
        name: 'Handloom Shirts',
        description: 'Traditional handloom shirts',
        price: 1200,
        category: 'Textiles'
      },
      {
        id: 9,
        name: 'Rock Lamps',
        description: 'Traditional rock lamps',
        price: 4500,
        category: 'Art'
      },
      {
        id: 10,
        name: 'Handloom Kurta',
        description: 'Traditional handloom kurtas',
        price: 1000,
        category: 'Textiles'
      },
      {
        id: 11,
        name: 'Rock Coasters',
        description: 'Traditional rock coasters',
        price: 2000,
        category: 'Art'
      },
      {
        id: 12,
        name: 'Handloom Stoles',
        description: 'Traditional handloom stoles',
        price: 800,
        category: 'Textiles'
      },
      {
        id: 13,
        name: 'Rock Photo Frames',
        description: 'Traditional rock photo frames',
        price: 3500,
        category: 'Art'
      },
      {
        id: 14,
        name: 'Handloom Towels',
        description: 'Traditional handloom towels',
        price: 600,
        category: 'Textiles'
      },
      {
        id: 15,
        name: 'Rock Bookends',
        description: 'Traditional rock bookends',
        price: 2800,
        category: 'Art'
      },
      {
        id: 16,
        name: 'Handloom Table Cloths',
        description: 'Traditional handloom table cloths',
        price: 900,
        category: 'Textiles'
      },
      {
        id: 17,
        name: 'Rock Wind Chimes',
        description: 'Traditional rock wind chimes',
        price: 4000,
        category: 'Art'
      },
      {
        id: 18,
        name: 'Handloom Napkins',
        description: 'Traditional handloom napkins',
        price: 400,
        category: 'Textiles'
      },
      {
        id: 19,
        name: 'Rock Wall Hangings',
        description: 'Traditional rock wall hangings',
        price: 5500,
        category: 'Art'
      },
      {
        id: 20,
        name: 'Handloom Cushion Covers',
        description: 'Traditional handloom cushion covers',
        price: 700,
        category: 'Textiles'
      }
    ]
  }
];

const ODOPPage = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  return (
    <div className="odop-page">
      <Navbar />
      
      <div className="odop-header">
        <h1>One District One Product</h1>
        <p>Discover unique products from each district of Tamil Nadu</p>
      </div>

      {!selectedDistrict ? (
        <div className="districts-grid">
          {districts.map((district) => (
            <div
              key={district.id}
              className="district-card"
              onClick={() => setSelectedDistrict(district)}
            >
              <div className="district-image">
                {/* Placeholder for the image */}
              </div>
              <div className="district-info">
                <h2>{district.name}</h2>
                <p>{district.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="district-details">
          <button className="back-button" onClick={() => setSelectedDistrict(null)}>
            ← Back to Districts
          </button>
          
          <div className="district-header">
            <h2>{selectedDistrict.name}</h2>
            <p>{selectedDistrict.description}</p>
          </div>

          <div className="products-grid">
            {selectedDistrict.products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  {/* Placeholder for the image */}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-price">₹{product.price}</div>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      
    </div>
  );
};

export default ODOPPage; 