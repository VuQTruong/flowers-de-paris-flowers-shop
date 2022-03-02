const express = require('express');

const createReviewRouter = require('./create-review');
const deleteReviewRouter = require('./delete-review');
const updateReviewRouter = require('./update-review');

const getCommentTagRouter = require('./get-all-comment-tags');
const adCreateCommentTagRouter = require('./admin/admin-create-comment-tags');
const adUpdateCommentTagRouter = require('./admin/admin-update-a-comment-tag');
const adDeleteCommentTagRouter = require('./admin/admin-delete-a-comment-tag');
const reviewRouter = express.Router();

reviewRouter.use(createReviewRouter);
reviewRouter.use(deleteReviewRouter);
reviewRouter.use(updateReviewRouter);

/* comment tags */
reviewRouter.use(adCreateCommentTagRouter);
reviewRouter.use(adUpdateCommentTagRouter);
reviewRouter.use(adDeleteCommentTagRouter);

reviewRouter.use(getCommentTagRouter);

module.exports = reviewRouter;
