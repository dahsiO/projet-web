"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
function authMiddleware(req, res, next) {
    const userId = req.headers['iduser'];
    if (!userId || isNaN(Number(userId))) {
        return res.status(401).json({ error: 'Unauthorized: idUser header missing or invalid' });
    }
    next();
}
