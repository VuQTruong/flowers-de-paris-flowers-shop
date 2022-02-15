import { createSlice } from '@reduxjs/toolkit';

import { getAllProducts } from '../get-all-products';
import { getProductsByCategorySlug } from '../get-products-by-category-slug';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: null,
    totalProducts: 0,
    totalPages: 0,
    currentPage: 1,
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: {
    /* get all products */
    [getAllProducts.pending]: (state) => {
      state.loading = true;
      state.error = '';
      state.products = null;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [getAllProducts.rejected]: (state, action) => {
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
