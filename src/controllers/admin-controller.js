const {
  User,
  Transaction,
  Package,
  Movie,
  MovieGenre,
  Genre,
} = require('../models');

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

exports.getAllMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findAll({
      include: [
        {
          model: MovieGenre,
          include: [
            {
              model: Genre,
            },
          ],
        },
      ],
    });
    res.status(200).json({ movie });
  } catch (err) {
    next(err);
  }
};
