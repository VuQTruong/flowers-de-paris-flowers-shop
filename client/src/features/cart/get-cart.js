import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { cartItems } = getState().cart;
      let modifiedCartItems = [...cartItems];

      const { data } = await Axios.get('/carts');

      // ?if cartItems is empty, update the cart with items from db
      if (cartItems.length === 0) {
        modifiedCartItems = data.data.items;
      }
      // ?if cartItems is not empty
      // ?compare the items in cartItems with items from db to combine them together
      // ?if there are duplicate items, use the items in the cartItems
      else {
        for (let item of data.data.items) {
          const itemIndex = modifiedCartItems.findIndex((cartItem) => {
            return cartItem.product._id === item.product._id;
          });

          if (itemIndex === -1) {
            modifiedCartItems.push(item);
          }
        }

        // ?send request to update the cart on db
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
      return rejectWithValue(error.response.data.message);
    }
  }
);
