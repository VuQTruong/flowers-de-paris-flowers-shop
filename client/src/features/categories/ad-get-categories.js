import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const adGetCategories = createAsyncThunk(
  'categories/adGetAll',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await Axios.get('/categories/admin');

      return data.data.categories;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
