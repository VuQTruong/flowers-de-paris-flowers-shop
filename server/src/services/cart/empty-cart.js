const express = require('express');
const isAuth = require('../../middlewares/is-auth');
const Cart = require('../../models/cart.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.delete(
  '/',
  isAuth,
  catchAsync(async (req, res, next) => {
    const user = req.user;
    const updatedCart = await Cart.findByIdAndUpdate(
      user.cart,
      {
        items: [],
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      status: 'success',
      message: 'Cart is empty',
      data: {
        cart: updatedCart,
      },
    });
  })
);

module.exports = router;
