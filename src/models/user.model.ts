// src/models/user.model.ts

export enum UserRole {
    VISITOR = "VISITOR",
    CUSTOMER = "CLIENT",
    ADMIN = "ADMIN"
  }
  // ADMIN can activ or desact an user
  export enum UserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
  }
  
  export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string; // Note: In a real application, this would be hashed
    role: UserRole;
    status: UserStatus;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    status: UserStatus;
  }
  
  export interface UserFullDTO extends UserDTO {
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface UserCreateDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: UserRole; // Optional because normal users can only create CUSTOMER accounts
  }
  
  export interface UserUpdateDTO {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    status?: UserStatus;
  }