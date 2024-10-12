const Task = require('../models/task');
const Project = require('../models/project');

// Create a task for a project
exports.createTask = async (title, description, assignedTo, projectId) => {
    const project = await Project.findById(projectId);
    if (!project) throw new Error('Project not found');

    const task = new Task({ title, description, assignedTo, project: projectId });
    return await task.save();
};

// Update task status
exports.updateTaskStatus = async (taskId, status) => {
    const task = await Task.findById(taskId);
    if (!task) throw new Error('Task not found');

    task.status = status;
    return await task.save();
};

// Get all tasks for a project
exports.getTasksForProject = async (projectId) => {
    return await Task.find({ project: projectId }).populate('assignedTo', 'username');
};
