import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const getAllBlogs = createAsyncThunk(
  'allBlogs/getAll',
  async (queryStr = '', { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(
        `/blogs${queryStr ? '?' + queryStr : ''}`
      );

      return data.data;
    } catch (error) {
      return rejectWithValue(error.repsonse.data.message);
    }
  }
);
