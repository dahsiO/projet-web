// src/utils/guards.ts

import { User } from '../models/user.model';
import { Ticket } from '../models/ticket.model';

/**
 * Validates if input is a number
 */
export function isNumber(data: any): data is number {
  return data !== undefined && data !== null && typeof data === 'number' && !isNaN(data);
}

/**
 * Validates if input is a string
 */
export function isString(data: any): data is string {
  return data !== undefined && data !== null && typeof data === 'string';
}

/**
 * Validates if input is a valid User object
 */
export function isUser(data: unknown): data is User {
  if (
    data && typeof data === 'object' &&
    ((data as User).user_id === undefined || typeof (data as User).user_id === 'number') &&
    'first_name' in data && typeof (data as User).first_name === 'string' &&
    'last_name' in data && typeof (data as User).last_name === 'string' &&
    'role' in data && typeof (data as User).role === 'string' &&
    'status' in data && typeof (data as User).status === 'string'
  ) {
    return true;
  }
  return false;
}

/**
 * Validates if input is a valid Ticket object
 */
export function isTicket(data: unknown): data is Ticket {
  if (
    data && typeof data === 'object' &&
    ((data as Ticket).ticket_id === undefined || typeof (data as Ticket).ticket_id === 'number') &&
    'order_fk' in data && typeof (data as Ticket).order_fk === 'number' &&
    'title' in data && typeof (data as Ticket).title === 'string' &&
    'description' in data && typeof (data as Ticket).description === 'string' &&
    ('status' in data ? typeof (data as Ticket).status === 'string' : true)
  ) {
    return true;
  }
  return false;
}