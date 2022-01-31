const express = require('express');
const { param, body } = require('express-validator');
const isAuth = require('../../middlewares/is-auth');
const validateFields = require('../../middlewares/validate-fields');
const validateRequest = require('../../middlewares/validate-request');
const Product = require('../../models/product.model');
const Review = require('../../models/review.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

const acceptFields = ['title', 'content', 'rating', 'reviewTags'];

const validations = [
  param('reviewId').isMongoId(),
  body('title').isString().optional(),
  body('content').isString().optional(),
  body('rating').isNumeric().optional(),
  body('reviewTags').isArray().optional(),
];

router.patch(
  '/:reviewId',
  isAuth,
  validateFields(acceptFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const reviewId = req.params.reviewId;

    const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, {
      new: true,
      runValidators: true,
    });

    // If user change the rating, update the rating of the product as well
    if (req.body.rating) {
      console.log('update product');
      const product = await Product.findById(updatedReview.product);
      await product.save();
    }

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
