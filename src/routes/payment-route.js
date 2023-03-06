const express = require('express');
const authenticate = require('../middlewares/authenticate');
const paymentController = require('../controllers/payment-controller');

const router = express.Router();

router.post('/token', authenticate, paymentController.createCus);

module.exports = router;
