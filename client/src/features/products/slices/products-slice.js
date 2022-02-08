import { createSlice } from '@reduxjs/toolkit';

import { fetchProducts } from '../fetch-products';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = true;
      state.error = '';
      state.products = null;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default productsSlice.reducer;
