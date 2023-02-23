const express = require("express");
const paymentController = require("../controllers/payment-controller");

const router = express.Router();

router.post("/token", paymentController.createCus);

module.exports = router;
