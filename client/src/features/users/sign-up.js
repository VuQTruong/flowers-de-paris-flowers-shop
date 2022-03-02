import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const signUp = createAsyncThunk(
  'currentUser/signUp',
  async (signUpValues, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post('/auth/signup', signUpValues);

      return data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
