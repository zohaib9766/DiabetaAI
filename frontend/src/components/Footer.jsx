import React from 'react';
import { FaDna } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <FaDna className="footer-logo-icon" />
          <span>DiabetaAI</span>
        </div>
        
        <div className="footer-stack">
          Built with React + Flask + Machine Learning
        </div>
        
        <div className="footer-disclaimer">
          <strong>Disclaimer:</strong> This tool is for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </div>
      </div>
      
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} DiabetaAI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
