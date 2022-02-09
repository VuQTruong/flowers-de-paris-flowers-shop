const mongoose = require('mongoose');
const Product = require('./product.model');
const User = require('./user.model');

const reviewSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    content: String,
    rating: Number,
    tags: [String],
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

reviewSchema.pre('remove', { document: true }, async function (next) {
  try {
    const review = await this.populate('user product');

    if (review.product) {
      const productId = review.product._id;
      const product = await Product.findById(productId);
      product.reviews = product.reviews.filter((id) => {
        return String(id) !== String(review._id);
      });
      await product.save();
    }

    if (review.user) {
      const userId = review.user._id;
      const user = await User.findById(userId);
      user.reviews = user.reviews.filter((id) => {
        return String(id) !== String(review._id);
      });
      await user.save();
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
