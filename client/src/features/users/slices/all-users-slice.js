import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from '../get-all-users';

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: {
    users: null,
    totalUsers: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.loading = true;
      state.error = '';
      state.users = null;
      state.totalUsers = 0;
      state.totalPages = 0;
      state.currentPage = 1;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.totalUsers = action.payload.totalUsers;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default allUsersSlice.reducer;
