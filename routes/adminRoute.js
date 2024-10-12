const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

// GET request for admin page (only accessible by admin users)
router.get('/admin', protect, admin, (req, res) => {
    res.render('admin');  // Render admin.pug if the user is an admin
});

module.exports = router;
