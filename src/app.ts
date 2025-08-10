import express, { Application, Request, Response } from 'express';
import userRoutes from './routes/user.routes'; // rutas del usuario
import { errorHandler } from './middlewares/errorHandler';

const APP: Application = express();

APP.use(express.json());

APP.get('/info', (req: Request, res: Response) => {
  res.status(200).json({
    project: 'Mi first API',
    author: 'JimmyRampage'
  });
});

APP.use('/api/users', userRoutes);

APP.use(errorHandler);

export default APP;