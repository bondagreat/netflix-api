const express = require('express');
const adminController = require('../controllers/admin-controller');

const router = express.Router();

router.get('/getAllUser', adminController.getAllUser);
router.get('/getAllMovie', adminController.getAllMovie);

module.exports = router;
