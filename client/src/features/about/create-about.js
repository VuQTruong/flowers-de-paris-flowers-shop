import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const createAbout = createAsyncThunk(
  'about/createAbout',
  async (aboutContent, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post('/about', {
        content: aboutContent,
      });

      return data.data.about;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
