// User Model
export interface User {
  userid: number;        // Primary Key
  first_name: string;    // NN (Not Null)
  last_name: string;     // NN
  role: UserRole;        // NN (ADMIN, CLIENT)
  email: string;         // NN
  password: string;      // NN (stocké de façon sécurisée/hashée)
  isActive: boolean;     // Pour la fonctionnalité de désactivation/réactivation
  createdAt: Date;       // Date de création du compte
  updatedAt: Date;       // Date de dernière mise à jour
}

// Enum pour les rôles possibles
export enum UserRole {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT"
}

// Simple DTO pour User (informations de base)
export interface UserDto {
  userid: number;
  first_name: string;
  last_name: string;
  role: UserRole;
  isActive: boolean;
}

// Full DTO pour User (informations détaillées)
export interface UserFullDto extends UserDto {
  email: string;
  createdAt: Date;
  updatedAt: Date;
  // Pas de mot de passe pour des raisons de sécurité
}