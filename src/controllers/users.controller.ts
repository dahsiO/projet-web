import { Router, Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { User, UserRole } from '../models/user.model';

export const usersController = Router();

usersController.post('/', (req: Request, res: Response) => {
  try {
    const userData = {
      first_name: req.body.first_name || req.body.firstName || '',
      last_name: req.body.last_name || req.body.lastName || '',
      role: UserRole.CLIENT
    };
    
    const newUser = UsersService.create(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send('Invalid data');
  }
});
usersController.get('/:id', (req: Request, res: Response) => {
  const idUser = Number(req.query.idUser);
  
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send('Invalid ID');
  
  try {
    const user = UsersService.getById(id, idUser);
    if (!user) return res.status(404).send('User not found');
    res.status(200).json(user);
  } catch (error) {
    res.status(401).send('Unauthorized access');
  }
});

usersController.put('/', (req: Request, res: Response) => {
  const idUser = Number(req.query.idUser || req.body.idUser);
  
  
  try {
    const user = req.body as User;
    const updatedUser = UsersService.update(user, idUser);
    if (!updatedUser) return res.status(404).send('User not found');
    res.status(200).json(updatedUser);
  } catch (error: any) { // Correction ici: typer l'erreur comme 'any'
    if (error.message === 'Unauthorized') {
      return res.status(401).send('Unauthorized access');
    }
    res.status(400).send('Invalid data');
  }
});

usersController.delete('/:id', (req: Request, res: Response) => {
  const idUser = Number(req.query.idUser);
  
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send('Invalid ID');
  
  try {
    const result = UsersService.disable(id, idUser);
    if (!result) return res.status(404).send('User not found');
    res.status(200).send('User disabled');
  } catch (error) {
    res.status(401).send('Unauthorized access');
  }
});

usersController.get('/', (req: Request, res: Response) => {
  const idUser = Number(req.query.idUser);
  
  try {
    const users = UsersService.getAll(idUser);
    res.status(200).json(users);
  } catch (error) {
    res.status(401).send('Unauthorized access');
  }
})
