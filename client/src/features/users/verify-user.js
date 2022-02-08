import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const verifyUser = createAsyncThunk(
  'currentUser/verify',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get('/auth/verify');

      if (data.data) {
        return data.data.user;
      }

      return rejectWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
