const express = require('express');
const { body, param } = require('express-validator');
const AppError = require('../../../errors/app-error');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const validateFields = require('../../../middlewares/validate-fields');
const validateRequest = require('../../../middlewares/validate-request');
const Product = require('../../../models/product.model');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

const requireFields = [
  'name',
  'category',
  'categorySlug',
  'images',
  'coverImage',
  'originalPrice',
  'saleOffPrice',
  // 'size',
  'summary',
  'description',
  'colors',
  'tags',
];

const validations = [
  param('id').isMongoId(),
  body('name').isString().optional(),
  body('category').isMongoId().optional(),
  body('categorySlug').isString().optional(),
  body('images').isArray().optional(),
  body('coverImage').isString().optional(),
  body('originalPrice').isNumeric().optional(),
  body('saleOffPrice').isNumeric().optional(),
  // body('size').isString().optional(),
  body('summary').isString().optional().trim(),
  body('description').isString().optional().trim(),
  body('colors').isArray().optional(),
  body('tags').isArray().optional(),
];

router.patch(
  '/:id',
  isAuth,
  isAdmin,
  validateFields(requireFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const productId = req.params.id;
    const {
      name,
      category,
      categorySlug,
      images,
      coverImage,
      originalPrice,
      saleOffPrice,
      summary,
      description,
      colors,
      tags,
    } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return next(AppError.notFound('Sorry, we cannot find the product'));
    }

    product.name = name ? name : product.name;
    product.category = category ? category : product.category;
    product.categorySlug = categorySlug ? categorySlug : product.categorySlug;
    product.images = images ? images : product.images;
    product.coverImage = coverImage ? coverImage : product.coverImage;
    product.originalPrice = originalPrice
      ? originalPrice
      : product.originalPrice;
    product.saleOffPrice = saleOffPrice ? saleOffPrice : product.saleOffPrice;
    product.summary = summary ? summary : product.summary;
    product.description = description ? description : product.description;
    product.colors = colors ? colors : product.colors;
    product.tags = tags ? tags : product.tags;

    await product.save();

    return res.status(200).json({
      status: 'success',
      message: 'Product updated successfully',
      data: {
        product,
      },
    });
  })
);

module.exports = router;
