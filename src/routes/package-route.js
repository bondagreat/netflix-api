const express = require('express');

const packageController = require('../controllers/package-controller');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/getAllPackage', authenticate, packageController.getAllPackage);

module.exports = router;
