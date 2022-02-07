import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {},
});

export default cartSlice.reducer;
