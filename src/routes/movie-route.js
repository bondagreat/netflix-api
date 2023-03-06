const express = require('express');

const movieController = require('../controllers/movie-controller');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/getAllMovie', authenticate, movieController.getAllMovie);

module.exports = router;
