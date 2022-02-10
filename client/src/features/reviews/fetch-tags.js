import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const fetchTags = createAsyncThunk(
  'commentTags/fetchTags',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get('/reviews/tags');

      return data.data.tags;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
