import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const signIn = createAsyncThunk(
  'currentUser/signin',
  async (signInInfo, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post('/auth/signin', signInInfo);

      return data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
