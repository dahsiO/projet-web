"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const router = (0, express_1.Router)();
router.post('/', order_controller_1.create); // POST /orders
router.post('/:id/items', order_controller_1.addItem); // POST /orders/:id/items
router.delete('/:id/items/:productId', order_controller_1.removeItem); // DELETE /orders/:id/items/:productId
router.patch('/:id/finalize', order_controller_1.finalize); // PATCH /orders/:id/finalize
router.get('/user/:userId', order_controller_1.getByUser); // GET /orders/user/:userId
router.get('/:id', order_controller_1.getDetails); // GET /orders/:id
router.get('/admin/all', order_controller_1.getAll); // GET /orders/admin/all
router.patch('/:id/status', order_controller_1.updateStatus); // PATCH /orders/:id/status
exports.default = router;
