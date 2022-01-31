const mongoose = require('mongoose');
const Product = require('../models/product.model');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: String,
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
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

// !generate slug on category created
categorySchema.pre('save', function (next) {
  const slug = slugify(this.get('name'), {
    trim: true,
    lower: true,
    locale: 'vi',
  });

  this.set('slug', slug);

  next();
});

// !update slug on category updated
categorySchema.pre('findOneAndUpdate', function (next) {
  const slug = slugify(this._update.name, {
    trim: true,
    lower: true,
    locale: 'vi',
  });

  this._update.slug = slug;
  next();
});

// !cascade delete products belong to the category
categorySchema.pre('remove', async function (next) {
  try {
    await Product.deleteMany({
      _id: {
        $in: this.products,
      },
    });

    next();
  } catch (error) {
    next(error);
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
