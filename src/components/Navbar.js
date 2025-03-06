import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ShoppingCart } from 'lucide-react'; // Import User icon from lucide-react
import SearchBar from './SearchBar';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (term) => {
    setSearchTerm(term);
    navigate('/search', { state: { searchTerm: term } });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <h2>Small Basket</h2>
          </Link>
        </div>
        
        <SearchBar onSearch={handleSearch} />
        
        <div className="navbar-actions">
          <Link to="/cart" className="cart-icon">
            <ShoppingCart size={20} />
          </Link>
          
          {/* Profile button always visible */}
          <Link to="/profile" className="profile-btn"><User size={20} /></Link>
          
          {isLoggedIn ? (
            <div className="user-actions">
              <Link to="/profile" className="profile-icon">
                <User size={20} />
              </Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <>
              <button onClick={handleLogin} className="login-btn">Login</button>
              <Link to="/register" className="register-btn">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;