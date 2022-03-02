import { createSlice } from '@reduxjs/toolkit';
import { getContact } from '../get-contact';

const currentContactSlice = createSlice({
  name: 'currentContact',
  initialState: {
    contact: null,
    loading: false,
    error: '',
  },
  reducers: {
    resetCurrentContact: (state) => {
      state.contact = null;
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: {
    /* fetch contact */
    [getContact.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [getContact.fulfilled]: (state, action) => {
      state.loading = false;
      state.contact = action.payload;
    },
    [getContact.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { resetCurrentContact } = currentContactSlice.actions;
export default currentContactSlice.reducer;
