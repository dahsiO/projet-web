"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const users_service_1 = require("../services/users.service");
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
        next();
    }
    catch (error) {
        return res.status(401).send('Authentication failed');
    }
};
exports.authMiddleware = authMiddleware;
