"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsService = void 0;
const tickets = [];
let nextTicketId = 1;
class TicketsService {
    static create(ticket) {
        const newTicket = Object.assign(Object.assign({}, ticket), { ticket_id: nextTicketId++, status: 'OPEN' });
        tickets.push(newTicket);
        return newTicket;
    }
    static getById(id) {
        return tickets.find(t => t.ticket_id === id);
    }
    static getAll() {
        return tickets;
    }
    static updateStatus(id, status) {
        const ticket = tickets.find(t => t.ticket_id === id);
        if (!ticket)
            return false;
        ticket.status = status;
        return true;
    }
}
exports.TicketsService = TicketsService;
