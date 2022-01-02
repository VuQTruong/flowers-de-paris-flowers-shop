const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: [String],
    price: {
      type: Number,
      required: true,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
      required: true,
      default: 'M',
    },
    summary: String,
    description: String,
    slug: String,
    soldQty: {
      type: Number,
      default: 0,
    },
    colors: [String],
    tags: [String],
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    toObject: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

productSchema.virtual('numReviews').get(function () {
  return this.reviews.length;
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
