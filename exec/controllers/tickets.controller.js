"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketsController = void 0;
// src/controllers/tickets.controller.ts
// src/controllers/tickets.controller.ts
const express_1 = require("express");
const tickets_service_1 = require("../services/tickets.service");
const ticket_model_1 = require("../models/ticket.model");
exports.ticketsController = (0, express_1.Router)();
exports.ticketsController.post('/', (req, res) => {
    const idUser = Number(req.body.idUser);
    try {
        // Assurer que les champs requis par le guard sont présents
        const ticketData = {
            order_fk: req.body.order_fk || 0, // Valeur par défaut pour order_fk
            title: req.body.title,
            description: req.body.description,
            status: ticket_model_1.TicketStatus.OPEN, // Par défaut, les nouveaux tickets sont ouverts
            priority: req.body.priority || ticket_model_1.TicketPriority.MEDIUM // Priorité par défaut si non spécifiée
        };
        const newTicket = tickets_service_1.TicketsService.create(idUser, ticketData);
        res.status(201).json(newTicket);
    }
    catch (error) {
        res.status(400).send('Invalid data');
    }
});
// Reste du contrôleur...
exports.ticketsController.get('/', (req, res) => {
    const idUser = Number(req.query.idUser);
    const includeAllUsers = req.query.includeAllUsers === 'true';
    try {
        const tickets = tickets_service_1.TicketsService.getAll(idUser, includeAllUsers);
        res.status(200).json(tickets);
    }
    catch (error) {
        res.status(400).send('Invalid parameter');
    }
});
exports.ticketsController.get('/:id', (req, res) => {
    const idUser = Number(req.query.idUser);
    const id = parseInt(req.params.id);
    if (isNaN(id))
        return res.status(400).send('Invalid ID');
    try {
        const ticket = tickets_service_1.TicketsService.getById(id, idUser);
        if (!ticket)
            return res.status(404).send('Ticket not found');
        res.status(200).json(ticket);
    }
    catch (error) {
        res.status(401).send('Unauthorized access');
    }
});
exports.ticketsController.get('/:id/full', (req, res) => {
    const idUser = Number(req.query.idUser);
    const id = parseInt(req.params.id);
    if (isNaN(id))
        return res.status(400).send('Invalid ID');
    try {
        const ticket = tickets_service_1.TicketsService.getFullById(id, idUser);
        if (!ticket)
            return res.status(404).send('Ticket not found');
        res.status(200).json(ticket);
    }
    catch (error) {
        res.status(401).send('Unauthorized access');
    }
});
exports.ticketsController.put('/:id/status', (req, res) => {
    const idUser = Number(req.query.idUser);
    const id = parseInt(req.params.id);
    if (isNaN(id))
        return res.status(400).send('Invalid ID');
    const newStatus = req.body.status;
    try {
        const result = tickets_service_1.TicketsService.updateStatus(id, idUser, newStatus);
        if (!result)
            return res.status(404).send('Ticket not found');
        res.status(200).send('Status updated');
    }
    catch (error) {
        res.status(401).send('Unauthorized access');
    }
});
