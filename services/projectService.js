const Project = require('../models/project');

// Get all projects for a user
exports.getAllProjects = async (userId) => {
    return await Project.find({ members: userId });
};

// Create a new project
exports.createProject = async (name, description, userId) => {
    const project = new Project({ name, description, members: [userId] });
    await project.save();
    return project;
};
