import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const addItemToCart = createAsyncThunk(
  'cart/addItem',
  async (payload, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const { userInfo } = state.currentUser;
      const { cartItems } = state.cart;
      const { product, quantity } = payload;

      const addItem = { product, quantity };
      let modifiedCartItems = [...cartItems];

      // ?check if the item is already added
      const itemIndex = cartItems.findIndex(
        (item) => item.product._id === product._id
      );

      // ?if no, add the item to the cartItems
      if (itemIndex === -1) {
        modifiedCartItems.push(addItem);
      }
      // ?if yes, replace the product with a new version of it with a modified quantity
      else {
        modifiedCartItems = modifiedCartItems.map((item) => {
          if (item.product._id === addItem.product._id) {
            return addItem;
          } else {
            return item;
          }
        });
      }

      if (userInfo) {
        // send request to update cart items
        const cartInfo = modifiedCartItems.map((item) => {
          return {
            product: item.product._id,
            quantity: item.quantity,
          };
        });

        await Axios.patch('/carts', { items: cartInfo });
      }

      return modifiedCartItems;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);
