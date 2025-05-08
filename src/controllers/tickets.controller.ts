// src/controllers/tickets.controller.ts
// src/controllers/tickets.controller.ts
import { Router, Request, Response } from 'express';
import { TicketsService } from '../services/tickets.service';
import { TicketStatus, TicketPriority } from '../models/ticket.model';
import { isTicket } from '../utils/guards';

export const ticketsController = Router();

ticketsController.post('/', (req: Request, res: Response) => {
  const idUser = Number(req.body.idUser);
  
  try {
    // Assurer que les champs requis par le guard sont présents
    const ticketData = {
      order_fk: req.body.order_fk || 0, // Valeur par défaut pour order_fk
      title: req.body.title,
      description: req.body.description,
      status: TicketStatus.OPEN, // Par défaut, les nouveaux tickets sont ouverts
      priority: req.body.priority || TicketPriority.MEDIUM // Priorité par défaut si non spécifiée
    };
    
    const newTicket = TicketsService.create(idUser, ticketData);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(400).send('Invalid data');
  }
});

// Reste du contrôleur...

ticketsController.get('/', (req: Request, res: Response) => {
  const idUser = Number(req.query.idUser);
  
  const includeAllUsers = req.query.includeAllUsers === 'true';
  try {
    const tickets = TicketsService.getAll(idUser, includeAllUsers);
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).send('Invalid parameter');
  }
});

ticketsController.get('/:id', (req: Request, res: Response) => {
  const idUser = Number(req.query.idUser);
  
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send('Invalid ID');
  
  try {
    const ticket = TicketsService.getById(id, idUser);
    if (!ticket) return res.status(404).send('Ticket not found');
    res.status(200).json(ticket);
  } catch (error) {
    res.status(401).send('Unauthorized access');
  }
});

ticketsController.get('/:id/full', (req: Request, res: Response) => {
  const idUser = Number(req.query.idUser);
  
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send('Invalid ID');
  
  try {
    const ticket = TicketsService.getFullById(id, idUser);
    if (!ticket) return res.status(404).send('Ticket not found');
    res.status(200).json(ticket);
  } catch (error) {
    res.status(401).send('Unauthorized access');
  }
});

ticketsController.put('/:id/status', (req: Request, res: Response) => {
  const idUser = Number(req.query.idUser);
  
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send('Invalid ID');
  
  const newStatus = req.body.status;
  
  try {
    const result = TicketsService.updateStatus(id, idUser, newStatus);
    if (!result) return res.status(404).send('Ticket not found');
    res.status(200).send('Status updated');
  } catch (error) {
    res.status(401).send('Unauthorized access');
  }
});