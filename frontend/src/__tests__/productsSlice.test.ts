import { describe, it, expect, vi } from 'vitest';
import productsReducer, { 
  fetchProducts, 
  fetchCategories 
} from '../store/slices/productsSlice';

// Mock data
const mockProducts = [
  {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test description',
    category: 'test category',
    image: 'test-image.jpg',
    rating: { rate: 4.5, count: 100 }
  }
];

const mockCategories = ['category1', 'category2'];

// Mock fetch function
global.fetch = vi.fn();

describe('Products Slice', () => {
  it('should handle initial state', () => {
    const initialState = productsReducer(undefined, { type: 'unknown' });
    expect(initialState.items).toEqual([]);
    expect(initialState.categories).toEqual([]);
    expect(initialState.status).toBe('idle');
    expect(initialState.error).toBe(null);
  });

  it('should handle fetchProducts.pending', () => {
    const action = { type: fetchProducts.pending.type };
    const state = productsReducer(
      { items: [], categories: [], status: 'idle', error: null },
      action
    );
    expect(state.status).toBe('loading');
  });

  it('should handle fetchProducts.fulfilled', () => {
    const action = {
      type: fetchProducts.fulfilled.type,
      payload: mockProducts
    };
    const state = productsReducer(
      { items: [], categories: [], status: 'loading', error: null },
      action
    );
    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual(mockProducts);
  });

  it('should handle fetchProducts.rejected', () => {
    const action = {
      type: fetchProducts.rejected.type,
      error: { message: 'Failed to fetch' }
    };
    const state = productsReducer(
      { items: [], categories: [], status: 'loading', error: null },
      action
    );
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Failed to fetch');
  });

  it('should handle fetchCategories.fulfilled', () => {
    const action = {
      type: fetchCategories.fulfilled.type,
      payload: mockCategories
    };
    const state = productsReducer(
      { items: [], categories: [], status: 'idle', error: null },
      action
    );
    expect(state.categories).toEqual(mockCategories);
  });
});