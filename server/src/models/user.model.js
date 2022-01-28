const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    address: String,
    gender: {
      type: String,
      default: 'Unknown',
    },
    dateOfBirth: {
      type: Date,
      default: Date.now(),
    },
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
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

userSchema.pre('save', function (next) {
  const hashed = bcrypt.hashSync(this.get('password'), 10);
  this.set('password', hashed);
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
