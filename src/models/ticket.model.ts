// src/models/ticket.model.ts
import { UserRole } from './user.model'; // Ajouter cet import
export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed'
}

export enum TicketPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface Ticket {
  ticket_id: number;
  order_fk: number;     // Ajouté pour être compatible avec le guard
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface TicketFull extends Ticket {
  user: {
    user_id: number;
    first_name: string;
    last_name: string;
    role: UserRole;
  };
}
