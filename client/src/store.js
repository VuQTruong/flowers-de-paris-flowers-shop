import { configureStore } from '@reduxjs/toolkit';

import configReducer from './features/config/slice/config-slice';
import currentUserReducer from './features/users/slices/current-user-slice';
import allUsersReducer from './features/users/slices/all-users-slice';
import categoriesReducer from './features/categories/slices/categories-slice';
import productsReducer from './features/products/slices/products-slice';
import currentProductReducer from './features/products/slices/current-product-slice';
import commentTagsReducer from './features/reviews/slice/comment-tags-slice';
import cartReducer from './features/cart/slice/cart-slice';
import deliveryReducer from './features/cart/slice/delivery-slice';
import checkoutReducer from './features/checkout/slice/checkout-slice';
import ordersReducer from './features/orders/slice/orders-slice';
import aboutReducer from './features/about/slice/about-slice';

const store = configureStore({
  reducer: {
    config: configReducer,
    allCategories: categoriesReducer,
    currentUser: currentUserReducer,
    allUsers: allUsersReducer,
    allProducts: productsReducer,
    currentProduct: currentProductReducer,
    commentTags: commentTagsReducer,
    cart: cartReducer,
    delivery: deliveryReducer,
    checkout: checkoutReducer,
    allOrders: ordersReducer,
    about: aboutReducer,
  },
});

export default store;
