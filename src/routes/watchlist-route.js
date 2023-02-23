const express = require('express');

const watchlistController = require('../controllers/watchlist-controller');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get(
  '/getWatchlist/:profileId',
  authenticate,
  watchlistController.getWatchlist
);
router.post('/addWatchlist', authenticate, watchlistController.addWatchlist);
router.delete(
  '/deleteWatchlist/:watchlistId',
  authenticate,
  watchlistController.deleteWatchlist
);

module.exports = router;
