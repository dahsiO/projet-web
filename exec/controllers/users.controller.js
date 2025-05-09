"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const express_1 = require("express");
const users_service_1 = require("../services/users.service");
const user_model_1 = require("../models/user.model");
exports.usersController = (0, express_1.Router)();
exports.usersController.post('/', (req, res) => {
    try {
        const userData = {
            first_name: req.body.first_name || req.body.firstName || '',
            last_name: req.body.last_name || req.body.lastName || '',
            role: user_model_1.UserRole.CLIENT
        };
        const newUser = users_service_1.UsersService.create(userData);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).send('Invalid data');
    }
});
exports.usersController.get('/:id', (req, res) => {
    const idUser = Number(req.query.idUser);
    const id = parseInt(req.params.id);
    if (isNaN(id))
        return res.status(400).send('Invalid ID');
    try {
        const user = users_service_1.UsersService.getById(id, idUser);
        if (!user)
            return res.status(404).send('User not found');
        res.status(200).json(user);
    }
    catch (error) {
        res.status(401).send('Unauthorized access');
    }
});
exports.usersController.put('/', (req, res) => {
    const idUser = Number(req.query.idUser || req.body.idUser);
    try {
        const user = req.body;
        const updatedUser = users_service_1.UsersService.update(user, idUser);
        if (!updatedUser)
            return res.status(404).send('User not found');
        res.status(200).json(updatedUser);
    }
    catch (error) { // Correction ici: typer l'erreur comme 'any'
        if (error.message === 'Unauthorized') {
            return res.status(401).send('Unauthorized access');
        }
        res.status(400).send('Invalid data');
    }
});
exports.usersController.delete('/:id', (req, res) => {
    const idUser = Number(req.query.idUser);
    const id = parseInt(req.params.id);
    if (isNaN(id))
        return res.status(400).send('Invalid ID');
    try {
        const result = users_service_1.UsersService.disable(id, idUser);
        if (!result)
            return res.status(404).send('User not found');
        res.status(200).send('User disabled');
    }
    catch (error) {
        res.status(401).send('Unauthorized access');
    }
});
exports.usersController.get('/', (req, res) => {
    const idUser = Number(req.query.idUser);
    try {
        const users = users_service_1.UsersService.getAll(idUser);
        res.status(200).json(users);
    }
    catch (error) {
        res.status(401).send('Unauthorized access');
    }
});
