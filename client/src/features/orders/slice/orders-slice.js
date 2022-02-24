import { createSlice } from '@reduxjs/toolkit';
import { getAllOrders } from '../get-all-orders';

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getAllOrders.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    [getAllOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default ordersSlice.reducer;
