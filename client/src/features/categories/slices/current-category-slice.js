import { createSlice } from '@reduxjs/toolkit';
import { getCategory } from '../get-category';

const currentCategorySlice = createSlice({
  name: 'currentCategory',
  initialState: {
    category: null,
    loading: false,
    error: '',
  },
  reducers: {
    resetCurrentCategory: (state) => {
      state.category = null;
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: {
    [getCategory.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [getCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.category = action.payload;
    },
    [getCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { resetCurrentCategory } = currentCategorySlice.actions;
export default currentCategorySlice.reducer;
