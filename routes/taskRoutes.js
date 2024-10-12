const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// Create a task within a project
router.post('/projects/:projectId/tasks', protect, taskController.createTask);

// Update task status
router.post('/tasks/:taskId/status', protect, taskController.updateTaskStatus);

// Get all tasks for a project
router.get('/projects/:projectId/tasks', protect, taskController.getTasksForProject);

module.exports = router;
