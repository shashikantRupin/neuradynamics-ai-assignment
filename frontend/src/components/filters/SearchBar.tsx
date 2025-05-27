import React, { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSearchTerm } from '../../store/slices/filtersSlice';
import './SearchBar.css';

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchTermFromStore = useAppSelector(state => state.filters.searchTerm);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTermFromStore);
  
  // Debounce function
  const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };
  
  // Debounced dispatch
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedDispatch = useCallback(
    debounce((value: string) => {
      dispatch(setSearchTerm(value));
    }, 300),
    [dispatch]
  );
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    debouncedDispatch(value);
  };
  
  // Clear search
  const handleClearSearch = () => {
    setLocalSearchTerm('');
    dispatch(setSearchTerm(''));
  };
  
  // Sync local state with Redux store if changed externally
  useEffect(() => {
    if (searchTermFromStore !== localSearchTerm) {
      setLocalSearchTerm(searchTermFromStore);
    }
  }, [searchTermFromStore]);
  
  return (
    <div className="search-bar">
      <div className="search-icon">
        <Search size={18} />
      </div>
      <input
        type="text"
        placeholder="Search products..."
        value={localSearchTerm}
        onChange={handleInputChange}
        className="search-input"
      />
      {localSearchTerm && (
        <button 
          className="clear-button"
          onClick={handleClearSearch}
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;