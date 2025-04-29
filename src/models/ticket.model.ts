// models/ticket.model.ts

export interface Ticket {
  ticket_id?: number;
  order_fk: number;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
}
