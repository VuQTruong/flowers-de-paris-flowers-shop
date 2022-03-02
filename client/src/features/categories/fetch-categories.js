import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const fetchCategories = createAsyncThunk(
  'categories/getAll',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await Axios.get('/categories');

      return data.data.categories;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
