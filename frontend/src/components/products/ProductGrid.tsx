import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types';
import './ProductGrid.css';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
  if (loading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="no-results">
        <h3>No products found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const ProductGridSkeleton: React.FC = () => {
  // Generate 8 skeleton cards
  return (
    <div className="product-grid">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="product-card-skeleton">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-title-short"></div>
            <div className="skeleton-details">
              <div className="skeleton-rating"></div>
              <div className="skeleton-price"></div>
            </div>
          </div>
          <div className="skeleton-button"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;