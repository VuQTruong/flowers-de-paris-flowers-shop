import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const updateAvatar = createAsyncThunk(
  'currentUser/updateAvatar',
  async (avatarUrl, { rejectWithValue }) => {
    try {
      const { data } = await Axios.patch('/users/avatar', {
        avatar: avatarUrl,
      });

      return data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
