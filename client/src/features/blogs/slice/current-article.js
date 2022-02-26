import { createSlice } from '@reduxjs/toolkit';
import { getArticle } from '../get-article';

const currentArticle = createSlice({
  name: 'article',
  initialState: {
    article: null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [getArticle.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [getArticle.fulfilled]: (state, action) => {
      state.loading = false;
      state.article = action.payload;
    },
    [getArticle.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default currentArticle.reducer;
