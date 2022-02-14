import { createSlice } from '@reduxjs/toolkit';
import { fetchSlidesInfo } from '../fetch-slides-info';

export const configSlice = createSlice({
  name: 'config',
  initialState: {
    slides: [],
    layout: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchSlidesInfo.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchSlidesInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.slides = action.payload;
    },
    [fetchSlidesInfo.pending]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default configSlice.reducer;
