import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {},
});

export default productsSlice.reducer;
