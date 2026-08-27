import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request { userId?: string }
export function requireAuth(request: AuthRequest, response: Response, next: NextFunction) {
  const token = request.headers.authorization?.replace('Bearer ', '');
  if (!token) return response.status(401).json({ error: 'Authentication required' });
  try { request.userId = (jwt.verify(token, process.env.JWT_SECRET ?? 'development-secret') as { userId: string }).userId; next(); }
  catch { return response.status(401).json({ error: 'Invalid token' }); }
}