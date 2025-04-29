"use strict";
// src/utils/guards.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = isNumber;
exports.isString = isString;
exports.isUser = isUser;
exports.isTicket = isTicket;
/**
 * Validates if input is a number
 */
function isNumber(data) {
    return data !== undefined && data !== null && typeof data === 'number' && !isNaN(data);
}
/**
 * Validates if input is a string
 */
function isString(data) {
    return data !== undefined && data !== null && typeof data === 'string';
}
/**
 * Validates if input is a valid User object
 */
function isUser(data) {
    if (data && typeof data === 'object' &&
        (data.user_id === undefined || typeof data.user_id === 'number') &&
        'first_name' in data && typeof data.first_name === 'string' &&
        'last_name' in data && typeof data.last_name === 'string' &&
        'role' in data && typeof data.role === 'string' &&
        'status' in data && typeof data.status === 'string') {
        return true;
    }
    return false;
}
/**
 * Validates if input is a valid Ticket object
 */
function isTicket(data) {
    if (data && typeof data === 'object' &&
        (data.ticket_id === undefined || typeof data.ticket_id === 'number') &&
        'order_fk' in data && typeof data.order_fk === 'number' &&
        'title' in data && typeof data.title === 'string' &&
        'description' in data && typeof data.description === 'string' &&
        ('status' in data ? typeof data.status === 'string' : true)) {
        return true;
    }
    return false;
}
