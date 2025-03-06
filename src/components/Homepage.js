import React from 'react';
import { Bookmark, ShoppingCart } from 'lucide-react';
import '../styles/Homepage.css';
import productData from "./productData";

const ProductCard = ({ id, name, image, originalPrice, discountedPrice, discount, weight, category, rating, brand }) => {
  return (
    <div className="product-card">
      <div className="discount-badge">{discount}% OFF</div>
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <div className="brand-label">{brand}</div>
      <div className="product-name">{name}</div>
      <div className="weight-selector">
        <select>
          <option>{weight}</option>
        </select>
      </div>
      <div className="pricing">
        <div>
          <span className="discounted-price">₹{discountedPrice}</span>
          <span className="original-price">₹{originalPrice}</span>
        </div>
        <Bookmark className="bookmark-icon" size={20} />
      </div>
      <button className="add-to-cart">
        <ShoppingCart size={20} />
        Add
      </button>
    </div>
  );
};


const Homepage = () => {
  // Sample product data from SearchPage.js

  return (
    <div className="homepage">
      <div className="page-header">
        <h1>My Smart Basket</h1>
        <p>Fresh produce at great prices</p>
      </div>
      <div className="products-grid">
        {productData.map((productData) => (
          <ProductCard key={productData.id} {...productData} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;