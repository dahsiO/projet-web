// src/services/users.service.ts
import { User } from '../models/user.model';

const users: User[] = [];
let nextUserId = 1;

export class UsersService {
  static create(user: Omit<User, 'user_id' | 'status'>): User {
    const newUser: User = { ...user, user_id: nextUserId++, status: 'ENABLED' };
    users.push(newUser);
    return newUser;
  }

  static getById(id: number): User | undefined {
    return users.find(u => u.user_id === id);
  }

  static getAll(): User[] {
    return users;
  }

  static update(user: User): User | undefined {
    const index = users.findIndex(u => u.user_id === user.user_id);
    if (index === -1) return undefined;
    users[index] = user;
    return user;
  }

  static disable(id: number): boolean {
    const user = users.find(u => u.user_id === id);
    if (!user) return false;
    user.status = 'DISABLED';
    return true;
  }
}
