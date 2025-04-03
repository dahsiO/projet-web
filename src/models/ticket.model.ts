// Enum pour les statuts de ticket
export enum TicketStatus {
  NOUVEAU = "NOUVEAU",
  EN_COURS = "EN_COURS",
  FERME = "FERMÉ"
}

// Ticket Model
export interface Ticket {
  ticketid: number;      // Primary Key
  title: string;         // NN
  description: string;   // NN
  status: TicketStatus;  // NN (NOUVEAU, EN_COURS, FERMÉ)
  user: number;          // Foreign Key (NN) - référence à userid
  order: number;         // Foreign Key (NN) - référence à orderid
  createdAt: Date;       // Date de création du ticket
  updatedAt: Date;       // Date de dernière mise à jour
  responseText?: string; // Réponse de l'administrateur (optionnel)
  closedAt?: Date;       // Date de fermeture (optionnel)
}

// Simple DTO pour Ticket (informations de base)
export interface TicketDto {
  ticketid: number;
  title: string;
  status: TicketStatus;
  createdAt: Date;
}

// Full DTO pour Ticket (informations détaillées)
export interface TicketFullDto extends TicketDto {
  description: string;
  user: number;          // ID de l'utilisateur
  order: number;         // ID de la commande associée
  responseText?: string;
  updatedAt: Date;
  closedAt?: Date;
}