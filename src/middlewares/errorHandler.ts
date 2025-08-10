import { Request, Response, NextFunction } from "express";
import { AppError } from '../utils/AppError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // Util para debug

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  // Para errores no controlados
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};