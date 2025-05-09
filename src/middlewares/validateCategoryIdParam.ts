import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to validate category ID in URL params
 */
export function validateCategoryIdParam(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  if (isNaN(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid category ID' });
  }

  next();
}
/**
 * Middleware to normalize req.params.id from either params or query (?id=)
 * Ensures req.params.id is always defined if one of the two is present
 */
export function resolveIdParam(req: Request, res: Response, next: NextFunction) {
  const idFromQuery = req.query.id;
  const idFromParams = req.params.id;

  // Use query if available and not already in params
  if (!idFromParams && idFromQuery && typeof idFromQuery === 'string') {
    req.params.id = idFromQuery;
  }

  next();
}

