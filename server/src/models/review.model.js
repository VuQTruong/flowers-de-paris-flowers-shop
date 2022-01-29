const mongoose = require('mongoose');
const Product = require('./product.model');
const { roundHalf } = require('../utilities/helpers.util');

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: String,
    content: String,
    rating: Number,
    reviewTags: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
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

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
