import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';

// Extend Request type to include user
declare global {
  namespace Express {
    interface Request {
      user: { id: string };
    }
  }
}

// Middleware to authenticate JWT token
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
      
      // Check if user exists
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Add user from payload to request object
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error during authentication' });
  }
};

// Middleware to check if user is admin
export const authorize = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get user from database
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if user has required role
      // This is a placeholder. In a real app, you'd check user roles
      // For example: if (!roles.includes(user.role))
      
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Server error during authorization' });
    }
  };
};