"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_controller_1 = require("./controllers/users.controller");
const tickets_controller_1 = require("./controllers/tickets.controller");
const auth_middleware_1 = require("./middlewares/auth.middleware");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API Cozy Corner');
});
exports.app.use(auth_middleware_1.authMiddleware);
exports.app.use('/users', users_controller_1.usersController);
exports.app.use('/tickets', tickets_controller_1.ticketsController);
