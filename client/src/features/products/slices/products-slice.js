import { createSlice } from '@reduxjs/toolkit';

import { fetchProducts } from '../fetch-products';
import { getProductsByCategorySlug } from '../get-products-by-category-slug';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: null,
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: {
    /* get all products */
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

    /* get products by category */
    [getProductsByCategorySlug.pending]: (state) => {
      state.loading = true;
      state.error = '';
      state.products = null;
    },
    [getProductsByCategorySlug.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [getProductsByCategorySlug.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default productsSlice.reducer;
