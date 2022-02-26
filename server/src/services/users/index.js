const express = require('express');
const getFavoriteRouter = require('./favorites/get-favorites');
const getUserInfoRouter = require('./get-user-info');
const updateUserInfoRouter = require('./update-user-info');

const addAFavoriteRouter = require('./favorites/add-a-favorite');
const removeAFavoriteRouter = require('./favorites/remove-a-favorite');
const getAllFavoritesRouter = require('./favorites/get-favorites');
const updateFavoritesRouter = require('./favorites/update-favorites');

const getAllUsersRouter = require('./admin/get-all-users');
const blockAUserRouter = require('./admin/block-a-user');
const deleteAUserRouter = require('./admin/delete-a-user');
const setAdminRouter = require('./admin/set-admin');

const userRouter = express.Router();

userRouter.use(getFavoriteRouter);
userRouter.use(getUserInfoRouter);
userRouter.use(updateUserInfoRouter);

// Favorites routes
userRouter.use(addAFavoriteRouter);
userRouter.use(removeAFavoriteRouter);
userRouter.use(getAllFavoritesRouter);
userRouter.use(updateFavoritesRouter);

// Admin routes
userRouter.use(getAllUsersRouter);
userRouter.use(blockAUserRouter);
userRouter.use(deleteAUserRouter);
userRouter.use(setAdminRouter);

module.exports = userRouter;
