const express = require('express');
const adminController = require('../controllers/admin-controller');

const router = express.Router();

router.get('/getAllUser', adminController.getAllUser);

module.exports = router;
