import { createSlice } from '@reduxjs/toolkit';
import { getProductById } from '../get-product-by-id';

export const currentProductSlice = createSlice({
  name: 'currentProduct',
  initialState: {
    productId: null,
    product: null,
    loading: true,
    error: '',
  },
  reducers: {
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
  },
  extraReducers: {
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
  },
});

export const { setProductId } = currentProductSlice.actions;
export default currentProductSlice.reducer;
