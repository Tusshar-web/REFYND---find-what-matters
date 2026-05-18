const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const authController = require('../controller/authController');


router.get('/', authController.showSignupPage);
router.post('/signup', authController.validateSignup, authController.signupUser);
router.get('/login', authController.showLoginPage);
router.post('/login', authController.validateLogin, authController.loginUser);

module.exports = router;