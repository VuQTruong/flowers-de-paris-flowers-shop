import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const adGetAllBlogs = createAsyncThunk(
  'allBlogs/adGetAll',
  async (queryStr = '', { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(
        `/blogs/admin${queryStr ? '?' + queryStr : ''}`
      );

      return data.data;
    } catch (error) {
      return rejectWithValue(error.repsonse.data.message);
    }
  }
);
