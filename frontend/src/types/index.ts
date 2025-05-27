export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductsState {
  items: Product[];
  categories: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface FavoritesState {
  items: Product[];
}

export interface FiltersState {
  searchTerm: string;
  selectedCategory: string;
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'rating-desc';
}

export interface ThemeState {
  mode: 'light' | 'dark';
}