const express = require('express');
const { param } = require('express-validator');
const AppError = require('../../errors/app-error');
const isAuth = require('../../middlewares/is-auth');
const validateRequest = require('../../middlewares/validate-request');
const Product = require('../../models/product.model');
const Review = require('../../models/review.model');
const catchAsync = require('../../utilities/catch-async.util');
const { roundHalf } = require('../../utilities/helpers.util');
const router = express.Router();

const validations = [param('reviewId').isMongoId()];

router.delete(
  '/:reviewId',
  isAuth,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const user = req.user;

    // !Admin is allow to delete every review
    if (user.isAdmin) {
      await Review.findByIdAndDelete(reviewId);

      return res.status(200).json({
        status: 'success',
        message: 'Review deleted successfully',
        data: null,
      });
    }

    // !Check if the user is the person created the review
    const review = await Review.findById(reviewId);

    if (!review) {
      return next(AppError.badRequest('Review does not exist'));
    }

    if (String(review.user) !== String(user._id)) {
      return next(
        AppError.forbidden('You are not allowed to remove this review')
      );
    }

    // !Ok, the user is the person who created the review
    const product = await Product.findById(review.product).populate('reviews');

    product.reviews = product.reviews.filter((review) => {
      return String(review._id) !== String(reviewId);
    });
    await product.save();

    // *remove the review from user's reviews
    user.reviews = user.reviews.filter((id) => {
      return String(id) !== String(reviewId);
    });
    await user.save();

    // *remove the review itself
    await review.remove();

    return res.status(200).json({
      status: 'success',
      message: 'Review deleted successfully',
      data: null,
    });
  })
);

module.exports = router;
