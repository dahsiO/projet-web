"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
// src/controllers/users.controller.ts
const express_1 = require("express");
const users_service_1 = require("../services/users.service");
exports.usersController = (0, express_1.Router)();
exports.usersController.post('/', (req, res) => {
    const user = req.body;
    const newUser = users_service_1.UsersService.create(user);
    res.status(201).json(newUser);
});
exports.usersController.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users_service_1.UsersService.getById(id);
    if (!user)
        return res.status(404).send('User not found');
    res.status(200).json(user);
});
exports.usersController.put('/', (req, res) => {
    const user = req.body;
    const updatedUser = users_service_1.UsersService.update(user);
    if (!updatedUser)
        return res.status(404).send('User not found');
    res.status(200).json(updatedUser);
});
exports.usersController.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const result = users_service_1.UsersService.disable(id);
    if (!result)
        return res.status(404).send('User not found');
    res.status(200).send('User disabled');
});
exports.usersController.get('/', (_req, res) => {
    const users = users_service_1.UsersService.getAll();
    res.status(200).json(users);
});
