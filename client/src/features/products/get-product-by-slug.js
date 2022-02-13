import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const getProductBySlug = createAsyncThunk(
  'currentProduct/getBySlug',
  async (productSlug, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`/products/slug/${productSlug}`);

      return data.data.product;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
