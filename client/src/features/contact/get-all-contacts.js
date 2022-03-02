import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const getAllContacts = createAsyncThunk(
  'contacts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get('/contacts');

      return data.data.contacts;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
