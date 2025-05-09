// src/guards/product.guard.ts


export function isProduct(data: any): boolean {
    return (
      typeof data === 'object' && data !== null&&
      typeof data.name === 'string' &&
      typeof data.description === 'string' &&
      typeof data.price === 'number' &&
      typeof data.category === 'number'
    );
  }
  
  // src/guards/category.guard.ts
  
  export function isCategory(data: any): boolean {
    return (
      
      
      typeof data === 'object' && data !== null &&
      typeof data.name === 'string' &&
      typeof data.description === 'string'
    );
  }
  
  // src/guards/user.guard.ts
  
  export function isUser(data: any): boolean {
    return (
      typeof data === 'object' && data !== null &&
      typeof data.first_name === 'string' &&
      typeof data.last_name === 'string' &&
      typeof data.role === 'string' &&
      (data.role === 'client' || data.role === 'admin')
    );
  }
  
  export function isUserUpdate(data: any): boolean {
    return (
      typeof data === 'object' && data !== null &&
      (typeof data.first_name === 'string' || data.first_name === undefined) &&
      (typeof data.last_name === 'string' || data.last_name === undefined)
    );
  }
  
  export function isValidId(id: any): boolean {
    return typeof id === 'number' && id > 0;
  }
  
  import { TicketStatus, TicketPriority } from '../models/ticket.model';

export function isTicket(data: any): boolean {
  return (
    typeof data === 'object' && data !== null &&
    typeof data.order_fk === 'number' &&
    typeof data.title === 'string' &&
    typeof data.description === 'string' &&
    (data.status === undefined || Object.values(TicketStatus).includes(data.status)) &&
    (data.priority === undefined || Object.values(TicketPriority).includes(data.priority))
  );
}
  

  