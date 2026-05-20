const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');
const userController = require('../controller/userController');
const authController = require('../controller/authController');


router.get('/', authController.showSignupPage);
router.post('/signup', authController.validateSignup, authController.signupUser);
router.get('/login', authController.showLoginPage);
router.post('/login', authController.validateLogin, authController.loginUser);
router.get('/profile', (req, res) => res.render('profile'));
router.get('/api/profile', verifyToken, userController.getProfile);
router.put('/api/profile', verifyToken, upload.single('profile_image'), userController.updateProfile);

module.exports = router;