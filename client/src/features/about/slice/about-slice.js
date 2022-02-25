import { createSlice } from '@reduxjs/toolkit';
import { getAbout } from '../get-about';
import { createAbout } from '../create-about';
import { updateAbout } from '../update-about';

const aboutSlice = createSlice({
  name: 'about',
  initialState: {
    aboutInfo: null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    /* fetch about */
    [getAbout.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [getAbout.fulfilled]: (state, action) => {
      state.loading = false;
      state.aboutInfo = action.payload;
    },
    [getAbout.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* create about */
    [createAbout.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [createAbout.fulfilled]: (state, action) => {
      state.loading = false;
      state.aboutInfo = action.payload;
    },
    [createAbout.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* update about */
    [updateAbout.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [updateAbout.fulfilled]: (state, action) => {
      state.loading = false;
      state.aboutInfo = action.payload;
    },
    [updateAbout.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default aboutSlice.reducer;
