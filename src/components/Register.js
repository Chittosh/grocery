import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Implement registration logic
    console.log('Registration data:', formData);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input 
            type="text" 
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input 
            type="tel" 
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required 
          />
        </div>
        <button type="submit" className="register-button">Register</button>
        <div className="register-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;