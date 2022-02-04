import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    userInfo: null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {},
});

export default currentUserSlice.reducer;
