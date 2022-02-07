import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const updateUserInfo = createAsyncThunk(
  'currentUser',
  async (updateInfo, { rejectWithValue }) => {
    try {
      const { data } = await Axios.patch('/users', updateInfo);

      return data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
