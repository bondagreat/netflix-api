const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Admin } = require('../models');
const createError = require('../utils/create-error');
const { validateLogin } = require('../validators/auth-validators');

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);

    const admin = await Admin.findOne({
      where: { email: value.email },
    });

    if (!admin) {
      createError('invalid email or password', 400);
    }

    const isCorrect = await bcrypt.compare(value.password, admin.password);
    if (!isCorrect) {
      createError('invalid email or password', 400);
    }

    const accessToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
