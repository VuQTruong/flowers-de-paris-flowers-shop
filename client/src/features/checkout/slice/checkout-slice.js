import { createSlice } from '@reduxjs/toolkit';

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    checkoutInfo: sessionStorage.getItem('checkoutInfo')
      ? {
          ...JSON.parse(sessionStorage.getItem('checkoutInfo')),
          isAnonymous: true,
          sender: 'Anonymous',
        }
      : {
          isAnonymous: true,
          sender: 'Anonymous',
        },
  },
  reducers: {
    clearCheckoutInfo: (state) => {
      state.checkoutInfo = {};
      sessionStorage.removeItem('checkoutInfo');
    },
    updateCheckoutInfo: (state, action) => {
      state.checkoutInfo = { ...state.checkoutInfo, ...action.payload };

      sessionStorage.setItem(
        'checkoutInfo',
        JSON.stringify(state.checkoutInfo)
      );
    },
  },
});

export const { clearCheckoutInfo, updateCheckoutInfo } = checkoutSlice.actions;
export default checkoutSlice.reducer;
