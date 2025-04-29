// src/controllers/tickets.controller.ts
import { Router, Request, Response } from 'express';
import { TicketsService } from '../services/tickets.service';
import { Ticket } from '../models/ticket.model';

export const ticketsController = Router();

ticketsController.post('/', (req: Request, res: Response) => {
  const ticket = req.body as Omit<Ticket, 'ticket_id' | 'status'>;
  const newTicket = TicketsService.create(ticket);
  res.status(201).json(newTicket);
});

ticketsController.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const ticket = TicketsService.getById(id);
  if (!ticket) return res.status(404).send('Ticket not found');
  res.status(200).json(ticket);
});

ticketsController.get('/', (_req: Request, res: Response) => {
  const tickets = TicketsService.getAll();
  res.status(200).json(tickets);
});

ticketsController.put('/:id/status', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const updated = TicketsService.updateStatus(id, status);
  if (!updated) return res.status(404).send('Ticket not found');
  res.status(200).send('Status updated');
});