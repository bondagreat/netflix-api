const bcrypt = require('bcryptjs');
const { User } = require('../models');
const createError = require('../utils/create-error');

exports.updatePassword = async (req, res, next) => {
  try {
    const userId = req.user.id;

    console.log(userId);

    const user = await User.findByPk(userId);

    if (!user) {
      createError('User not found', 404);
    }

    const { currentPassword, newPassword } = req.body;

    console.log(currentPassword, newPassword);

    if (!currentPassword || !newPassword) {
      createError('Is not a password', 400);
    }

    const isCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isCorrect) {
      createError('Current password is incorrect', 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await User.update({ password: hashedPassword }, { where: { id: userId } });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
};
