"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
// src/services/users.service.ts
const user_model_1 = require("../models/user.model");
// Simulation d'une base de données avec les champs mis à jour
let users = [
    {
        user_id: 1,
        first_name: 'Admin',
        last_name: 'User',
        role: user_model_1.UserRole.ADMIN,
        status: user_model_1.UserStatus.ACTIVE,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        user_id: 2,
        first_name: 'Client',
        last_name: 'Example',
        role: user_model_1.UserRole.CLIENT,
        status: user_model_1.UserStatus.ACTIVE,
        created_at: new Date(),
        updated_at: new Date()
    }
];
class UsersService {
    /**
     * Crée un nouvel utilisateur
     */
    static create(userData) {
        const newUser = Object.assign(Object.assign({}, userData), { user_id: users.length > 0 ? Math.max(...users.map(u => u.user_id)) + 1 : 1, status: user_model_1.UserStatus.ACTIVE, created_at: new Date(), updated_at: new Date() });
        users.push(newUser);
        return newUser;
    }
    /**
     * Récupère un utilisateur par son ID
     * Si l'utilisateur est un client, il ne peut accéder qu'à ses propres informations
     */
    static getById(id, requestUserId) {
        const requestUser = users.find(u => u.user_id === requestUserId);
        // Vérifier si l'utilisateur existe
        if (!requestUser) {
            throw new Error('Unauthorized');
        }
        const user = users.find(u => u.user_id === id);
        // Si l'utilisateur n'existe pas ou est désactivé
        if (!user || user.status === user_model_1.UserStatus.DISABLED) {
            return null;
        }
        // Si l'utilisateur est un client, il ne peut accéder qu'à ses propres informations
        if (requestUser.role === user_model_1.UserRole.CLIENT && requestUser.user_id !== id) {
            throw new Error('Unauthorized');
        }
        return Object.assign({}, user);
    }
    /**
     * Met à jour un utilisateur
     * Si l'utilisateur est un client, il ne peut modifier que ses propres informations
     * Un client ne peut pas changer son rôle
     */
    static update(userData, requestUserId) {
        const requestUser = users.find(u => u.user_id === requestUserId);
        // Vérifier si l'utilisateur existe
        if (!requestUser) {
            throw new Error('Unauthorized');
        }
        const userIndex = users.findIndex(u => u.user_id === userData.user_id);
        // Si l'utilisateur n'existe pas ou est désactivé
        if (userIndex === -1 || users[userIndex].status === user_model_1.UserStatus.DISABLED) {
            return null;
        }
        // Si l'utilisateur est un client
        if (requestUser.role === user_model_1.UserRole.CLIENT) {
            // Il ne peut modifier que ses propres informations
            if (requestUser.user_id !== userData.user_id) {
                throw new Error('Unauthorized');
            }
            // Il ne peut pas changer son rôle
            userData.role = requestUser.role;
        }
        // Mettre à jour l'utilisateur
        users[userIndex] = Object.assign(Object.assign({}, userData), { updated_at: new Date() });
        return Object.assign({}, users[userIndex]);
    }
    /**
     * Désactive un compte utilisateur
     * Seul un administrateur peut effectuer cette opération
     */
    static disable(id, requestUserId) {
        const requestUser = users.find(u => u.user_id === requestUserId);
        // Vérifier si l'utilisateur existe et est un administrateur
        if (!requestUser || requestUser.role !== user_model_1.UserRole.ADMIN) {
            throw new Error('Unauthorized');
        }
        const userIndex = users.findIndex(u => u.user_id === id);
        // Si l'utilisateur n'existe pas ou est déjà désactivé
        if (userIndex === -1 || users[userIndex].status === user_model_1.UserStatus.DISABLED) {
            return false;
        }
        // Désactiver l'utilisateur
        users[userIndex].status = user_model_1.UserStatus.DISABLED;
        users[userIndex].updated_at = new Date();
        return true;
    }
    /**
     * Récupère la liste des utilisateurs
     * Seul un administrateur peut effectuer cette opération
     */
    static getAll(requestUserId) {
        const requestUser = users.find(u => u.user_id === requestUserId);
        // Vérifier si l'utilisateur existe et est un administrateur
        if (!requestUser || requestUser.role !== user_model_1.UserRole.ADMIN) {
            throw new Error('Unauthorized');
        }
        return users.map(user => (Object.assign({}, user)));
    }
}
exports.UsersService = UsersService;
