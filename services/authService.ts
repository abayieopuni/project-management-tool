import { PrismaClient, User as PrismaUser } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const authService = {
    // Register a new user
    registerUser: async (username: string, email: string, password: string): Promise<PrismaUser> => {
        // Check if the email is already registered
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('Email is already in use.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        return user;
    },

    // Log in an existing user
    loginUser: async (email: string, password: string): Promise<PrismaUser> => {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid email or password');
        }
        
        return user;
    }
};

// You can use `authService.registerUser` and `authService.loginUser` to access the methods.
export default authService; // Optional if you still want to import this module elsewhere.
