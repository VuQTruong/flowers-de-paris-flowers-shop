import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

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
        (item) => item.product._id !== productId
      );

      // ?send a request to update the cart
      if (userInfo) {
        const cartInfo = modifiedCartItems.map((item) => {
          return {
            product: item.product._id,
            quantity: item.quantity,
          };
        });

        await Axios.patch('/cart', { items: cartInfo });
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
