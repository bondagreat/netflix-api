const { Transaction } = require('../models');

exports.getAllTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findAll();

    res.status(200).json({ transaction });
  } catch (err) {
    next(err);
  }
};
