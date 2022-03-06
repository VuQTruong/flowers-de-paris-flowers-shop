import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const getCategoryBySlug = createAsyncThunk(
  'currentCategory/getBySlug',
  async (categorySlug, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`/categories/slug/${categorySlug}`);

      return data.data.category;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
