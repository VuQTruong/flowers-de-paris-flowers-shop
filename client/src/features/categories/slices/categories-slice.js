import { createSlice } from '@reduxjs/toolkit';
import { adGetCategories } from '../ad-get-categories';

import { fetchCategories } from '../fetch-categories';

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    /* client get categories */
    [fetchCategories.pending]: (state) => {
      state.loading = true;
      state.error = '';
      state.categories = null;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
    [fetchCategories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* admin get categories */
    [adGetCategories.pending]: (state) => {
      state.loading = true;
      state.error = '';
      state.categories = null;
    },
    [adGetCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
    [adGetCategories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default categoriesSlice.reducer;
