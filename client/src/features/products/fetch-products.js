import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get('/products');

      return data.data.products;
    } catch (error) {
      return rejectWithValue(error.repsonse.data);
    }
  }
);
