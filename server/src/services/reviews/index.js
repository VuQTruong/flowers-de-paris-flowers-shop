const express = require('express');
const createReviewRouter = require('./create-review');
const deleteReviewRouter = require('./delete-review');
const updateReviewRouter = require('./update-review');
const createCommentTagRouter = require('./admin/create-comment-tags');
const updateCommentTagRouter = require('./admin/update-a-comment-tag');
const deleteCommentTagRouter = require('./admin/delete-a-comment-tag');
const getCommentTagRouter = require('./get-all-comment-tags');
const reviewRouter = express.Router();

reviewRouter.use(createReviewRouter);
reviewRouter.use(deleteReviewRouter);
reviewRouter.use(updateReviewRouter);

/* comment tags */
reviewRouter.use(createCommentTagRouter);
reviewRouter.use(updateCommentTagRouter);
reviewRouter.use(deleteCommentTagRouter);
reviewRouter.use(getCommentTagRouter);

module.exports = reviewRouter;
