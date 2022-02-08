import { configureStore } from '@reduxjs/toolkit';

import currentUserReducer from './features/users/slices/current-user-slice';
import categoriesReducer from './features/categories/slices/categories-slice';
import productsReducer from './features/products/slices/products-slice';
import currentProductReducer from './features/products/slices/current-product-slice';
import cartReducer from './features/cart/cart-slice';

const store = configureStore({
  reducer: {
    allCategories: categoriesReducer,
    currentUser: currentUserReducer,
    allProducts: productsReducer,
    currentProduct: currentProductReducer,
    cart: cartReducer,
  },
});

export default store;
