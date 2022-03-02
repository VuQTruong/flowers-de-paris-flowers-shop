import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';
import { sortByOrder } from '../../utilities/helpers';

export const fetchLayoutInfo = createAsyncThunk(
  'config/layout',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get('/config/layout');
      let layout = data.data.layout;
      layout = layout.sort(sortByOrder);

      return layout;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
