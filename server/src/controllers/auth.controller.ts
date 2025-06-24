import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import logger from '../utils/logger';

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, phone, timeZone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      phone: phone || null,
      timeZone: timeZone || 'UTC'
    });

    // Generate JWT token
    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Return user data and token
    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        timeZone: user.timeZone,
        avatarUrl: user.avatarUrl
      },
      token,
      refreshToken
    });
  } catch (error) {
    logger.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
};

// @route   POST api/auth/login
// @desc    Login user and get token
// @access  Public
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Return user data and token
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        timeZone: user.timeZone,
        avatarUrl: user.avatarUrl
      },
      token,
      refreshToken
    });
  } catch (error) {
    logger.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    logger.error('Get user error:', error);
    return res.status(500).json({ message: 'Server error getting user data' });
  }
};

// @route   POST api/auth/refresh
// @desc    Refresh authentication token
// @access  Public (with refresh token)
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token is required' });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refresh_secret') as { id: string };
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    // Generate new tokens
    const newToken = generateToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    return res.status(200).json({
      token: newToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    logger.error('Token refresh error:', error);
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

// @route   POST api/auth/logout
// @desc    Logout user and invalidate tokens
// @access  Private
export const logout = async (req: Request, res: Response) => {
  try {
    // In a real implementation, you would invalidate the token in a token blacklist
    // Here we just return a successful response as JWT is stateless
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    logger.error('Logout error:', error);
    return res.status(500).json({ message: 'Server error during logout' });
  }
};

// Generate JWT Token
const generateToken = (userId: string): string => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
};

// Generate Refresh Token
const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET || 'refresh_secret',
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
};