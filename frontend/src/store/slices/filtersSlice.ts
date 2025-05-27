import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FiltersState } from '../../types';

const initialState: FiltersState = {
  searchTerm: '',
  selectedCategory: '',
  sortBy: 'default',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action: PayloadAction<FiltersState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = '';
      state.selectedCategory = '';
      state.sortBy = 'default';
    },
  },
});

export const { 
  setSearchTerm, 
  setSelectedCategory, 
  setSortBy,
  resetFilters 
} = filtersSlice.actions;

export default filtersSlice.reducer;