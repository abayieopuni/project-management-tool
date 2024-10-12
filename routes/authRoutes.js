const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// GET login page
router.get('/login', (req, res) => {
    res.render('login');  // Render login.pug
});

// POST login form
router.post('/login', authController.loginUser);

// GET register page
router.get('/register', (req, res) => {
    res.render('register');  // Render register.pug
});

// POST register form
router.post('/register', authController.registerUser);

// GET logout page
router.get('/logout', (req, res) => {
    res.redirect('/auth/login');  // Redirect to login after logout (handled by client-side)
});

module.exports = router;
