import { createAsyncThunk } from '@reduxjs/toolkit';

export const addItemToCart = createAsyncThunk(
  'cart/addItem',
  async (payload, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const { userInfo } = state.currentUser;
      const { cartItems } = state.cart;
      const { product, quantity } = payload;

      const addItem = { ...product, quantity };
      let modifiedCartItems = [...cartItems];

      // ?check if the item is already added
      const itemIndex = cartItems.findIndex((item) => item._id === product._id);

      // ?if no, add the item to the cartItems
      if (itemIndex === -1) {
        modifiedCartItems.push(addItem);
      }
      // ?if yes, replace the product with a new version of it with a modified quantity
      else {
        modifiedCartItems = modifiedCartItems.map((item) => {
          if (item._id === addItem._id) {
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
            productId: item._id,
            quantity: item.quantity,
          };
        });

        // todo: send a request to update cart
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
