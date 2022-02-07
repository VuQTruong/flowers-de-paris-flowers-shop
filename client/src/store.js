import { configureStore } from '@reduxjs/toolkit';

import currentUserReducer from './features/user/current-user-slice';
import categoriesReducer from './features/categories/categories-slice';
import cartReducer from './features/cart/cart-slice';

const store = configureStore({
  reducer: {
    allCategories: categoriesReducer,
    currentUser: currentUserReducer,
    cart: cartReducer,
  },
});

export default store;
