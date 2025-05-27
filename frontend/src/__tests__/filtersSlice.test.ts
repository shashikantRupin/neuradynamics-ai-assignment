import { describe, it, expect } from 'vitest';
import filtersReducer, { 
  setSearchTerm, 
  setSelectedCategory, 
  setSortBy,
  resetFilters
} from '../store/slices/filtersSlice';

describe('Filters Slice', () => {
  it('should handle initial state', () => {
    const initialState = filtersReducer(undefined, { type: 'unknown' });
    expect(initialState.searchTerm).toBe('');
    expect(initialState.selectedCategory).toBe('');
    expect(initialState.sortBy).toBe('default');
  });

  it('should handle setSearchTerm', () => {
    const action = setSearchTerm('test search');
    const state = filtersReducer(
      { searchTerm: '', selectedCategory: '', sortBy: 'default' },
      action
    );
    expect(state.searchTerm).toBe('test search');
  });

  it('should handle setSelectedCategory', () => {
    const action = setSelectedCategory('electronics');
    const state = filtersReducer(
      { searchTerm: '', selectedCategory: '', sortBy: 'default' },
      action
    );
    expect(state.selectedCategory).toBe('electronics');
  });

  it('should handle setSortBy', () => {
    const action = setSortBy('price-asc');
    const state = filtersReducer(
      { searchTerm: '', selectedCategory: '', sortBy: 'default' },
      action
    );
    expect(state.sortBy).toBe('price-asc');
  });

  it('should handle resetFilters', () => {
    const action = resetFilters();
    const state = filtersReducer(
      { searchTerm: 'test', selectedCategory: 'electronics', sortBy: 'price-desc' },
      action
    );
    expect(state.searchTerm).toBe('');
    expect(state.selectedCategory).toBe('');
    expect(state.sortBy).toBe('default');
  });
});