// src/services/tickets.service.ts
import { Ticket, TicketFull, TicketStatus, TicketPriority } from '../models/ticket.model';
import { UsersService } from './users.service';
import { UserRole } from '../models/user.model';

// Simulation d'une base de données avec le champ order_fk ajouté
let tickets: Ticket[] = [
  {
    ticket_id: 1,
    order_fk: 101,  // Ajouté pour être compatible avec le guard
    title: 'Problème de connexion',
    description: 'Je ne parviens pas à me connecter à mon compte.',
    status: TicketStatus.OPEN,
    priority: TicketPriority.MEDIUM,
    user_id: 2,
    created_at: new Date(),
    updated_at: new Date()
  }
];

export class TicketsService {
  /**
   * Crée un nouveau ticket
   */
  static create(userId: number, ticketData: Omit<Ticket, 'ticket_id' | 'user_id' | 'created_at' | 'updated_at'>): Ticket {
    const newTicket: Ticket = {
      ...ticketData,
      ticket_id: tickets.length > 0 ? Math.max(...tickets.map(t => t.ticket_id)) + 1 : 1,
      user_id: userId,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    tickets.push(newTicket);
    return newTicket;
  }

  /**
   * Récupère la liste des tickets
   * Pour un client, seuls ses tickets sont retournés
   * Pour un administrateur, tous les tickets peuvent être retournés
   */
  static getAll(userId: number, includeAllUsers: boolean = false): Ticket[] {
    // Vérifier si l'utilisateur est un administrateur
    const user = UsersService.getById(userId, userId);
    
    if (!user) {
      throw new Error('Unauthorized');
    }
    
    // Si l'utilisateur est un client ou si l'administrateur ne veut voir que ses tickets
    if (user.role === UserRole.CLIENT || !includeAllUsers) {
      return tickets
        .filter(ticket => ticket.user_id === userId)
        .map(ticket => ({ ...ticket }));
    }
    
    // Si l'utilisateur est un administrateur et veut voir tous les tickets
    return tickets.map(ticket => ({ ...ticket }));
  }

  /**
   * Récupère un ticket par son ID
   * Un client ne peut accéder qu'à ses propres tickets
   */
  static getById(id: number, userId: number): Ticket | null {
    // Vérifier si l'utilisateur existe
    const user = UsersService.getById(userId, userId);
    
    if (!user) {
      throw new Error('Unauthorized');
    }
    
    const ticket = tickets.find(t => t.ticket_id === id);
    
    // Si le ticket n'existe pas
    if (!ticket) {
      return null;
    }
    
    // Si l'utilisateur est un client et le ticket ne lui appartient pas
    if (user.role === UserRole.CLIENT && ticket.user_id !== userId) {
      throw new Error('Unauthorized');
    }
    
    return { ...ticket };
  }

  /**
   * Récupère les informations détaillées d'un ticket
   * Un client ne peut accéder qu'à ses propres tickets
   */
  static getFullById(id: number, userId: number): TicketFull | null {
    // Récupérer le ticket
    const ticket = this.getById(id, userId);
    
    if (!ticket) {
      return null;
    }
    
    // Récupérer l'utilisateur associé au ticket
    const user = UsersService.getById(ticket.user_id, userId);
    
    if (!user) {
      return null;
    }
    
    // Créer le ticket détaillé avec les informations complètes de l'utilisateur
    const ticketFull: TicketFull = {
      ...ticket,
      user: {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role
      }
    };
    
    return ticketFull;
  }

  /**
   * Met à jour le statut d'un ticket
   * Seul un administrateur peut effectuer cette opération
   */
  static updateStatus(id: number, userId: number, newStatus: TicketStatus): boolean {
    // Vérifier si l'utilisateur est un administrateur
    const user = UsersService.getById(userId, userId);
    
    if (!user || user.role !== UserRole.ADMIN) {
      throw new Error('Unauthorized');
    }
    
    const ticketIndex = tickets.findIndex(t => t.ticket_id === id);
    
    // Si le ticket n'existe pas
    if (ticketIndex === -1) {
      return false;
    }
    
    // Mettre à jour le statut du ticket
    tickets[ticketIndex].status = newStatus;
    tickets[ticketIndex].updated_at = new Date();
    
    return true;
  }
}
