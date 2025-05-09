// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../services/users.service';
import { isProduct } from '../utils/guards'


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Skip auth for the root endpoint
  if (req.path === '/') {
    return next();
  }

  /**
 * Middleware to check if the user is an admin (for admin-only routes)
 */
function requireAdmi(req: Request, res: Response, next: Function) {
  if (req.query.idUser !== '1') {
  return res.status(403).json({ error: 'Access denied: admin only' });
  }
  next();
  }

/**
 * Middleware to validate product structure before create/update
 */
export function validateProduct(req: Request, res: Response, next: NextFunction) {
  if (!isProduct(req.body)) {
    return res.status(400).json({ error: 'Invalid product format' });
  }
  next();
}

/**
 * Middleware to validate product ID in URL params
 */
export function validateProductIdParam(req: Request, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id);
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }
  next();
}

/**
 * Middleware for logging product-related requests
 */
export function logProductRequest(req: Request, res: Response, next: NextFunction) {
  console.log(`[PRODUCT] ${req.method} ${req.originalUrl}`);
  next();
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
