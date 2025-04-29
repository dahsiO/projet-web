import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const userId = req.headers['iduser'];
  if (!userId || isNaN(Number(userId))) {
    return res.status(401).json({ error: 'Unauthorized: idUser header missing or invalid' });
  }
  next();
}
