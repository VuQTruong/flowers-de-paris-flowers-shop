import { createSlice } from '@reduxjs/toolkit';

export const deliverySlice = createSlice({
  name: 'delivery',
  initialState: {
    deliveryInfo: null,
  },
  reducers: {
    saveDeliveryInfo: (state, action) => {
      state.deliveryInfo = action.payload.deliveryInfo;
    },
  },
  extraReducers: {},
});

export const { saveDeliveryInfo } = deliverySlice.actions;
export default deliverySlice.reducer;
