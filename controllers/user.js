const User = require('../models/user');
const { ErrorHandler } = require('../helpers/error');

exports.register = async (req, res, next) => {
  try {
    if (
      !req.body.data.name ||
      !req.body.data.email ||
      !req.body.data.password
    ) {
      throw new ErrorHandler(400, 'Please fill out all the required fields.');
    }
    let user = await User.findOne({ email: req.body.data.email });
    if (user) {
      throw new ErrorHandler(400, 'This e-mail address is already in use.');
    }
    user = new User(req.body.data);
    console.log(user);
    await user.save();
    const token = await user.generateAuthToken();
    res
      .status(201)
      .send({ message: 'User registration successful.', user, token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new ErrorHandler(400, 'Please fill out all the required fields.');
    } else if (!email.includes('@')) {
      throw new ErrorHandler(400, 'Please enter a valid e-mail address.');
    }

    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    res.status(200).json({
      message: 'Logged in successfully.',
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  const updates = Object.keys(req.body);
  try {
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.status(200).json({ message: 'User updated successfully.', user });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
    next(error);
  }
};

exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res
      .status(200)
      .json({ message: 'Logged out of all devices successfully.' });
  } catch (error) {
    next(error);
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
