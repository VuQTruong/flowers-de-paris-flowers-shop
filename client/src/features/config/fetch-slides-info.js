import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

const sortByOrder = (a, b) => {
  if (a.order < b.order) {
    return -1;
  }

  if (a.order > b.order) {
    return 1;
  }

  return 0;
};

export const fetchSlidesInfo = createAsyncThunk(
  'config/slides',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get('/config/slides');
      let slides = data.data.slides;
      slides = slides.sort(sortByOrder);

      return slides;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
