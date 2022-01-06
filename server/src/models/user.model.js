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
    gender: String,
    dateOfBirth: Date,
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    googleId: String,
    facebookId: String,
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
  if (this.isModified('password')) {
    const hashed = bcrypt.hashSync(this.get('password'), 10);
    this.set('password', hashed);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
