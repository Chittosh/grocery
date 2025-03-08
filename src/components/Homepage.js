import React from 'react';
import { Bookmark, ShoppingCart } from 'lucide-react';
import '../styles/Homepage.css';
import productData from "./productData";
import { addToCart } from './Cart';

const ProductCard = ({ id, name, image, originalPrice, discountedPrice, discount, weight, category, rating, brand }) => {
  const handleAddToCart = () => {
    // Use the addToCart function imported from Cart.js
    const updatedCart = addToCart({ id, name, image, originalPrice, discountedPrice, discount, weight, category, rating, brand });
    
    // Show a small notification that item was added
    alert(`${name} added to cart!`);
  };

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
      <button className="add-to-cart" onClick={handleAddToCart}>
        <ShoppingCart size={20} />
        Add
      </button>
    </div>
  );
};

const Homepage = () => {
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