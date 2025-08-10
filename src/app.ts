import express, { Application, Request, Response } from 'express';

const APP: Application = express();

APP.use(express.json());

APP.get('/info', (req: Request, res: Response) => {
  res.status(200).json({
    project: 'Mi first API',
    author: 'JimmyRampage'
  });
});

export default APP;