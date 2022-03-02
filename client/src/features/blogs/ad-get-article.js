import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const adGetArticle = createAsyncThunk(
  'currentArticle/adGet',
  async (articleId, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`/blogs/admin/${articleId}`);

      return data.data.article;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
