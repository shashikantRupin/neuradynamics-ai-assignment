import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-container">
        <p>© {currentYear} StoreFront. All rights reserved.</p>
        <p className="footer-note">Frontend Developer Hiring Assignment</p>
      </div>
    </footer>
  );
};

export default Footer;