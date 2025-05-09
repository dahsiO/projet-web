"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
exports.requireAdmin = requireAdmin;
exports.validateProduct = validateProduct;
exports.validateProductIdParam = validateProductIdParam;
exports.logProductRequest = logProductRequest;
const users_service_1 = require("../services/users.service");
const guards_1 = require("../utils/guards");
// Middleware d'authentification
const authMiddleware = (req, res, next) => {
    var _a;
    // Skip auth for the root endpoint
    if (req.path === '/') {
        return next();
    }
    // Get user ID from query or body
    const idUserFromQuery = req.query.idUser;
    const idUserFromBody = (_a = req.body) === null || _a === void 0 ? void 0 : _a.idUser;
    const idUser = idUserFromQuery || idUserFromBody;
    if (!idUser) {
        return res.status(401).send('Authentication required: idUser is missing');
    }
    try {
        // Validate that the user exists
        const userId = Number(idUser);
        if (isNaN(userId)) {
            return res.status(400).send('Invalid idUser format');
        }
        // Check if the user exists (by trying to get the user by ID)
        const user = users_service_1.UsersService.getById(userId, userId);
        if (!user) {
            return res.status(401).send('Authentication failed: User not found');
        }
        // Store user info in request for later use
        req.authenticatedUser = user;
        req.userId = userId;
        next();
    }
    catch (error) {
        return res.status(401).send('Authentication failed');
    }
};
exports.authMiddleware = authMiddleware;
/**
 * Middleware to check if the user is an admin (for admin-only routes)
 */
function requireAdmin(req, res, next) {
    if (req.query.idUser !== '1') {
        return res.status(403).json({ error: 'Access denied: admin only' });
    }
    next();
}
/**
 * Middleware to validate product structure before create/update
 */
function validateProduct(req, res, next) {
    if (!(0, guards_1.isProduct)(req.body)) {
        return res.status(400).json({ error: 'Invalid product format' });
    }
    next();
}
/**
 * Middleware to validate product ID in URL params
 */
function validateProductIdParam(req, res, next) {
    const id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }
    next();
}
/**
 * Middleware for logging product-related requests
 */
function logProductRequest(req, res, next) {
    console.log(`[PRODUCT] ${req.method} ${req.originalUrl}`);
    next();
}
