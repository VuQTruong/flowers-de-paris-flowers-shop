import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const getArticle = createAsyncThunk(
  'currentArticle/get',
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`/blogs/slug/${slug}`);

      return data.data.article;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
