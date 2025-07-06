import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logintr.css';

function Logintr() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Handle login logic here (e.g., validation or authentication)
    navigate('/trpage'); // Navigate to TrPage after form submission
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" className="login-input" required />
        <input type="email" placeholder="Email" className="login-input" required />
        <input type="password" placeholder="Password" className="login-input" required />
        <button type="submit" className="login-button">Submit</button>
      </form>
    </div>
  );
}

export default Logintr;
