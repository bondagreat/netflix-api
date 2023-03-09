const fs = require('fs');
const {
  Movie,
  MovieCast,
  Cast,
  MovieGenre,
  Genre,
  MovieMood,
  Mood,
  Age,
  Language,
} = require('../models');

exports.getAllMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findAll({
      include: [
        { model: MovieCast, include: { model: Cast } },
        { model: MovieGenre, include: { model: Genre } },
        { model: MovieMood, include: { model: Mood } },
        { model: Age },
        { model: Language },
      ],
    });

    res.status(200).json({ movie });
  } catch (err) {
    next(err);
  }
};

exports.streaming = (req, res) => {
  const path = `private/videos/${req.params.videoName}`;
  console.log(path, req.params, 'test');
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const head = {
    'Content-Length': fileSize,
    'Content-Type': 'video/mp4',
  };
  res.writeHead(200, head);
  fs.createReadStream(path).pipe(res);
};
