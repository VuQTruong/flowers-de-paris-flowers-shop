const mongoose = require('mongoose');
const slugify = require('slugify');

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

blogSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    const slug = slugify(this.get('title'), {
      trim: true,
      lower: true,
      locale: 'vi',
    });

    this.set('slug', slug);
  }

  next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
