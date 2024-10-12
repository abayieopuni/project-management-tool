const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');  // Middleware to protect the route

// GET request for dashboard
router.get('/dashboard', protect, (req, res) => {
    res.render('dashboard',{ user: req.user });  // Render dashboard.pug if authenticated
});

module.exports = router;
