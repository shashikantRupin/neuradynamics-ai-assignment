import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { removeFromFavorites } from '../store/slices/favoritesSlice';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import './FavoritesPage.css';

const FavoritesPage: React.FC = () => {
  const favorites = useAppSelector(state => state.favorites.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleRemoveFavorite = (id: number) => {
    dispatch(removeFromFavorites(id));
  };
  
  const handleViewProduct = (id: number) => {
    navigate(`/product/${id}`);
  };
  
  const handleGoToProducts = () => {
    navigate('/');
  };
  
  // Empty state
  if (favorites.length === 0) {
    return (
      <div className="container">
        <div className="favorites-empty">
          <Heart size={64} />
          <h2>Your favorites list is empty</h2>
          <p>Start adding products you love to your favorites list.</p>
          <button 
            onClick={handleGoToProducts}
            className="browse-button"
          >
            <ShoppingBag size={18} />
            <span>Browse Products</span>
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container favorites-page">
      <header className="favorites-header">
        <h1>My Favorites</h1>
        <p className="favorites-subtitle">
          Your collection of {favorites.length} favorite products
        </p>
      </header>
      
      <div className="favorites-list">
        {favorites.map(product => (
          <div key={product.id} className="favorite-item">
            <div className="favorite-image-container">
              <img 
                src={product.image} 
                alt={product.title} 
                className="favorite-image" 
              />
            </div>
            
            <div className="favorite-details">
              <h3 className="favorite-title">{product.title}</h3>
              
              <div className="favorite-meta">
                <span className="favorite-price">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(product.price)}
                </span>
                <span className="favorite-category">{product.category}</span>
              </div>
              
              <p className="favorite-description">{product.description}</p>
            </div>
            
            <div className="favorite-actions">
              <button 
                onClick={() => handleViewProduct(product.id)}
                className="view-detail-button"
              >
                View Details
              </button>
              <button 
                onClick={() => handleRemoveFavorite(product.id)}
                className="remove-favorite-button"
                aria-label="Remove from favorites"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;