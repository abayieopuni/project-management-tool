import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch user's projects
export const getUserProjects = async (userId: number) => {
    const projects = await prisma.project.findMany({
        where: {
            memberships: {
                some: {
                    userId: userId,
                },
            },
        },
    });
    return projects;
};

// Fetch user's tasks
export const getUserTasks = async (userId: number) => {
    const tasks = await prisma.task.findMany({
        where: {
            userId: userId,
        },
    });
    return tasks;
};
