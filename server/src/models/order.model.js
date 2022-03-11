const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    orderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        name: { type: String, required: true },
        slug: { type: String, required: true },
        categorySlug: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    deliveryInfo: {
      name: { type: String, required: true },
      phone: Number,
      country: {
        type: {
          code: String,
          name: String,
        },
        required: true,
      },
      province: {
        type: {
          code: String,
          name: String,
        },
        required: true,
      },
      city: {
        type: {
          code: String,
          name: String,
        },
        required: true,
      },
      ward: {
        type: {
          code: String,
          name: String,
        },
      },
      address: { type: String, required: true },
      postalCode: String,
    },
    sender: { type: String, required: true },
    message: { type: String },
    note: { type: String },
    card: {
      name: String,
      price: Number,
    },
    paymentMethod: { type: String, required: true },
    price: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    status: { type: String, default: 'Pending' },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
