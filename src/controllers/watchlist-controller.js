const { Watchlist, Movie } = require('../models');

exports.getWatchlist = async (req, res, next) => {
  try {
    const { profileId } = req.params;
    console.log(111, profileId);

    const watchlist = await Watchlist.findAll({
      where: { profileId: profileId },
      include: { model: Movie },
    });

    res.status(200).json({ watchlist });
  } catch (err) {
    next(err);
  }
};

exports.addWatchlist = async (req, res, next) => {
  try {
    const value = req.body;

    await Watchlist.create(value);

    res.status(200).json({ message: 'add watchlist complete' });
  } catch (err) {
    next(err);
  }
};

exports.deleteWatchlist = async (req, res, next) => {
  try {
    const { watchlistId } = req.params;

    await Watchlist.destroy({ where: { id: watchlistId } });

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
