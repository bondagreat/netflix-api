const express = require('express');

const profileController = require('../controllers/profile-controller');
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post(
  '/addProfile',
  authenticate,
  upload.single('photo'),
  profileController.addProfile
);
router.patch(
  '/editProfile',
  authenticate,
  upload.single('photo'),
  profileController.editProfile
);
router.delete(
  '/deleteProfile/:id',
  authenticate,
  profileController.deleteProfile
);

module.exports = router;
