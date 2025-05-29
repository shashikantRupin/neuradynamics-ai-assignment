import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchProducts } from '../store/slices/productsSlice';
import { addToFavorites, removeFromFavorites } from '../store/slices/favoritesSlice';
import { Heart, ArrowLeft, Star, ShoppingCart, Truck, Shield } from 'lucide-react';
import './ProductDetailPage.css';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const productId = parseInt(id || '0', 10);
  
  const { items: products, status } = useAppSelector(state => state.products);
  const favorites = useAppSelector(state => state.favorites.items);
  
  const [product, setProduct] = useState(products.find(p => p.id === productId));
  const isFavorite = favorites.some(item => item.id === productId);
  
  useEffect(() => {
    if (status === 'idle' || products.length === 0) {
      dispatch(fetchProducts());
    } else if (status === 'succeeded') {
      const foundProduct = products.find(p => p.id === productId);
      setProduct(foundProduct);
    }
  }, [dispatch, productId, products, status]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleToggleFavorite = () => {
    if (product) {
      if (isFavorite) {
        dispatch(removeFromFavorites(product.id));
      } else {
        dispatch(addToFavorites(product));
      }
    }
  };
  
  if (status === 'loading' || !product) {
    return (
      <div className="container">
        <div className="product-detail-skeleton">
          <div className="skeleton-header">
            <div className="skeleton-title"></div>
          </div>
          <div className="skeleton-content">
            <div className="skeleton-image"></div>
            <div className="skeleton-info">
              <div className="skeleton-price"></div>
              <div className="skeleton-description"></div>
              <div className="skeleton-description-short"></div>
              <div className="skeleton-buttons"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container">
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <button onClick={handleGoBack} className="back-button">
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);
  
  return (
    <div className="container product-detail-page">
      <button onClick={handleGoBack} className="back-link">
        <ArrowLeft size={18} />
        <span>Back to Products</span>
      </button>
      
      <div className="product-detail-container">
        <div className="product-image-section">
          <div className="product-category-badge">{product.category}</div>
          <img 
            src={product.image} 
            alt={product.title} 
            className="product-detail-image" 
          />
        </div>
        
        <div className="product-info-section">
          <h1 className="product-detail-title">{product.title}</h1>
          
          <div className="product-meta">
            <div className="product-detail-rating">
              <Star size={18} fill="#f59e0b" stroke="#f59e0b" />
              <span className="rating-value">{product.rating.rate.toFixed(1)}</span>
              <span className="rating-count">({product.rating.count} reviews)</span>
            </div>
            <span className="product-id">Product ID: {product.id}</span>
          </div>
          
          <div className="product-detail-price">{formattedPrice}</div>
          
          <p className="product-detail-description">{product.description}</p>
          
          <div className="product-features">
            <div className="feature-item">
              <Truck size={20} />
              <div className="feature-text">
                <h4>Free Shipping</h4>
                <p>On all orders over $50</p>
              </div>
            </div>
            <div className="feature-item">
              <Shield size={20} />
              <div className="feature-text">
                <h4>2 Year Warranty</h4>
                <p>Full coverage for peace of mind</p>
              </div>
            </div>
          </div>
          
          <div className="product-actions">

            <button 
              className={`favorite-detail-button ${isFavorite ? 'favorite-active' : ''}`}
              onClick={handleToggleFavorite}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={20} />
              <span>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;