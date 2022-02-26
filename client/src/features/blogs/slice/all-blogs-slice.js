import { createSlice } from '@reduxjs/toolkit';
import { adGetAllBlogs } from '../ad-get-all-blogs';

const allBlogsSlice = createSlice({
  name: 'allBlogs',
  initialState: {
    blogs: null,
    totalBlogs: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    /* get all blogs */
    [adGetAllBlogs.pending]: (state) => {
      state.loading = true;
      state.error = '';
      state.blogs = null;
      state.totalBlogs = 0;
      state.totalPages = 0;
      state.currentPage = 1;
    },
    [adGetAllBlogs.fulfilled]: (state, action) => {
      state.loading = false;
      state.blogs = action.payload.blogs;
      state.totalBlogs = action.payload.totalBlogs;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    },
    [adGetAllBlogs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default allBlogsSlice.reducer;
