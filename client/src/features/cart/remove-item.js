import { createAsyncThunk } from '@reduxjs/toolkit';

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItem',
  async (payload, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const { userInfo } = state.currentUser;
      const { cartItems } = state.cart;
      const productId = payload;

      // ?remove item from cart
      let modifiedCartItems = [...cartItems];
      modifiedCartItems = modifiedCartItems.filter(
        (item) => item._id !== productId
      );

      // ?send a request to update the cart
      if (userInfo) {
      }

      return modifiedCartItems;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);
