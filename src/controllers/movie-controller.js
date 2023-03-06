const {
  Movie,
  MovieCast,
  Cast,
  MovieGenre,
  Genre,
  MovieMood,
  Mood,
} = require('../models');

exports.getAllMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findAll({
      include: [
        { model: MovieCast, include: { model: Cast } },
        { model: MovieGenre, include: { model: Genre } },
        { model: MovieMood, include: { model: Mood } },
      ],
    });

    res.status(200).json({ movie });
  } catch (err) {
    next(err);
  }
};
