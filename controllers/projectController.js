const asyncHandler = require('express-async-handler');
const projectService = require('../services/projectService');

// Get all projects for the authenticated user
exports.getAllProjects = asyncHandler(async (req, res) => {
    const projects = await projectService.getAllProjects(req.user.userId);
    res.json(projects);
});



// Create a new project
exports.createProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required.' });
    }
    const project = await projectService.createProject(name, description, req.user.userId);
    res.status(201).json(project);
});
