import { createSlice } from '@reduxjs/toolkit';
import { adGetProductById } from '../ad-get-product-by-id';
import { getProductById } from '../get-product-by-id';
import { getProductBySlug } from '../get-product-by-slug';

export const currentProductSlice = createSlice({
  name: 'currentProduct',
  initialState: {
    product: null,
    loading: false,
    error: '',
  },
  reducers: {
    resetCurrentProduct: (state) => {
      state.product = null;
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: {
    /* get product by product id */
    [getProductById.pending]: (state) => {
      state.loading = true;
      state.error = '';
      state.product = null;
    },
    [getProductById.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [getProductById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* get product by product slug */
    [getProductBySlug.pending]: (state) => {
      state.loading = true;
      state.error = '';
      state.product = null;
    },
    [getProductBySlug.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [getProductBySlug.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* admin get product by product id */
    [adGetProductById.pending]: (state) => {
      state.loading = true;
      state.error = '';
      state.product = null;
    },
    [adGetProductById.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [adGetProductById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { resetCurrentProduct } = currentProductSlice.actions;
export default currentProductSlice.reducer;
