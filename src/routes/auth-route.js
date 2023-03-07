const express = require('express');

const authController = require('../controllers/auth-controller');
const authenticate = require('../middlewares/authenticate');
const userController = require('../controllers/user-controller');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticate, authController.getMe);
router.patch('/edit', authenticate, authController.editAccount);

router.patch('/changePassword', authenticate, userController.updatePassword);

router.post('/startEmail', authController.startEmail);

module.exports = router;
