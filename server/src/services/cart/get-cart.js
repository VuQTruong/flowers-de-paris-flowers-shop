const express = require('express');
const isAuth = require('../../middlewares/is-auth');
const Cart = require('../../models/cart.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/',
  isAuth,
  catchAsync(async (req, res, next) => {
    const user = req.user;
    const cart = await Cart.findById(user.cart);

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve cart successfully',
      data: {
        cart,
      },
    });
  })
);

module.exports = router;
