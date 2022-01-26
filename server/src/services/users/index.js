const express = require('express');
const getFavouriteRouter = require('./get-favourites');

const userRouter = express.Router();

userRouter.use(getFavouriteRouter);

module.exports = userRouter;
