// src/services/users.service.ts
import { User, UserRole, UserStatus } from '../models/user.model';

// Simulation d'une base de données avec les champs mis à jour
let users: User[] = [
  {
    user_id: 1,
    first_name: 'Admin',
    last_name: 'User',
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 2,
    first_name: 'Client',
    last_name: 'Example',
    role: UserRole.CLIENT,
    status: UserStatus.ACTIVE,
    created_at: new Date(),
    updated_at: new Date()
  }
];

export class UsersService {
  /**
   * Crée un nouvel utilisateur
   */
  static create(userData: Omit<User, 'user_id' | 'status' | 'created_at' | 'updated_at'>): User {
    const newUser: User = {
      ...userData,
      user_id: users.length > 0 ? Math.max(...users.map(u => u.user_id)) + 1 : 1,
      status: UserStatus.ACTIVE,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    users.push(newUser);
    return newUser;
  }

  /**
   * Récupère un utilisateur par son ID
   * Si l'utilisateur est un client, il ne peut accéder qu'à ses propres informations
   */
  static getById(id: number, requestUserId: number): User | null {
    const requestUser = users.find(u => u.user_id === requestUserId);
    
    // Vérifier si l'utilisateur existe
    if (!requestUser) {
      throw new Error('Unauthorized');
    }
    
    const user = users.find(u => u.user_id === id);
    
    // Si l'utilisateur n'existe pas ou est désactivé
    if (!user || user.status === UserStatus.DISABLED) {
      return null;
    }
    
    // Si l'utilisateur est un client, il ne peut accéder qu'à ses propres informations
    if (requestUser.role === UserRole.CLIENT && requestUser.user_id !== id) {
      throw new Error('Unauthorized');
    }
    
    return { ...user };
  }

  /**
   * Met à jour un utilisateur
   * Si l'utilisateur est un client, il ne peut modifier que ses propres informations
   * Un client ne peut pas changer son rôle
   */
  static update(userData: User, requestUserId: number): User | null {
    const requestUser = users.find(u => u.user_id === requestUserId);
    
    // Vérifier si l'utilisateur existe
    if (!requestUser) {
      throw new Error('Unauthorized');
    }
    
    const userIndex = users.findIndex(u => u.user_id === userData.user_id);
    
    // Si l'utilisateur n'existe pas ou est désactivé
    if (userIndex === -1 || users[userIndex].status === UserStatus.DISABLED) {
      return null;
    }
    
    // Si l'utilisateur est un client
    if (requestUser.role === UserRole.CLIENT) {
      // Il ne peut modifier que ses propres informations
      if (requestUser.user_id !== userData.user_id) {
        throw new Error('Unauthorized');
      }
      
      // Il ne peut pas changer son rôle
      userData.role = requestUser.role;
    }
    
    // Mettre à jour l'utilisateur
    users[userIndex] = {
      ...userData,
      updated_at: new Date()
    };
    
    return { ...users[userIndex] };
  }

  /**
   * Désactive un compte utilisateur
   * Seul un administrateur peut effectuer cette opération
   */
  static disable(id: number, requestUserId: number): boolean {
    const requestUser = users.find(u => u.user_id === requestUserId);
    
    // Vérifier si l'utilisateur existe et est un administrateur
    if (!requestUser || requestUser.role !== UserRole.ADMIN) {
      throw new Error('Unauthorized');
    }
    
    const userIndex = users.findIndex(u => u.user_id === id);
    
    // Si l'utilisateur n'existe pas ou est déjà désactivé
    if (userIndex === -1 || users[userIndex].status === UserStatus.DISABLED) {
      return false;
    }
    
    // Désactiver l'utilisateur
    users[userIndex].status = UserStatus.DISABLED;
    users[userIndex].updated_at = new Date();
    
    return true;
  }

  /**
   * Récupère la liste des utilisateurs
   * Seul un administrateur peut effectuer cette opération
   */
  static getAll(requestUserId: number): User[] {
    const requestUser = users.find(u => u.user_id === requestUserId);
    
    // Vérifier si l'utilisateur existe et est un administrateur
    if (!requestUser || requestUser.role !== UserRole.ADMIN) {
      throw new Error('Unauthorized');
    }
    
    return users.map(user => ({ ...user }));
  }
}