import express, { Request, Response } from 'express';
import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { protectedMiddleware } from '../middleware/authMiddleware';

const router: Router = express.Router();

router.use((req: Request, res: Response, next) => {
    res.locals.user = req.user; 
    next();
});

// Home page
router.get('/', (req: Request, res: Response) => {
    res.render('index');
});

// GET login page
router.get('/login', (req: Request, res: Response) => {
    res.render('login');  
});

// POST login form
router.post('/login', loginUser);

// GET register page
router.get('/register', (req: Request, res: Response) => {
    res.render('register'); 
});

// POST register form
router.post('/register', registerUser);

// GET logout page
router.get('/logout', (req: Request, res: Response) => {
    res.clearCookie('token'); 
    res.redirect('/');  
});

// Protected route for user's dashboard
router.get('/dashboard', protectedMiddleware, (req: Request, res: Response) => {
    res.render('dashboard', { user: req.user });
});

export default router;
