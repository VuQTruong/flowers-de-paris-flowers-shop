const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: Number,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    deliveryInfo: {
      recipient: { type: String, required: true },
      phone: Number,
      country: { type: String, required: true },
      province: { type: String, required: true },
      city: { type: String, required: true },
      ward: { type: String, required: true },
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
