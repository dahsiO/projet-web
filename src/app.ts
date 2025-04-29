import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { usersController } from './controllers/users.controller';
import { ticketsController } from './controllers/tickets.controller';
import { authMiddleware } from './middlewares/auth.middleware';

export const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenue sur l\'API Cozy Corner');
});

app.use(authMiddleware);
app.use('/users', usersController);
app.use('/tickets', ticketsController);
