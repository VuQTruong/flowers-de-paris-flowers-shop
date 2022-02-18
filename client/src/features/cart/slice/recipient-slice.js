import { createSlice } from '@reduxjs/toolkit';

export const recipientSlice = createSlice({
  name: 'recipient',
  initialState: {
    recipientInfo: null,
  },
  reducers: {},
  extraReducers: {},
});

export default recipientSlice.reducer;
