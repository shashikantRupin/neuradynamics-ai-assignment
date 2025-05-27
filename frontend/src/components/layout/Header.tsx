import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Sun, Moon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleTheme } from '../../store/slices/themeSlice';
import './Header.css';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const theme = useAppSelector(state => state.theme.mode);
  const favorites = useAppSelector(state => state.favorites.items);
  
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };
  
  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <ShoppingBag size={24} />
          <span>StoreFront</span>
        </Link>
        
        <nav className="nav">
          <ul className="nav-list">
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/">Products</Link>
            </li>
            <li className={location.pathname === '/favorites' ? 'active' : ''}>
              <Link to="/favorites" className="favorites-link">
                <Heart size={20} />
                <span>Favorites</span>
                {favorites.length > 0 && (
                  <span className="favorites-count">{favorites.length}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
        
        <button 
          className="theme-toggle" 
          onClick={handleThemeToggle}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;