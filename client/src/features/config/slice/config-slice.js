import { createSlice } from '@reduxjs/toolkit';
import { fetchLayoutInfo } from '../fetch-layout-info';
import { fetchSlidesInfo } from '../fetch-slides-info';

export const configSlice = createSlice({
  name: 'config',
  initialState: {
    slides: [],
    layout: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    /* fetch slides info */
    [fetchSlidesInfo.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchSlidesInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.slides = action.payload;
    },
    [fetchSlidesInfo.pending]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* fetch layout info */
    [fetchLayoutInfo.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchLayoutInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.layout = action.payload;
    },
    [fetchLayoutInfo.pending]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default configSlice.reducer;
