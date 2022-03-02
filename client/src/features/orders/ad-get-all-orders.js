import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const adGetAllOrders = createAsyncThunk(
  'orders/adGetAll',
  async (queryStr = '', { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(
        `/orders/ad/all${queryStr ? '?' + queryStr : ''}`
      );

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
