const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/auth');

// Public route — login
router.post('/login', authController.login);

// Protected route — get current user
router.get('/me', verifyToken, authController.me);

module.exports = router;
