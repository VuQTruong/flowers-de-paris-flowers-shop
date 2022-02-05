import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const signIn = createAsyncThunk(
  'currentUser/signin',
  async (signInInfo, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post('/auth/signin', signInInfo);

      return data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  'currentUser/signUp',
  async (signUpValues, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post('/auth/signup', signUpValues);

      return data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signOut = createAsyncThunk(
  'currentUser/signout',
  async (_, { rejectWithValue }) => {
    try {
      await Axios.get('/auth/signout');

      return null;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyUser = createAsyncThunk(
  'currentUser/verify',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get('/auth/verify');

      return data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    userInfo: null,
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
    },
    [signOut.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* verify user */
    [verifyUser.pending]: (state) => {
      state.loading = true;
      state.userInfo = null;
      state.error = '';
    },
    [verifyUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [verifyUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default currentUserSlice.reducer;
