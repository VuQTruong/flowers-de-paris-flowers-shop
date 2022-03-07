const express = require('express');
const catchAsync = require('../../utilities/catch-async.util');
const Product = require('../../models/product.model');
const router = express.Router();

router.get(
  '/ping/:productId',
  catchAsync(async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.find({
      _id: productId,
      isActive: true,
    });

    return res.status(200).json({
      status: 'success',
      data: {
        product: product.length !== 0 ? productId : null,
      },
    });
  })
);

module.exports = router;
