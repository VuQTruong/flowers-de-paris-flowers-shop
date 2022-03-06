const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      index: true,
    },
    phone: {
      type: String,
      index: true,
    },
    password: {
      type: String,
    },
    avatar: String,
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      default: '',
    },
    dateOfBirth: {
      type: Date,
      default: Date.now(),
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart',
    },
    // ?list of previews to be able to populate user's related reviews
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    googleId: String,
    facebookId: String,
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
        delete ret.password;
      },
    },
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashed = bcrypt.hashSync(this.get('password'), 10);
    this.set('password', hashed);
  }

  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  if (!this._update.password) {
    return next();
  }

  this._update.password = bcrypt.hashSync(this._update.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
