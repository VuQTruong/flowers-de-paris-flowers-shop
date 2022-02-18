const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be 1 as the minimum'],
    },
  },
  {
    timestamps: true,
  }
);

const cartSchema = new mongoose.Schema(
  {
    items: {
      type: [CartItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
