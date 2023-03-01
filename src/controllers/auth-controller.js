const {
  validateRegister,
  validateLogin,
  validateStartEmail,
} = require('../validators/auth-validators');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User, Profile } = require('../models');
const createError = require('../utils/create-error');

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);

    const user = await User.findOne({ where: { email: value.email } });
    if (user) {
      createError('email is already in use', 400);
    }

    value.password = await bcrypt.hash(value.password, 12);
    await User.create(value);

    res.status(201).json({ message: 'register success' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);

    const user = await User.findOne({
      where: { email: value.email },
    });
    if (!user) {
      createError('invalid email or password', 400);
    }

    const isCorrect = await bcrypt.compare(value.password, user.password);
    if (!isCorrect) {
      createError('invalid email or password', 400);
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ['password'] },
      include: { model: Profile },
    });

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.editAccount = async (req, res, next) => {
  try {
    const value = req.body;

    await User.update(value, { where: { id: req.user.id } });

    res.status(200).json({ message: 'account update success' });
  } catch (err) {
    next(err);
  }
};

exports.startEmail = async (req, res, next) => {
  try {
    console.log('body', req.body);
    const value = validateStartEmail(req.body);
    const user = await User.findOne({ where: { email: value.email } });
    if (user) {
      createError('email is already in use', 400);
    }
    res.status(201).json({ message: 'email pass' });
  } catch (err) {
    next(err);
  }
};
