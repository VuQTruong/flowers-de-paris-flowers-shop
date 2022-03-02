import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const updateAbout = createAsyncThunk(
  'about/updateAbout',
  async (aboutInfo, { rejectWithValue }) => {
    try {
      const { data } = await Axios.patch(`/about/${aboutInfo.id}`, {
        content: aboutInfo.content,
      });

      return data.data.about;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
