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
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    /* get all products */
    [getAllProducts.pending]: (state) => {
      state.loading = true;
      state.error = '';
      state.products = null;
      state.totalProducts = 0;
      state.totalPages = 0;
      state.currentPage = 1;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
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
