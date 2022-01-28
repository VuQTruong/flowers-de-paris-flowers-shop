const express = require('express');
const getFavouriteRouter = require('./get-favourites');
const getUserInfoRouter = require('./get-user-info');
const updateUserInfoRouter = require('./update-user-info');
const getAllUsers = require('./admin/get-all-users');
const blockAUser = require('./admin/block-a-user');
const deleteAUser = require('./admin/delete-a-user');

const userRouter = express.Router();

userRouter.use(getFavouriteRouter);
userRouter.use(getUserInfoRouter);
userRouter.use(updateUserInfoRouter);
userRouter.use(getAllUsers);
userRouter.use(blockAUser);
userRouter.use(deleteAUser);

module.exports = userRouter;
