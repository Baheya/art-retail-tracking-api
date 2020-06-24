const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../helpers/error');

const Artwork = require('./artwork');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Please enter a valid e-mail.');
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    publications: {
      type: String,
      required: false,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.virtual('artworks', {
  ref: 'Artwork',
  localField: '_id',
  foreignField: 'artist',
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { id: user._id.toString() },
    process.env['JWT_SECRET']
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch || !user) {
    throw new ErrorHandler(
      400,
      'The email or password you have entered is incorrect.'
    );
  }
  return user;
};

userSchema.pre('remove', async function (next) {
  const user = this;
  await Artwork.deleteMany({ _id: user._id });

  next();
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
