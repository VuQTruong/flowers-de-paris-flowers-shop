const mongoose = require('mongoose');
const slugify = require('slugify');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: String,
    phone: String,
    address: String,
    lat: Number,
    long: Number,
    slug: String,
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

contactSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    const slug = slugify(this.get('name'), {
      lower: true,
      trim: true,
      locale: 'vi',
    });

    this.set('slug', slug);
  }
  next();
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
