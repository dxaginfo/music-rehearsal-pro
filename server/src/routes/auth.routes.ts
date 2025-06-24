import { Router } from 'express';
import { login, register, getMe, refreshToken, logout } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateLogin, validateRegister } from '../middleware/validation.middleware';

const router = Router();

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validateRegister, register);

// @route   POST api/auth/login
// @desc    Login user and get token
// @access  Public
router.post('/login', validateLogin, login);

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authenticate, getMe);

// @route   POST api/auth/refresh
// @desc    Refresh authentication token
// @access  Public (with refresh token)
router.post('/refresh', refreshToken);

// @route   POST api/auth/logout
// @desc    Logout user and invalidate tokens
// @access  Private
router.post('/logout', authenticate, logout);

export default router;