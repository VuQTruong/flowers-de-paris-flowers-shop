const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    images: [String],
    coverImage: String,
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
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
    ratingAverage: {
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

// !generate slug on create
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    const slug = slugify(this.get('name'), {
      trim: true,
      lower: true,
      locale: 'vi',
    });

    this.set('slug', slug);
  }
  next();
});

// !generate slug on update
productSchema.pre('findOneAndUpdate', function (next) {
  if (this._update.name) {
    const slug = slugify(this._update.name, {
      trim: true,
      lower: true,
      locale: 'vi',
    });

    this._update.slug = slug;
  }

  next();
});

// !calculate discount percentage on discount price saved
productSchema.pre('save', function (next) {
  if (this.isModified('discountPrice')) {
    const price = this.get('price') * 1;
    const discountPrice = this.get('discountPrice') * 1;
    const percentage = Math.ceil(
      ((price - discountPrice) / price) * 100
    ).toFixed(0);

    this.set('discountPercentage', percentage);
  }

  next();
});

// !calculate discount percentage on discount price updated
productSchema.pre('findOneAndUpdate', function (next) {
  if (this._update && this._update.discountPrice) {
    const price = this.get('price') * 1;
    const discountPrice = this._update.discountPrice * 1;
    const percentage = Math.ceil(
      ((price - discountPrice) / price) * 100
    ).toFixed(0);

    this._update.discountPercentage = percentage;
  }

  next();
});

// todo: update the review average and reviews

// todo: cascade delete reviews

// todo: cascade delete product in user's favorites

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
