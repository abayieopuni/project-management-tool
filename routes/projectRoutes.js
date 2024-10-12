const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// Get all projects (Protected route)
router.get('/', protect, projectController.getAllProjects);

// Create a new project (Protected route)
router.post('/', protect, projectController.createProject);

module.exports = router;
