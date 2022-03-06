import { createSlice } from '@reduxjs/toolkit';

import { signIn } from '../sign-in';
import { signUp } from '../sign-up';
import { signOut } from '../sign-out';
import { verifyUser } from '../verify-user';
import { updateUserInfo } from '../update-user';
import { updateUserFavorites } from '../updateUserFavorites';
import { updateAvatar } from '../update-avatar';

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    /* user sign in */
    [signIn.pending]: (state) => {
      state.loading = true;
      state.userInfo = null;
      state.error = '';
    },
    [signIn.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;

      // save userInfo to localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    [signIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* user sign up */
    [signUp.pending]: (state) => {
      state.loading = true;
      state.userInfo = null;
      state.error = '';
    },
    [signUp.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;

      // save userInfo to localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    [signUp.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* user sign out */
    [signOut.pending]: (state) => {
      state.loading = true;
      state.userInfo = null;
      state.error = '';
    },
    [signOut.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;

      // remove userInfo from localStorage
      localStorage.removeItem('userInfo');
    },
    [signOut.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* verify user */
    [verifyUser.pending]: (state) => {
      state.loading = true;
      // state.userInfo = null;
      state.error = '';
    },
    [verifyUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;

      // save userInfo to localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    [verifyUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* update user info */
    [updateUserInfo.pending]: (state) => {
      state.loading = true;
      // state.userInfo = null;
      state.error = '';
    },
    [updateUserInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [updateUserInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* update user avatar info */
    [updateAvatar.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [updateAvatar.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [updateAvatar.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* update user's favorites */
    [updateUserFavorites.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [updateUserFavorites.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [updateUserFavorites.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default currentUserSlice.reducer;
