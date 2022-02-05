import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const signIn = createAsyncThunk(
  'currentUser/signin',
  async (signInInfo, { rejectWithValue }) => {
    try {
      console.log(signInInfo);
      const { data } = await Axios.post('/auth/signin', signInInfo);

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
    [signIn.pending]: (state) => {
      state.loading = true;
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
  },
});

export default currentUserSlice.reducer;
