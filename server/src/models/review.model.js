const mongoose = require('mongoose');
const Product = require('./product.model');
const { roundHalf } = require('../utilities/helpers.utils');

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

reviewSchema.pre('remove', async function (next) {
  const product = await Product.findById(this.product);

  // Remove the review in the product's reviews list
  product.reviews = product.reviews.filter(
    (review) => review._id !== req.params.reviewId
  );

  // Update the product rating
  if (product.reviews.length !== 0) {
    const totalRating = product.reviews.reduce(
      (accumulator, review) => review.rating + accumulator,
      0
    );
    product.rating = roundHalf(totalRating / product.reviews.length);
  } else {
    product.rating = 0;
  }

  await product.save();

  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
