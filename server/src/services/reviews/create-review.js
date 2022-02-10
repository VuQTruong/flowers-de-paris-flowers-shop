const express = require('express');
const isAuth = require('../../middlewares/is-auth');
const validateRequest = require('../../middlewares/validate-request');
const validateFields = require('../../middlewares/validate-fields');
const catchAsync = require('../../utilities/catch-async.util');
const { body } = require('express-validator');
const Review = require('../../models/review.model');
const Product = require('../../models/product.model');
const AppError = require('../../errors/app-error');
const router = express.Router();

const acceptFields = ['title', 'content', 'rating', 'tags', 'product'];

const validations = [
  body('title').isString().notEmpty().withMessage('Comment title is missing'),
  body('content').isString().trim().escape(),
  body('rating').isNumeric().notEmpty().withMessage('Rating is missing'),
  body('tags').isArray(),
  body('product').isMongoId().notEmpty(),
];

router.post(
  '/',
  isAuth,
  validateFields(acceptFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const user = req.user;
    const productId = req.body.product;
    const product = await Product.findById(productId).populate('reviews');

    if (!product) {
      return next(AppError.badRequest('Product not found'));
    }

    req.body.user = user._id;
    req.body.name = user.name;
    const review = await Review.create(req.body);

    // !wire up relationship with product
    product.reviews.unshift(review);
    await product.save();

    // !wire up relationship with user
    user.reviews.unshift(review._id);
    await user.save();

    return res.status(201).json({
      status: 'success',
      message: 'Review created successfully',
      data: {
        review,
      },
    });
  })
);

module.exports = router;
