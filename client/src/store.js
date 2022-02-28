import { configureStore } from '@reduxjs/toolkit';

import configReducer from './features/config/slice/config-slice';
import currentUserReducer from './features/users/slices/current-user-slice';
import allUsersReducer from './features/users/slices/all-users-slice';
import currentCategoryReducer from './features/categories/slices/current-category-slice';
import categoriesReducer from './features/categories/slices/categories-slice';
import productsReducer from './features/products/slices/products-slice';
import currentProductReducer from './features/products/slices/current-product-slice';
import commentTagsReducer from './features/reviews/slice/comment-tags-slice';
import cartReducer from './features/cart/slice/cart-slice';
import deliveryReducer from './features/cart/slice/delivery-slice';
import checkoutReducer from './features/checkout/slice/checkout-slice';
import ordersReducer from './features/orders/slice/orders-slice';
import aboutReducer from './features/about/slice/about-slice';
import allBlogsReducer from './features/blogs/slice/all-blogs-slice';
import currentArticleReducer from './features/blogs/slice/current-article';

const store = configureStore({
  reducer: {
    config: configReducer,
    currentCategory: currentCategoryReducer,
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
    allBlogs: allBlogsReducer,
    currentArticle: currentArticleReducer,
  },
});

export default store;
