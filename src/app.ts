import express, { Application, Request, Response } from 'express';
import userRoutes from './routes/user.routes'; // rutas del usuario

const APP: Application = express();

APP.use(express.json());

APP.get('/info', (req: Request, res: Response) => {
  res.status(200).json({
    project: 'Mi first API',
    author: 'JimmyRampage'
  });
});

APP.use('/api/users', userRoutes);

export default APP;