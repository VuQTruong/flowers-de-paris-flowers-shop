import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const getAbout = createAsyncThunk(
  'about/getAbout',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get('/about');

      return data.data.about;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
