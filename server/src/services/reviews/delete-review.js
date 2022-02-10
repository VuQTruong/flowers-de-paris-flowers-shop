const express = require('express');
const { param } = require('express-validator');
const AppError = require('../../errors/app-error');
const isAuth = require('../../middlewares/is-auth');
const validateRequest = require('../../middlewares/validate-request');
const Product = require('../../models/product.model');
const Review = require('../../models/review.model');
const catchAsync = require('../../utilities/catch-async.util');
const User = require('../../models/user.model');
const router = express.Router();

const validations = [param('reviewId').isMongoId()];

router.delete(
  '/:reviewId',
  isAuth,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const review = await Review.findById(reviewId);

    let user = req.user;

    // !the user request delete is an admin
    // !req.user is the info of the admin
    // !we need to fetch the info of the author to be able to remove the review on the author's info
    if (String(user._id) !== String(review.user)) {
      user = await User.findById(review.user);
    }

    if (!review) {
      return next(AppError.badRequest('Review does not exist'));
    }

    // !Admin is allowed to delete any review
    if (user.isAdmin) {
      await cascadeDelete(review, user);
      await review.deleteOne();

      return res.status(200).json({
        status: 'success',
        message: 'Review deleted successfully',
        data: null,
      });
    }

    // !Check if the user is the person created the review
    if (String(review.user) !== String(user._id)) {
      return next(
        AppError.forbidden('You are not allowed to remove this review')
      );
    }

    // !Ok, the user is the person who created the review
    await cascadeDelete(review, user);
    await review.deleteOne();

    return res.status(200).json({
      status: 'success',
      message: 'Review deleted successfully',
      data: null,
    });
  })
);

async function cascadeDelete(review, user) {
  const product = await Product.findById(review.product).populate('reviews');

  product.reviews = product.reviews.filter((item) => {
    const id = item._id;
    return String(id) !== String(review._id);
  });
  await product.save();

  // *remove the review from user's reviews
  user.reviews = user.reviews.filter((id) => {
    return String(id) !== String(review._id);
  });
  await user.save();
}

module.exports = router;
