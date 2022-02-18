import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get('/cart');

      return data.data.cart;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
