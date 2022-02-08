import { configureStore } from '@reduxjs/toolkit';

import currentUserReducer from './features/users/current-user-slice';
import categoriesReducer from './features/categories/categories-slice';
import productsReducer from './features/products/products-slice';
import currentProductReducer from './features/products/current-product-slice';
import cartReducer from './features/cart/cart-slice';

const store = configureStore({
  reducer: {
    allCategories: categoriesReducer,
    currentUser: currentUserReducer,
    products: productsReducer,
    currentProduct: currentProductReducer,
    cart: cartReducer,
  },
});

export default store;
