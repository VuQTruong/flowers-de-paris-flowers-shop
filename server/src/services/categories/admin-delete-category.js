const express = require('express');
const { param } = require('express-validator');
const isAdmin = require('../../middlewares/is-admin');
const isAuth = require('../../middlewares/is-auth');
const validateRequest = require('../../middlewares/validate-request');
const Category = require('../../models/category.model');
const catchAsync = require('../../utilities/catch-async.util');
const cloudinary = require('../../config/cloudinary');
const router = express.Router();

const validations = [param('id').isMongoId()];

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    if (!category) {
      return next(AppError.badRequest('Sorry, we cannot find the category'));
    }

    const imageId = category.coverImage.split('/').pop().split('.')[0];
    await cloudinary.v2.uploader.destroy(`categories/${imageId}`);

    category.remove();

    return res.status(200).json({
      status: 'success',
      message: 'Category deleted successfully',
      data: null,
    });
  })
);

module.exports = router;
