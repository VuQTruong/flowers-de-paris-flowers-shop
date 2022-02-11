const mongoose = require('mongoose');
const Product = require('../models/product.model');
const slugify = require('slugify');
const { nanoid } = require('nanoid');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      index: true,
    },
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
        delete ret.products;
        delete ret.__v;
      },
    },
  }
);

// !generate and update slug
categorySchema.pre('save', async function (next) {
  if (this.isModified('name')) {
    // !assign slug
    let name = this.get('name');
    const categories = await Category.find({ name: name });

    if (categories.length) {
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

    // todo: get all related roducts and update their categorySlug
    await Product.updateMany(
      { category: this._id },
      {
        $set: { categorySlug: slug },
      }
    );
  }
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
