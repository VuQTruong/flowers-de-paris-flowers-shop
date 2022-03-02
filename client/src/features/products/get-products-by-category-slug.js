import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const getProductsByCategorySlug = createAsyncThunk(
  'products/getByCategory',
  async (categorySlug, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`/products/category/${categorySlug}`);

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
