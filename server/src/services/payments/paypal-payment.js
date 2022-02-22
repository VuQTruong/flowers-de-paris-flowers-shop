const express = require('express');
const isAuth = require('../../middlewares/is-auth');
const catchAsync = require('../../utilities/catch-async.util');
const paypal = require('@paypal/checkout-server-sdk');
const Product = require('../../models/product.model');

const router = express.Router();

const Environment =
  process.env.NODE_ENV === 'production'
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment;

const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
);

router.post(
  '/paypal',
  isAuth,
  catchAsync(async (req, res, next) => {
    const items = req.body.items;
    const card = req.body.card;

    const products = await Promise.all(
      items.map((item) => Product.findById(item.id))
    );

    let total = 0;
    let purchaseItems = products.map((product, index) => {
      total += product.price * items[index].quantity;

      return {
        name: product.name,
        unit_amount: {
          currency_code: 'CAD',
          value: product.price,
        },
        quantity: items[index].quantity,
      };
    });

    if (card) {
      purchaseItems.push({
        name: card,
        unit_amount: {
          currency_code: 'CAD',
          value: 5,
        },
        quantity: 1,
      });

      total += 5;
    }

    const request = new paypal.orders.OrdersCreateRequest();

    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'CAD',
            value: total,
            breakdown: {
              item_total: {
                currency_code: 'CAD',
                value: total,
              },
            },
          },
          items: purchaseItems,
        },
      ],
    });

    const order = await paypalClient.execute(request);

    return res.status(201).json({
      status: 'success',
      message: 'Paypal order is created',
      data: {
        id: order.result.id,
      },
    });
  })
);

module.exports = router;
