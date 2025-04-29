// src/services/tickets.service.ts
import { Ticket } from '../models/ticket.model';

const tickets: Ticket[] = [];
let nextTicketId = 1;

export class TicketsService {
  static create(ticket: Omit<Ticket, 'ticket_id' | 'status'>): Ticket {
    const newTicket: Ticket = { ...ticket, ticket_id: nextTicketId++, status: 'OPEN' };
    tickets.push(newTicket);
    return newTicket;
  }

  static getById(id: number): Ticket | undefined {
    return tickets.find(t => t.ticket_id === id);
  }

  static getAll(): Ticket[] {
    return tickets;
  }

  static updateStatus(id: number, status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED'): boolean {
    const ticket = tickets.find(t => t.ticket_id === id);
    if (!ticket) return false;
    ticket.status = status;
    return true;
  }
}
