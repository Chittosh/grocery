import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, CreditCard, Wallet, ArrowRight } from 'lucide-react';
import '../styles/Cart.css';

const Cart = () => {
  // Initialize cart from localStorage or empty array if nothing exists
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.discountedPrice * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const couponDiscount = couponApplied ? discount : 0;
  const total = subtotal + deliveryFee - couponDiscount;

  // Function to update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Function to remove item from cart
  const removeItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Function to apply coupon code
  const applyCoupon = () => {
    // Simple coupon logic for demonstration
    if (couponCode.toLowerCase() === 'save10') {
      setDiscount(subtotal * 0.1);
      setCouponApplied(true);
    } else if (couponCode.toLowerCase() === 'free50') {
      setDiscount(50);
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code');
      setCouponApplied(false);
      setDiscount(0);
    }
  };

  // Function to clear coupon
  const clearCoupon = () => {
    setCouponCode('');
    setCouponApplied(false);
    setDiscount(0);
  };

  // Function to handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    alert('Proceeding to payment...');
    // Here you would typically redirect to a payment gateway or checkout page
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-items-section">
          <h2>Shopping Cart ({cartItems.length} items)</h2>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              <p>Your cart is empty</p>
              <a href="/" className="continue-shopping-btn">Continue Shopping</a>
            </div>
          ) : (
            <>
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <div className="item-brand">{item.brand}</div>
                    <div className="item-name">{item.name}</div>
                    <div className="item-weight">{item.weight}</div>
                    <div className="item-price">
                      <span className="discounted-price">₹{item.discountedPrice}</span>
                      <span className="original-price">₹{item.originalPrice}</span>
                      <span className="discount-percent">({item.discount}% OFF)</span>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="cart-coupon">
                <input 
                  type="text" 
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponApplied}
                />
                {couponApplied ? (
                  <button className="clear-coupon-btn" onClick={clearCoupon}>
                    Clear
                  </button>
                ) : (
                  <button className="apply-coupon-btn" onClick={applyCoupon}>
                    Apply
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        
        <div className="cart-summary-section">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee.toFixed(2)}</span>
          </div>
          
          {couponApplied && (
            <div className="summary-row discount">
              <span>Coupon Discount</span>
              <span>-₹{couponDiscount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          
          <div className="payment-methods">
            <h3>Payment Method</h3>
            
            <div className="payment-options">
              <div 
                className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard size={20} />
                <span>Credit/Debit Card</span>
              </div>
              
              <div 
                className={`payment-option ${paymentMethod === 'wallet' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('wallet')}
              >
                <Wallet size={20} />
                <span>Wallet</span>
              </div>
              
              <div 
                className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('cod')}
              >
                <span>Cash on Delivery</span>
              </div>
            </div>
          </div>
          
          <button 
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Proceed to Payment
            <ArrowRight size={16} />
          </button>
          
          <a href="/" className="continue-shopping-link">Continue Shopping</a>
        </div>
      </div>
    </div>
  );
};

// Function to add item to cart (exported for use in other components)
export const addToCart = (product) => {
  // Get current cart from localStorage
  const savedCart = localStorage.getItem('cart');
  const cart = savedCart ? JSON.parse(savedCart) : [];
  
  // Check if product already exists in cart
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex !== -1) {
    // If product exists, increase quantity
    cart[existingItemIndex].quantity += 1;
  } else {
    // If product doesn't exist, add it with quantity 1
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  // Save updated cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Return a success message or the updated cart
  return cart;
};

export default Cart;