const fs = require('fs');
const {
  User,
  Transaction,
  Package,
  Movie,
  MovieGenre,
  Genre,
  MovieMood,
  Mood,
  MovieCast,
  Cast,
  Age,
  Language,
} = require('../models');
const cloudinary = require('../utils/cloudinary');

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

exports.getMood = async (req, res, next) => {
  try {
    const mood = await Mood.findAll();

    res.status(200).json({ mood });
  } catch (err) {
    next(err);
  }
};

exports.getGenre = async (req, res, next) => {
  try {
    const genre = await Genre.findAll();

    res.status(200).json({ genre });
  } catch (err) {
    next(err);
  }
};

exports.getCast = async (req, res, next) => {
  try {
    const cast = await Cast.findAll();

    res.status(200).json({ cast });
  } catch (err) {
    next(err);
  }
};

exports.getAge = async (req, res, next) => {
  try {
    const age = await Age.findAll();

    res.status(200).json({ age });
  } catch (err) {
    next(err);
  }
};

exports.getLanguage = async (req, res, next) => {
  try {
    const language = await Language.findAll();

    res.status(200).json({ language });
  } catch (err) {
    next(err);
  }
};

exports.addMovie = async (req, res, next) => {
  try {
    const input = req.body;
    const genre = req.body.genre;
    const cast = req.body.cast;
    const mood = req.body.mood;
    const newMovie = await Movie.create({
      name: input.name,
      release: input.release,
      length: input.length,
      description: input.description,
      ageId: input.ageId,
      languageId: input.languageId,
    });

    for (let i of genre) {
      await MovieGenre.create({ movieId: newMovie.id, genreId: i.value });
    }

    for (let i of cast) {
      await MovieCast.create({ movieId: newMovie.id, castId: i.value });
    }

    for (let i of mood) {
      await MovieMood.create({ movieId: newMovie.id, moodId: i.value });
    }

    res.status(200).json({ newMovie });
  } catch (err) {
    next(err);
  }
};

exports.addCover = async (req, res, next) => {
  try {
    const input = JSON.parse(req.body.input);
    const photo = await cloudinary.upload(req.file.path);
    await Movie.update({ cover: photo }, { where: { id: input } });
    fs.unlinkSync(req.file.path);

    res.status(200).json({ message: 'add cover success' });
  } catch (err) {
    next(err);
  }
};

exports.addLogo = async (req, res, next) => {
  try {
    const input = JSON.parse(req.body.input);
    const photo = await cloudinary.upload(req.file.path);
    await Movie.update({ logo: photo }, { where: { id: input } });
    fs.unlinkSync(req.file.path);

    res.status(200).json({ message: 'add logo success' });
  } catch (err) {
    next(err);
  }
};

exports.addVideo = async (req, res, next) => {
  try {
    const input = JSON.parse(req.body.input);
    await Movie.update({ movie: req.file.filename }, { where: { id: input } });

    res.status(200).json({ message: 'add movie success' });
  } catch (err) {
    next(err);
  }
};

exports.addTrailer = async (req, res, next) => {
  try {
    const input = JSON.parse(req.body.input);
    await Movie.update(
      { trailer: req.file.filename },
      { where: { id: input } }
    );

    res.status(200).json({ message: 'add trailer success' });
  } catch (err) {
    next(err);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    await MovieCast.destroy({ where: { movieId: id } });
    await MovieGenre.destroy({ where: { movieId: id } });
    await MovieMood.destroy({ where: { movieId: id } });
    await Movie.destroy({ where: { id: id } });

    res.status(204).json({ message: 'movie delete success' });
  } catch (err) {
    next(err);
  }
};

exports.editMovie = async (req, res, next) => {
  try {
    const input = req.body;
    const newMovie = await Movie.update(input, { where: { id: req.body.id } });

    res.status(200).json({ newMovie });
  } catch (err) {
    next(err);
  }
};

exports.editCover = async (req, res, next) => {
  try {
    const input = JSON.parse(req.body.input);

    const movie = await Movie.findOne({ where: { id: input.id } });
    const movieCover = movie.cover;
    const publicId = cloudinary.getPublicId(movieCover);
    const photo = await cloudinary.upload(req.file.path, publicId);
    input.cover = photo;

    await Movie.update(input, { where: { id: input } });
    fs.unlinkSync(req.file.path);

    const updatedMovie = await Movie.findOne({ where: { id: input.id } });

    res.status(200).json({ updatedMovie });
  } catch (err) {
    next(err);
  }
};

exports.editLogo = async (req, res, next) => {
  try {
    const input = JSON.parse(req.body.input);

    const movie = await Movie.findOne({ where: { id: input.id } });
    const movieLogo = movie.logo;
    const publicId = cloudinary.getPublicId(movieLogo);
    const photo = await cloudinary.upload(req.file.path, publicId);
    input.logo = photo;

    await Movie.update(input, { where: { id: input } });
    fs.unlinkSync(req.file.path);

    const updatedMovie = await Movie.findOne({ where: { id: input.id } });

    res.status(200).json({ updatedMovie });
  } catch (err) {
    next(err);
  }
};

exports.editVideo = async (req, res, next) => {
  try {
    const input = JSON.parse(req.body.input);
    const oldMovie = await Movie.findOne({ where: { id: input.id } });
    fs.unlinkSync(`private/videos/${oldMovie.movie}`);
    await Movie.update(
      { movie: req.file.filename },
      { where: { id: input.id } }
    );

    const updatedMovie = await Movie.findOne({ where: { id: input.id } });

    res.status(200).json({ updatedMovie });
  } catch (err) {
    next(err);
  }
};

exports.editTrailer = async (req, res, next) => {
  try {
    const input = JSON.parse(req.body.input);
    const oldTrailer = await Movie.findOne({ where: { id: input.id } });
    fs.unlinkSync(`private/videos/${oldTrailer.trailer}`);
    await Movie.update(
      { trailer: req.file.filename },
      { where: { id: input.id } }
    );

    const updatedMovie = await Movie.findOne({ where: { id: input.id } });

    res.status(200).json({ updatedMovie });
  } catch (err) {
    next(err);
  }
};
