import { createSlice } from '@reduxjs/toolkit';
import { getAllContacts } from '../get-all-contacts';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [getAllContacts.pending]: (state) => {
      state.loading = true;
      state.error = '';
      state.contacts = null;
    },
    [getAllContacts.fulfilled]: (state, action) => {
      state.loading = false;
      state.contacts = action.payload;
    },
    [getAllContacts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default contactsSlice.reducer;
