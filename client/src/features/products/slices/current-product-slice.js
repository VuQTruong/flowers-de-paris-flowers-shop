import { createSlice } from '@reduxjs/toolkit';

export const currentProductSlice = createSlice({
  name: 'currentProduct',
  initialState: {
    currentProduct: null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {},
});

export default currentProductSlice.reducer;
