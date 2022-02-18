import { configureStore } from '@reduxjs/toolkit';

import configReducer from './features/config/slice/config-slice';
import currentUserReducer from './features/users/slices/current-user-slice';
import categoriesReducer from './features/categories/slices/categories-slice';
import productsReducer from './features/products/slices/products-slice';
import currentProductReducer from './features/products/slices/current-product-slice';
import commentTagsReducer from './features/reviews/slice/comment-tags-slice';
import cartReducer from './features/cart/slice/cart-slice';
import recipientReducer from './features/cart/slice/recipient-slice';

const store = configureStore({
  reducer: {
    config: configReducer,
    allCategories: categoriesReducer,
    currentUser: currentUserReducer,
    allProducts: productsReducer,
    currentProduct: currentProductReducer,
    commentTags: commentTagsReducer,
    cart: cartReducer,
    recipient: recipientReducer,
  },
});

export default store;
