import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { 
  setSelectedCategory, 
  setSortBy, 
  resetFilters 
} from '../../store/slices/filtersSlice';
import { SlidersHorizontal, RefreshCw } from 'lucide-react';
import './FilterBar.css';

const FilterBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedCategory, sortBy } = useAppSelector(state => state.filters);
  const categories = useAppSelector(state => state.products.categories);
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedCategory(e.target.value));
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value as any));
  };
  
  const handleResetFilters = () => {
    dispatch(resetFilters());
  };
  
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <SlidersHorizontal size={18} className="filter-icon" />
        <label htmlFor="category-select" className="filter-label">Category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="sort-select" className="filter-label">Sort by:</label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={handleSortChange}
          className="filter-select"
        >
          <option value="default">Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Highest Rated</option>
        </select>
      </div>
      
      <button 
        className="reset-button"
        onClick={handleResetFilters}
        aria-label="Reset filters"
      >
        <RefreshCw size={16} />
        <span>Reset</span>
      </button>
    </div>
  );
};

export default FilterBar;