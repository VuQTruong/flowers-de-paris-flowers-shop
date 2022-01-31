const express = require('express');
const createReviewRouter = require('./create-review');
const deleteReviewRouter = require('./delete-review');
const updateReviewRouter = require('./update-review');
const reviewRouter = express.Router();

reviewRouter.use(createReviewRouter);
reviewRouter.use(deleteReviewRouter);
reviewRouter.use(updateReviewRouter);

module.exports = reviewRouter;
