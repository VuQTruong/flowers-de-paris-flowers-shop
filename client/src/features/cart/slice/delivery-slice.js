import { createSlice } from '@reduxjs/toolkit';

export const deliverySlice = createSlice({
  name: 'delivery',
  initialState: {
    deliveryInfo: sessionStorage.getItem('deliveryInfo')
      ? JSON.parse(sessionStorage.getItem('deliveryInfo'))
      : null,
  },
  reducers: {
    saveDeliveryInfo: (state, action) => {
      state.deliveryInfo = action.payload.deliveryInfo;

      sessionStorage.setItem(
        'deliveryInfo',
        JSON.stringify(action.payload.deliveryInfo)
      );
    },
  },
  extraReducers: {},
});

export const { saveDeliveryInfo } = deliverySlice.actions;
export default deliverySlice.reducer;
