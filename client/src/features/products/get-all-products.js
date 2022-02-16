import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async (queryStr = '', { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(
        `/products${queryStr ? '?' + queryStr : ''}`
      );

      return data.data;
    } catch (error) {
      return rejectWithValue(error.repsonse.data);
    }
  }
);
