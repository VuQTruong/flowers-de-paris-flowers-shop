const express = require('express');
const catchAsync = require('../../utilities/catch-async.util');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const Product = require('../../models/product.model');
const isAuth = require('../../middlewares/is-auth');

const router = express.Router();

router.post(
  '/stripe',
  isAuth,
  catchAsync(async (req, res, next) => {
    const items = req.body.items;

    // ?we can send the whole product info to remove the searching the item in the database step
    // ?however, someone may change the info of the product such as the price to 0
    // ?therefore, we just need the product id to get what we have in the database
    const products = await Promise.all(
      items.map((item) => Product.findById(item.id))
    );

    const purchaseItems = products.map((product, index) => {
      // ?the following object follows the expected structure from Stripe
      return {
        price_data: {
          currency: 'cad',
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100, // !unit_amount must be in cents
        },
        quantity: items[index].quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: purchaseItems,
      success_url: `${process.env.CLIENT_URL}/payment/success`,
      cancel_url: `${process.env.CLIENT_URL}/payment`,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Stripe session is created',
      data: {
        url: session.url,
      },
    });
  })
);

module.exports = router;
