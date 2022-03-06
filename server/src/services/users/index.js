const express = require('express');
const getFavoriteRouter = require('./favorites/get-favorites');
const getUserInfoRouter = require('./get-user-info');
const updateUserInfoRouter = require('./update-user-info');
const updateAvatarRouter = require('./update-avatar');

const addAFavoriteRouter = require('./favorites/add-a-favorite');
const removeAFavoriteRouter = require('./favorites/remove-a-favorite');
const getAllFavoritesRouter = require('./favorites/get-favorites');
const updateFavoritesRouter = require('./favorites/update-favorites');

const adGetAllUsersRouter = require('./admin/admin-get-all-users');
const adBlockAUserRouter = require('./admin/admin-block-a-user');
const adDeleteAUserRouter = require('./admin/admin-delete-a-user');
const adSetAdminRouter = require('./admin/admin-set-admin');

const userRouter = express.Router();

userRouter.use(getFavoriteRouter);
userRouter.use(getUserInfoRouter);
userRouter.use(updateUserInfoRouter);
userRouter.use(updateAvatarRouter);

// Favorites routes
userRouter.use(addAFavoriteRouter);
userRouter.use(removeAFavoriteRouter);
userRouter.use(getAllFavoritesRouter);
userRouter.use(updateFavoritesRouter);

// Admin routes
userRouter.use(adGetAllUsersRouter);
userRouter.use(adBlockAUserRouter);
userRouter.use(adDeleteAUserRouter);
userRouter.use(adSetAdminRouter);

module.exports = userRouter;
