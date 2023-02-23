const express = require('express');

const transactionController = require('../controllers/transaction-controller');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get(
  '/getAllTransaction',
  authenticate,
  transactionController.getAllTransaction
);

module.exports = router;
