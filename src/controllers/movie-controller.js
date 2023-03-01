const { Movie } = require('../models');

exports.getAllMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findAll();

    res.status(200).json({ movie });
  } catch (err) {
    next(err);
  }
};
