import { createSlice } from '@reduxjs/toolkit';
import { addItemToCart } from '../add-item';
import { getCart } from '../get-cart';
import { removeItemFromCart } from '../remove-item';

// cart item
// {
//   productId:
//   quantity:
//   price:
//   total:
// }

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    // [getCart.pending]: (state, action) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [getCart.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.cartItems = [...state.cartItems, ...action.payload.items];

    //   localStorage.setItem('cart', JSON.stringify(state.cartItems));
    // },
    // [getCart.rejected]: (state, action) => {
    //   state.loading = true;
    //   state.error = action.payload;
    // },

    // !add item to cart
    [addItemToCart.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
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
      state.error = null;
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
  },
});

export default cartSlice.reducer;
