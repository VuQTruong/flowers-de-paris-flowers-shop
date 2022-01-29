const express = require('express');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const Product = require('../../../models/product.model');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  catchAsync(async (req, res, next) => {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);

    return res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully',
      data: null,
    });
  })
);

module.exports = router;
