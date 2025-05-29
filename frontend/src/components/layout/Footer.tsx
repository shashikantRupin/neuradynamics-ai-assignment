import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-about">
          <h4>About This App</h4>
          <p>
            StoreFront is a modern product dashboard built using React and Redux Toolkit.
            Explore, search, filter, and favorite products with ease.
          </p>
        </div>
        <p className="footer-note">Frontend Developer Hiring Assignment</p>
      </div>
    </footer>
  );
};

export default Footer;
