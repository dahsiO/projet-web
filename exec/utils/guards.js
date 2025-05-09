"use strict";
// src/guards/product.guard.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProduct = isProduct;
exports.isCategory = isCategory;
exports.isUser = isUser;
exports.isUserUpdate = isUserUpdate;
exports.isValidId = isValidId;
exports.isTicket = isTicket;
function isProduct(data) {
    return (typeof data === 'object' && data !== null &&
        typeof data.name === 'string' &&
        typeof data.description === 'string' &&
        typeof data.price === 'number' &&
        typeof data.category === 'number');
}
// src/guards/category.guard.ts
function isCategory(data) {
    return (typeof data === 'object' && data !== null &&
        typeof data.name === 'string' &&
        typeof data.description === 'string');
}
// src/guards/user.guard.ts
function isUser(data) {
    return (typeof data === 'object' && data !== null &&
        typeof data.first_name === 'string' &&
        typeof data.last_name === 'string' &&
        typeof data.role === 'string' &&
        (data.role === 'client' || data.role === 'admin'));
}
function isUserUpdate(data) {
    return (typeof data === 'object' && data !== null &&
        (typeof data.first_name === 'string' || data.first_name === undefined) &&
        (typeof data.last_name === 'string' || data.last_name === undefined));
}
function isValidId(id) {
    return typeof id === 'number' && id > 0;
}
const ticket_model_1 = require("../models/ticket.model");
function isTicket(data) {
    return (typeof data === 'object' && data !== null &&
        typeof data.order_fk === 'number' &&
        typeof data.title === 'string' &&
        typeof data.description === 'string' &&
        (data.status === undefined || Object.values(ticket_model_1.TicketStatus).includes(data.status)) &&
        (data.priority === undefined || Object.values(ticket_model_1.TicketPriority).includes(data.priority)));
}
