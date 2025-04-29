// src/controllers/users.controller.ts
import { Router, Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';

export const usersController = Router();

usersController.post('/', (req: Request, res: Response) => {
  const user = req.body as Omit<User, 'user_id' | 'status'>;
  const newUser = UsersService.create(user);
  res.status(201).json(newUser);
});

usersController.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = UsersService.getById(id);
  if (!user) return res.status(404).send('User not found');
  res.status(200).json(user);
});

usersController.put('/', (req: Request, res: Response) => {
  const user = req.body as User;
  const updatedUser = UsersService.update(user);
  if (!updatedUser) return res.status(404).send('User not found');
  res.status(200).json(updatedUser);
});

usersController.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = UsersService.disable(id);
  if (!result) return res.status(404).send('User not found');
  res.status(200).send('User disabled');
});

usersController.get('/', (_req: Request, res: Response) => {
  const users = UsersService.getAll();
  res.status(200).json(users);
});
