const mongoose = require('mongoose');
const slugify = require('slugify');
const { nanoid } = require('nanoid');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: String,
    tags: [String],
    summary: String,
    content: {
      type: String,
      required: true,
    },
    coverImage: String,
    slug: String,
    views: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
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

blogSchema.pre('save', async function (next) {
  if (this.isModified('title')) {
    let title = this.get('title');
    const blogs = await Blog.find({ title: title });

    if (blogs.length) {
      const uniqueId = nanoid(5);
      title = `${title} ${uniqueId}`;
    }

    const slug = slugify(title, {
      trim: true,
      lower: true,
      locale: 'vi',
      strict: true,
    });

    this.set('slug', slug);
  }

  next();
});

// !update slug on blog updated
blogSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update.title) {
    let title = this._update.title;
    const blogs = await Blog.find({ title: title });

    if (blogs.length) {
      const uniqueId = nanoid(5);
      title = `${title} ${uniqueId}`;
    }
    const slug = slugify(title, {
      trim: true,
      lower: true,
      locale: 'vi',
      strict: true,
    });

    this._update.slug = slug;
  }

  next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
