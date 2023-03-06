const express = require('express');

const authAdminController = require('../controllers/auth-admin-controller');

const router = express.Router();

router.post('/login', authAdminController.login);

module.exports = router;
