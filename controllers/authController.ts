
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import authService from '../services/authService';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    try {
        // Attempt to register the user
        await authService.registerUser(username, email, password);
        
        // Redirect to the login page after successful registration
        res.redirect('./login?message=Registration successful. Please log in.');
    } catch (error) {
    
        if (error.message === 'Email is already in use.') {
            
            return res.redirect('./login?message=Email already registered. Please log in.');
        }

        
        res.status(500).json({ message: 'An error occurred during registration.' });
    }
});


// Log in an existing user
export const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const user = await authService.loginUser(email, password);
    
    // Ensure user is found before signing the token
    if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { // Ensure JWT_SECRET is a string
        expiresIn: '1h',
    });

    res.cookie('token', token, { httpOnly: true });
   
    res.redirect('/dashboard');
});
