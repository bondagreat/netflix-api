const bcrypt = require('bcryptjs');
const { User } = require('../models');
const createError = require('../utils/create-error');

exports.updatePassword = async (req, res, next) => {
  try {
    const value = req.body;
    const userId = req.user.id;
    // const { currentPassword, newPassword } = req.body;
    console.log(userId);
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    console.log(value);

    if (!user) {
      createError('invalid change password', 404);
    }
    const isCorrect = await bcrypt.compare(
      value.currentPassword,
      user.password
    );
    if (!isCorrect) {
      createError('Current password is incorrect', 400);
    }

    if (isCorrect && user) {
      const hashNewPassword = await bcrypt.hash(value.newPassword, 12);
      console.log(hashNewPassword);
      await user.update({ password: hashNewPassword });
    }

    // // const { currentPassword, newPassword } = req.body;
    // console.log(currentPassword, newPassword);
    // if (!currentPassword || !newPassword) {
    //   createError('It is not password', 404);
    // }

    // const isCorrect = await bcrypt.compare(currentPassword, user.password);
    // if (!isCorrect) {
    //   createError('Current password is not correct', 400);
    // }

    res.status(201).json({ message: 'Password changed complete' });
  } catch (err) {
    next(err);
  }
};

exports.updateEmail = async (req, res, next) => {
  try {
    const value = req.body;
    const userId = req.user.id;

    console.log(userId);
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    const isCorrect = await bcrypt.compare(
      value.confirmPassword,
      user.password
    );
    if (!isCorrect) {
      createError('Current password is incorrect', 400);
    }
    const checkEmail = user.email === value.currentEmail;
    console.log(checkEmail, isCorrect);
    if (!checkEmail) {
      createError('Email is invalid', 400);
    }
    if (isCorrect && checkEmail) {
      await user.update({ email: value.newEmail });
    }

    res.status(200).json({ message: 'Change email to be success' });
  } catch (err) {
    next(err);
  }
};

exports.updatePhone = async (req, res, next) => {
  try {
    const value = req.body;
    const userId = req.user.id;
    console.log(userId);
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    const isCorrect = await bcrypt.compare(
      value.confirmPassword,
      user.password
    );
    if (!isCorrect) {
      createError('Current password is incorrect', 400);
    }

    const checkPhone = user.phone === value.currentPhone;
    console.log(checkPhone, isCorrect);
    if (!checkPhone) {
      createError('Phone is invalid', 400);
    }
    if (isCorrect && checkPhone) {
      await user.update({ phone: value.newPhone });
    }

    res.status(200).json({ message: 'Change phone number to be success' });
  } catch (err) {
    next(err);
  }
};
