const express = require('express');
const { param, body } = require('express-validator');
const AppError = require('../../errors/app-error');
const isAuth = require('../../middlewares/is-auth');
const validateFields = require('../../middlewares/validate-fields');
const validateRequest = require('../../middlewares/validate-request');
const Product = require('../../models/product.model');
const Review = require('../../models/review.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

const acceptFields = ['title', 'content', 'rating', 'tags'];

const validations = [
  param('reviewId').isMongoId(),
  body('title').isString().optional(),
  body('content').isString().optional(),
  body('rating').isNumeric().optional(),
  body('tags').isArray().optional(),
];

router.patch(
  '/:reviewId',
  isAuth,
  validateFields(acceptFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const { title, content, rating, tags } = req.body;

    const updatedReview = await Review.findById(reviewId);

    if (!updatedReview) {
      return next(AppError.notFound('Sorry, we cannot find the review'));
    }

    // If user change the rating, update the rating of the product as well
    if (rating) {
      console.log('update product');
      const product = await Product.findById(updatedReview.product);
      await product.save();
    }

    updatedReview.title = title ? title : updatedReview.title;
    updatedReview.content = content ? content : updatedReview.content;
    updatedReview.rating = rating ? rating : updatedReview.rating;
    updatedReview.tags = tags ? tags : updatedReview.tags;

    await updatedReview.save();

    return res.status(200).json({
      status: 'success',
      message: 'Review updated successfully',
      data: {
        review: updatedReview,
      },
    });
  })
);

module.exports = router;
