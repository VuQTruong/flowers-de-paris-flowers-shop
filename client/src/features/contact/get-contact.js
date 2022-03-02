import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const getContact = createAsyncThunk(
  'currentContact/getContact',
  async (contactId, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`/contacts/${contactId}`);

      return data.data.contact;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
