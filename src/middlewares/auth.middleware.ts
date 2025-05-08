// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../services/users.service';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Skip auth for the root endpoint
  if (req.path === '/') {
    return next();
  }

  // Get user ID from query or body
  const idUserFromQuery = req.query.idUser;
  const idUserFromBody = req.body?.idUser;
  
  const idUser = idUserFromQuery || idUserFromBody;

  if (!idUser) {
    return res.status(401).send('Authentication required: idUser is missing');
  }

  try {
    // Validate that the user exists
    const userId = Number(idUser);
    
    if (isNaN(userId)) {
      return res.status(400).send('Invalid idUser format');
    }

    // Check if the user exists (by trying to get the user by ID)
    const user = UsersService.getById(userId, userId);
    
    if (!user) {
      return res.status(401).send('Authentication failed: User not found');
    }

    // Store user info in request for later use
    (req as any).authenticatedUser = user;
    
    next();
  } catch (error) {
    return res.status(401).send('Authentication failed');
  }
};
