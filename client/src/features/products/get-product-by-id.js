import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const getProductById = createAsyncThunk(
  'currentProduct/getById',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`/products/${productId}`);

      return data.data.product;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);
