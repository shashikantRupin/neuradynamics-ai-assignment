import { describe, it, expect, vi, beforeEach } from 'vitest';
import favoritesReducer, { 
  addToFavorites, 
  removeFromFavorites 
} from '../store/slices/favoritesSlice';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Favorites Slice', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test description',
    category: 'test category',
    image: 'test-image.jpg',
    rating: { rate: 4.5, count: 100 }
  };

  beforeEach(() => {
    localStorageMock.clear();
  });

  it('should handle initial state', () => {
    const initialState = favoritesReducer(undefined, { type: 'unknown' });
    expect(initialState.items).toEqual([]);
  });

  it('should handle addToFavorites', () => {
    const action = addToFavorites(mockProduct);
    const state = favoritesReducer({ items: [] }, action);
    expect(state.items).toEqual([mockProduct]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'favorites', 
      JSON.stringify([mockProduct])
    );
  });

  it('should not add duplicate product to favorites', () => {
    const initialState = { items: [mockProduct] };
    const action = addToFavorites(mockProduct);
    const state = favoritesReducer(initialState, action);
    expect(state.items).toEqual([mockProduct]); // Still just one item
  });

  it('should handle removeFromFavorites', () => {
    const initialState = { items: [mockProduct] };
    const action = removeFromFavorites(mockProduct.id);
    const state = favoritesReducer(initialState, action);
    expect(state.items).toEqual([]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'favorites', 
      JSON.stringify([])
    );
  });
});