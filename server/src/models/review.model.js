const mongoose = require('mongoose');
const Product = require('./product.model');
const { roundHalf } = require('../utilities/helpers.util');

const reviewSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    rating: Number,
    reviewTags: [String],
    // ?user is used to store info about the creator and to populate the minimal info of the person
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    // ?product is used to indicate which product the review belongs to
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
