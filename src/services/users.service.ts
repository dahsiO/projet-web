// src/services/users.service.ts
import { User, UserRole, UserStatus } from '../models/user.model';

// Simulation 
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
   * new user
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
   * get user by id
   */
  static getById(id: number, requestUserId: number): User | null {
    const requestUser = users.find(u => u.user_id === requestUserId);
    
    
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
   *update 
   */
  static update(userData: User, requestUserId: number): User | null {
    const requestUser = users.find(u => u.user_id === requestUserId);
    
    //user existe
    if (!requestUser) {
      throw new Error('Unauthorized');
    }
    
    const userIndex = users.findIndex(u => u.user_id === userData.user_id);
    
    // !user  existe
    if (userIndex === -1 || users[userIndex].status === UserStatus.DISABLED) {
      return null;
    }
    
    
    if (requestUser.role === UserRole.CLIENT) {
      
      if (requestUser.user_id !== userData.user_id) {
        throw new Error('Unauthorized');
      }
      
      
      userData.role = requestUser.role;
    }
    
    // update
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
    
    
    if (!requestUser || requestUser.role !== UserRole.ADMIN) {
      throw new Error('Unauthorized');
    }
    
    const userIndex = users.findIndex(u => u.user_id === id);
    
    
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