const mongoose = require('mongoose');
const Review = require('./review.model');
const slugify = require('slugify');
const { roundHalf } = require('../utilities/helpers.util');
const { nanoid } = require('nanoid');

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
    categorySlug: {
      type: String,
      index: true,
    },
    images: [String],
    coverImage: String,
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    saleOffPrice: {
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
    slug: {
      type: String,
      index: true,
    },
    soldQty: {
      type: Number,
      default: 0,
    },
    colors: [String],
    tags: [String],
    tagSlugs: [String],
    averageRating: {
      type: Number,
      default: 0,
    },
    // ?list of previews to be able to populate product's related reviews
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
    views: {
      type: Number,
      default: 0,
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

productSchema.pre('save', function (next) {
  const originalPrice = this.get('originalPrice');
  const saleOffPrice = this.get('saleOffPrice');

  if (this.isModified('size')) {
    const size = this.get('size').toUpperCase();
    this.set('size', size);
  }

  // !update price on originalPrice updated
  if (this.isModified('originalPrice')) {
    this.set('price', originalPrice);
  }

  // !update price and discountPercentage on saleOffPrice updated
  if (this.isModified('saleOffPrice')) {
    if (saleOffPrice !== 0) {
      const percentage = Math.ceil(
        ((originalPrice - saleOffPrice) / originalPrice) * 100
      ).toFixed(0);

      this.set('discountPercentage', percentage);
      this.set('price', saleOffPrice);
    } else {
      this.set('discountPercentage', 0);
      this.set('price', originalPrice);
    }
  }

  next();
});

// !generate slug on create
productSchema.pre('save', async function (next) {
  if (this.isModified('name')) {
    let name = this.get('name');
    const products = await Product.find({ name: name });

    if (products.length) {
      const uniqueId = nanoid(5);
      name = `${name} ${uniqueId}`;
    }

    const slug = slugify(name, {
      trim: true,
      lower: true,
      locale: 'vi',
      strict: true,
    });

    this.set('slug', slug);
  }

  if (this.isModified('tags')) {
    const tags = this.get('tags');
    const tagSlugs = tags.map((tag) => {
      return slugify(tag, {
        trim: true,
        lower: true,
        locale: 'vi',
        strict: true,
      });
    });

    this.set('tagSlugs', tagSlugs);
  }
  next();
});

// !generate slug on update
productSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update.name) {
    let name = this._update.name;
    const products = await Product.find({ name: name });

    if (products.length) {
      const uniqueId = nanoid(5);
      name = `${name} ${uniqueId}`;
    }

    const slug = slugify(name, {
      trim: true,
      lower: true,
      locale: 'vi',
      strict: true,
    });

    this._update.slug = slug;
  }

  if (this._update.tags) {
    const tags = this._update.tags;
    const tagSlugs = tags.map((tag) => {
      return slugify(tag, {
        trim: true,
        lower: true,
        locale: 'vi',
        strict: true,
      });
    });

    this._update.tagSlugs = tagSlugs;
  }
  next();
});

// !update the review average when reviews changed
productSchema.pre('save', async function (next) {
  if (this.isModified('reviews')) {
    const product = await this.populate('reviews');

    const totalRating = product.reviews.reduce((accumulator, review) => {
      return review.rating + accumulator;
    }, 0);

    if (this.get('reviews').length !== 0) {
      const rating = roundHalf(totalRating / this.get('reviews').length);
      this.set('averageRating', rating);
    } else {
      this.set('averageRating', 0);
    }
  }
  next();
});

// !cascade delete reviews
productSchema.post('remove', async function (doc, next) {
  try {
    for (let reviewId of doc.reviews) {
      const review = await Review.findById(reviewId);
      await review.remove();
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
