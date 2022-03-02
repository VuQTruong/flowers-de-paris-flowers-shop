const mongoose = require('mongoose');
const slugify = require('slugify');
const { nanoid } = require('nanoid');

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
    coverImage: String,
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

contactSchema.pre('save', async function (next) {
  if (this.isModified('name')) {
    let name = this.get('name');
    const contacts = await Contact.find({ name: name });

    if (contacts.length) {
      const uniqueId = nanoid(5);
      name = `${name} ${uniqueId}`;
    }

    const slug = slugify(name, {
      lower: true,
      trim: true,
      locale: 'vi',
      strict: true,
    });

    this.set('slug', slug);
  }
  next();
});

// !generate slug on update
contactSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update.name) {
    let name = this._update.name;
    const contacts = await Contact.find({ name: name });

    if (contacts.length) {
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

  next();
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
