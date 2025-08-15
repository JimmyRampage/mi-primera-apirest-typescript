import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { AppError } from "../utils/AppError";

interface JwtPayload {
  id: number;
  email: string;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  const authHeader = req.headers['authorization'] as string;

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }
  if (!token) {
    return next(new AppError(401, 'No estás autorizado. Inicia sesión'));
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET no está definido');
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.user = { id: decoded.id, email: decoded.email };
    next()
  } catch (error) {
    return next(new AppError(401, 'Token no válido o expirado'));
  }
}