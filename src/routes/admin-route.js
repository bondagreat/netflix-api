const express = require('express');

const adminController = require('../controllers/admin-controller');
const authenticateAdmin = require('../middlewares/authenticate-admin');
const upload = require('../middlewares/upload');
const uploadVideo = require('../middlewares/upload-video');

const router = express.Router();

router.get('/getAllUser', authenticateAdmin, adminController.getAllUser);
router.get('/getAllMovie', authenticateAdmin, adminController.getAllMovie);
router.get('/getMood', authenticateAdmin, adminController.getMood);
router.get('/getGenre', authenticateAdmin, adminController.getGenre);
router.get('/getCast', authenticateAdmin, adminController.getCast);
router.get('/getAge', authenticateAdmin, adminController.getAge);
router.get('/getLanguage', authenticateAdmin, adminController.getLanguage);

router.post('/addMovie', authenticateAdmin, adminController.addMovie);
router.patch(
  '/addCover',
  authenticateAdmin,
  upload.single('photo'),
  adminController.addCover
);
router.patch(
  '/addLogo',
  authenticateAdmin,
  upload.single('photo'),
  adminController.addLogo
);
router.patch(
  '/addVideo',
  authenticateAdmin,
  uploadVideo.single('video'),
  adminController.addVideo
);
router.patch(
  '/addTrailer',
  authenticateAdmin,
  uploadVideo.single('video'),
  adminController.addTrailer
);

router.delete(
  '/deleteMovie/:id',
  authenticateAdmin,
  adminController.deleteMovie
);

module.exports = router;
