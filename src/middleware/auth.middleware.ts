//brouillion 








// src/middleware/auth.middleware.ts

import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/user.model";
import { LoggerService } from "../services/logger.service";

// Extend the Express Request interface to include user information
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: UserRole;
      };
    }
  }
}

// Simple token-based authentication for demo purposes
// In a real application, you would use JWT or sessions
export class AuthMiddleware {
  // In-memory token store (should be a proper solution in production)
  private static tokens: Map<string, { id: number; role: UserRole }> = new Map();

  /**
   * Generate a token for a user
   */
  public static generateToken(userId: number, role: UserRole): string {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.tokens.set(token, { id: userId, role });
    return token;
  }

  /**
   * Middleware to authenticate requests
   */
  public static authenticate(req: Request, res: Response, next: NextFunction): void {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      
      if (!token) {
        res.status(401).json({ message: "Authentication required" });
        return;
      }
      
      const user = this.tokens.get(token);
      if (!user) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }
      
      // Set user information on the request for use in controllers
      req.user = user;
      next();
    } catch (error) {
      LoggerService.error(`Authentication error: ${error}`);
      res.status(500).json({ message: "Authentication error" });
    }
  }

  /**
   * Middleware to authorize admin access
   */
  public static authorizeAdmin(req: Request, res: Response, next: NextFunction): void {
    if (!req.user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }
    
    if (req.user.role !== UserRole.ADMIN) {
      res.status(403).json({ message: "Admin access required" });
      return;
    }
    
    next();
  }

  /**
   * Middleware to authorize resource owner or admin
   */
  public static authorizeOwnerOrAdmin(req: Request, res: Response, next: NextFunction): void {
    if (!req.user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }
    
    // Admin can access any resource
    if (req.user.role === UserRole.ADMIN) {
      next();
      return;
    }
    
    // Check if the user is accessing their own resource
    const resourceUserId = parseInt(req.params.userId || req.params.id);
    if (req.user.id === resourceUserId) {
      next();
      return;
    }
    
    res.status(403).json({ message: "Access denied" });
  }

  /**
   * Middleware to authorize customers
   */
  public static authorizeCustomer(req: Request, res: Response, next: NextFunction): void {
    if (!req.user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }
    
    if (req.user.role !== UserRole.CUSTOMER && req.user.role !== UserRole.ADMIN) {
      res.status(403).json({ message: "Customer access required" });
      return;
    }
    
    next();
  }

  /**
   * Invalidate a token (logout)
   */
  public static invalidateToken(token: string): boolean {
    return this.tokens.delete(token);
  }
}