const express = require('express');
const isAuth = require('../../middlewares/is-auth');
const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/',
  isAuth,
  catchAsync(async (req, res, next) => {
    const user = req.user;
    const cart = await Cart.findById(user.cart);

    const productPromises = cart.items.map((item) =>
      Product.findOne({
        _id: item.product,
        isActive: true,
      })
    );

    const products = await Promise.all(productPromises);

    let items = [];
    products.forEach((product, index) => {
      if (product) {
        items.push({
          product: product,
          quantity: cart.items[index].quantity,
        });
      }
    });

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve cart successfully',
      data: {
        items,
      },
    });
  })
);

module.exports = router;
