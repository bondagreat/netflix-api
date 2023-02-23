const { Package } = require('../models');

exports.getAllPackage = async (req, res, next) => {
  try {
    const package = await Package.findAll();

    res.status(200).json({ package });
  } catch (err) {
    next(err);
  }
};
