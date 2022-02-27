import { createSlice } from '@reduxjs/toolkit';
import { adGetAllOrders } from '../ad-get-all-orders';
import { getAllOrders } from '../get-all-orders';

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: null,
    totalOrders: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    /* get all orders of a user */
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

    /* admin get all orders */
    [adGetAllOrders.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [adGetAllOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
      state.totalOrders = action.payload.totalOrders;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    },
    [adGetAllOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default ordersSlice.reducer;
