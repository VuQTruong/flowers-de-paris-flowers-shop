import { createSlice } from '@reduxjs/toolkit';
import { adGetArticle } from '../ad-get-article';
import { getArticle } from '../get-article';

const currentArticleSlice = createSlice({
  name: 'article',
  initialState: {
    article: null,
    loading: false,
    error: '',
  },
  reducers: {
    resetCurrentArticle: (state) => {
      state.article = null;
      state.loading = false;
      state.error = '';
    },
  },
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

    /* admin get article */
    [adGetArticle.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [adGetArticle.fulfilled]: (state, action) => {
      state.loading = false;
      state.article = action.payload;
    },
    [adGetArticle.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { resetCurrentArticle } = currentArticleSlice.actions;
export default currentArticleSlice.reducer;
