import { createSlice } from '@reduxjs/toolkit';
import { fetchTags } from '../fetch-tags';

export const commentTagsSlice = createSlice({
  name: 'currentTags',
  initialState: {
    tags: null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [fetchTags.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.loading = true;
      state.tags = action.payload;
    },

    [fetchTags.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
  },
});

export default commentTagsSlice.reducer;
