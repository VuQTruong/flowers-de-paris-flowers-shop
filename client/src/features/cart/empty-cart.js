import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const emptyCart = createAsyncThunk(
  'cart/emptyCart',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.delete('/carts');

      return data.data.cart.items;
    } catch (error) {
      if (error.response) {
        rejectWithValue(error.response.data);
      } else {
        rejectWithValue(error);
      }
    }
  }
);
