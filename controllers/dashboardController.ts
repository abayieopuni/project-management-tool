import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as dashboardService from '../services/dashboardService'; // Import the dashboard service

// Get user's projects and tasks for the dashboard
export const getDashboardData = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id; // Assuming req.user contains the logged-in user's info

    // Fetch user's projects and tasks using the dashboard service
    const projects = await dashboardService.getUserProjects(userId);
    const tasks = await dashboardService.getUserTasks(userId);

    // Render dashboard with projects and tasks
    res.render('dashboard', { user: req.user, projects, tasks });
});
