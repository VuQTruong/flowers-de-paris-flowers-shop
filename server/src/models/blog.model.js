const mongoose = require('mongoose');

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

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
