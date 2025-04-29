"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketsController = void 0;
// src/controllers/tickets.controller.ts
const express_1 = require("express");
const tickets_service_1 = require("../services/tickets.service");
exports.ticketsController = (0, express_1.Router)();
exports.ticketsController.post('/', (req, res) => {
    const ticket = req.body;
    const newTicket = tickets_service_1.TicketsService.create(ticket);
    res.status(201).json(newTicket);
});
exports.ticketsController.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const ticket = tickets_service_1.TicketsService.getById(id);
    if (!ticket)
        return res.status(404).send('Ticket not found');
    res.status(200).json(ticket);
});
exports.ticketsController.get('/', (_req, res) => {
    const tickets = tickets_service_1.TicketsService.getAll();
    res.status(200).json(tickets);
});
exports.ticketsController.put('/:id/status', (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const updated = tickets_service_1.TicketsService.updateStatus(id, status);
    if (!updated)
        return res.status(404).send('Ticket not found');
    res.status(200).send('Status updated');
});
