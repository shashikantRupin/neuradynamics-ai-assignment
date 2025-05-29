import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addToFavorites, removeFromFavorites } from '../../store/slices/favoritesSlice';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.items);
  const isFavorite = favorites.some(item => item.id === product.id);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to detail page
    
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };
  
  // Format price to have 2 decimal places
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <div  className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.title} 
          className="product-image" 
          loading="lazy" 
        />
        <div className="product-actions-card">
          <button 
            className={`favorite-button ${isFavorite ? 'favorite-active-btn' : ''}`}
            onClick={toggleFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={25} />
          </button>
        </div>
        <div className="product-category">{product.category}</div>
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        
        <div className="product-details">
          <div className="product-rating">
            <Star size={16} fill="#f59e0b" stroke="#f59e0b" />
            <span>{product.rating.rate.toFixed(1)}</span>
            <span className="product-rating-count">({product.rating.count})</span>
          </div>
          
          <div className="product-price">{formattedPrice}</div>
        </div>
      </div>
      
      <Link to={`/product/${product.id}`} className="product-card-footer">
        <button className="view-button">
          <ShoppingCart size={16} />
          <span>View Product</span>
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;