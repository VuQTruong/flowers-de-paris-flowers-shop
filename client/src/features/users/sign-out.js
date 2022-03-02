import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const signOut = createAsyncThunk(
  'currentUser/signout',
  async (_, { rejectWithValue }) => {
    try {
      await Axios.get('/auth/signout');

      return null;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
