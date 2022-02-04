import { configureStore } from '@reduxjs/toolkit';

import categoriesReducer from './features/categories/categories-slice';
import currentUserReducer from './features/auth/current-user-slice';
import cartReducer from './features/user/cart-slice';

const store = configureStore({
  reducer: {
    allCategories: categoriesReducer,
    currentUser: currentUserReducer,
    cart: cartReducer,
  },
});

export default store;
