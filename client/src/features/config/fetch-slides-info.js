import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';
import { sortByOrder } from '../../utilities/helpers';

export const fetchSlidesInfo = createAsyncThunk(
  'config/slides',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get('/config/slides');
      let slides = data.data.slides;
      slides = slides.sort(sortByOrder);

      return slides;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
