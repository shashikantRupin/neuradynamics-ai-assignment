import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchProducts, fetchCategories } from '../store/slices/productsSlice';
import SearchBar from '../components/filters/SearchBar';
import FilterBar from '../components/filters/FilterBar';
import ProductGrid from '../components/products/ProductGrid';
import './ProductsPage.css';

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: products, status, error } = useAppSelector(state => state.products);
  const { searchTerm, selectedCategory, sortBy } = useAppSelector(state => state.filters);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);
  
  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Apply category filter
      const categoryMatch = selectedCategory 
        ? product.category === selectedCategory 
        : true;
      
      // Apply search filter (case insensitive)
      const searchMatch = searchTerm
        ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      
      return categoryMatch && searchMatch;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating.rate - a.rating.rate;
        default:
          return 0; // Keep original order
      }
    });
  
  // Handle error state
  if (status === 'failed') {
    return (
      <div className="container">
        <div className="error-state">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button 
            onClick={() => dispatch(fetchProducts())}
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container products-page">
      <header className="products-header">
        <h1>All Products</h1>
        <p className="products-subtitle">
          Browse our collection of premium products
        </p>
      </header>
      
      <div className="filter-section">
        <SearchBar />
        <FilterBar />
      </div>
      
      <div className="results-info">
        {status !== 'loading' && (
          <p>
            Showing <span className="results-count">{filteredProducts.length}</span> 
            {' '}products
            {selectedCategory && (
              <> in <span className="category-highlight">{selectedCategory}</span></>
            )}
            {searchTerm && (
              <> matching <span className="search-highlight">"{searchTerm}"</span></>
            )}
          </p>
        )}
      </div>
      
      <ProductGrid 
        products={filteredProducts} 
        loading={status === 'loading'} 
      />
    </div>
  );
};

export default ProductsPage;