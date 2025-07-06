import React from 'react';
import CustomNavbars from '../../Components/CustomNavbars';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './MPage.css';

const MPage=()=> {
const navigate = useNavigate(); // Initialize useNavigate
  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">SecureX</div>
        <div className="nav-links">
          <a href="#blog">Blog</a>
          <a href="#product">Product</a>
          <a href="#community">Community</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact Us</a>
        </div>
      </nav>

      {/* Proctoring Section */}
      <section className="proctoring-section">
        <h1>Advanced & Automated Proctoring Solution</h1>
        <p>A simple solution to ensure a fair, secure online proctoring environment for exams.</p>
        <div className="buttons">
          <button className="create-test-btn" onClick={() => navigate('/logintr')}>Teacher</button>
          <button className="join-btn" onClick={() => navigate('/login')}>Student</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Powerful | Lightweight</h2>
        <h1 style={{fontWeight:'bolder'}}>Features</h1>
        <br></br>
        <div className="features">
          <div>Face Verification</div>
          <div>Multiple People Detection</div>
          <div>Voice Detection</div>
          <div>Full Screen Check</div>
          <div>Multiple Tab Check</div>
          <div>Face Cover Check</div>
        </div>
        <button className="get-started-btn">Get Started</button>
      </section>

      {/* Integration Section */}
      {/* <section className="integration-section">
        <div className="integration-text">
          <p>Effortlessly integrates with</p>
          <p className="integration-logos">Google Forms or Microsoft Surveys</p>
        </div>
        <div className="live-status">
          <p>Live Status on Admin Dashboard</p>
          <p className="live-status-text">All results in real-time</p>
        </div>
      </section> */}
    </div>
  );
}

export default MPage;
