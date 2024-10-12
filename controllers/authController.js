const asyncHandler = require('express-async-handler');
const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; 

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, role: user.role }, 
        JWT_SECRET, {
        expiresIn: '1h' // Token expires in 1 hour
    }); 
};

// Register a new user
exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await authService.registerUser(name, email, password);
    res.status(201).json({ message: 'User registered successfully' });
});

// Log in a user and send JWT token
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUser(email, password);
    
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const token = generateToken(user);
    
    res.cookie('token', token, { httpOnly: true });
    
    // Redirect the user to the dashboard after successful login
    res.redirect('/');
});
