// src/models/user.model.ts

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client'
}

export enum UserStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled'
}

export interface User {
  user_id: number;
  first_name: string;  // Ajouté pour être compatible avec le guard
  last_name: string;   // Ajouté pour être compatible avec le guard
  role: UserRole;
  status: UserStatus;
  created_at: Date;
  updated_at: Date;
}
