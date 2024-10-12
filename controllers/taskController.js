const asyncHandler = require('express-async-handler');
const taskService = require('../services/taskService');

// Create a task for a project
exports.createTask = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { title, description, assignedTo } = req.body;
    const task = await taskService.createTask(title, description, assignedTo, projectId);
    res.status(201).json(task);
});

// Update task status
exports.updateTaskStatus = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { status } = req.body;
    const task = await taskService.updateTaskStatus(taskId, status);
    res.json(task);
});

// Get all tasks for a project
exports.getTasksForProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const tasks = await taskService.getTasksForProject(projectId);
    res.json(tasks);
});
