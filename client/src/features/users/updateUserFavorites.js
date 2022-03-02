import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const updateUserFavorites = createAsyncThunk(
  'currentUser/updateFavorites',
  async (favorites, { rejectWithValue }) => {
    try {
      const { data } = await Axios.patch('/users/favorites', {
        favorites,
      });

      return data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
