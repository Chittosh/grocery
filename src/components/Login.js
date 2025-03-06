import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic
    console.log('Login attempt with:', email, password);
  };

  const handleForgotPassword = () => {
    // Redirect to forgot password page or open modal
    navigate('/forgot-password');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login to Your Account</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
          <button 
            type="button" 
            onClick={handleForgotPassword} 
            className="forgot-password-btn"
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;