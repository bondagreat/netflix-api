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
    console.log(user);
    if (user) {
      User.update(value);
    }
    if (!user) {
      createError('invalid change password', 404);
    }
    // const isCorrect = await bcrypt.compare(currentPassword, user.password);
    // if (!isCorrect) {
    //   createError('Current password is incorrect', 400);
    // }
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
