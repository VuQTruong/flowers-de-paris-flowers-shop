import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const getCategory = createAsyncThunk(
  'currentCategory/get',
  async (categoryId, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`/categories/${categoryId}`);

      return data.data.category;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
