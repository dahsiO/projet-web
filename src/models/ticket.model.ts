// src/models/ticket.model.ts

export enum TicketStatus {
    NEW = "NEW",
    IN_PROGRESS = "IN_PROGRESS",
    CLOSED = "CLOSED"
  }
  
  export enum TicketPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
  }
  
  export interface Ticket {
    id?: number;
    userId: number;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    createdAt?: Date;
    updatedAt?: Date;
    closedAt?: Date;
  }
  
  export interface TicketDTO {
    id: number;
    userId: number;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    createdAt: Date;
  }
  
  export interface TicketFullDTO extends TicketDTO {
    updatedAt: Date;
    closedAt?: Date;
  }
  
  export interface TicketCreateDTO {
    title: string;
    description: string;
    priority: TicketPriority;
  }
  
  export interface TicketUpdateDTO {
    title?: string;
    description?: string;
    status?: TicketStatus;
    priority?: TicketPriority;
  }