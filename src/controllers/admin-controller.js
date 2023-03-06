const { User, Transaction, Package } = require('../models');

exports.getAllUser = async (req, res, next) => {
  try {
    const user = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Transaction,

          include: [
            {
              model: Package,
            },
          ],
        },
      ],
    });
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};
