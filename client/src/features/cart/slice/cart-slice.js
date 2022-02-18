import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {},
});

export default cartSlice.reducer;
