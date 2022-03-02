import { createSlice } from '@reduxjs/toolkit';
import { addItemToCart } from '../add-item';
import { emptyCart } from '../empty-cart';
import { getCart } from '../get-cart';
import { removeItemFromCart } from '../remove-item';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [],
    loading: false,
    error: '',
  },
  reducers: {
    clearCartStore: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cart');
    },
  },
  extraReducers: {
    [getCart.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [getCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;

      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    [getCart.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },

    // !add item to cart
    [addItemToCart.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [addItemToCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;

      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    [addItemToCart.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },

    // !remove item from cart
    [removeItemFromCart.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [removeItemFromCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;

      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    [removeItemFromCart.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },

    // !empty cart
    [emptyCart.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [emptyCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;

      localStorage.removeItem('cart');
    },
    [emptyCart.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
  },
});

export const { clearCartStore } = cartSlice.actions;
export default cartSlice.reducer;
