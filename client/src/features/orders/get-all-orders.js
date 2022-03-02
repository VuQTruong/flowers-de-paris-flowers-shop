import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const getAllOrders = createAsyncThunk(
  'orders/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get('/orders/all');

      return data.data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
