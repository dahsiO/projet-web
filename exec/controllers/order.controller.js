"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.getAll = exports.getDetails = exports.getByUser = exports.finalize = exports.removeItem = exports.addItem = exports.create = void 0;
const order_service_1 = require("../services/order.service");
const create = (req, res) => {
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ error: 'Unauthorized' });
    const order = order_service_1.OrdersService.create(userId);
    res.status(201).json(order);
};
exports.create = create;
const addItem = (req, res) => {
    const orderId = Number(req.params.id);
    const { product_fk, quantity, unit_price } = req.body;
    const item = order_service_1.OrdersService.addItem(orderId, product_fk, quantity, unit_price);
    res.status(201).json(item);
};
exports.addItem = addItem;
const removeItem = (req, res) => {
    const orderId = Number(req.params.id);
    const productId = Number(req.params.productId);
    const success = order_service_1.OrdersService.removeItem(orderId, productId);
    if (!success)
        return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item removed from order' });
};
exports.removeItem = removeItem;
const finalize = (req, res) => {
    const orderId = Number(req.params.id);
    const success = order_service_1.OrdersService.finalize(orderId);
    if (!success)
        return res.status(400).json({ error: 'Cannot finalize order' });
    res.json({ message: 'Order finalized' });
};
exports.finalize = finalize;
const getByUser = (req, res) => {
    const userId = Number(req.params.userId);
    const { status } = req.query;
    const orders = order_service_1.OrdersService.getByUser(userId, status);
    res.json(orders);
};
exports.getByUser = getByUser;
const getDetails = (req, res) => {
    const orderId = Number(req.params.id);
    const order = order_service_1.OrdersService.getDetails(orderId);
    if (!order)
        return res.status(404).json({ error: 'Order not found' });
    res.json(order);
};
exports.getDetails = getDetails;
const getAll = (req, res) => {
    const allOrders = order_service_1.OrdersService.getAll();
    res.json(allOrders);
};
exports.getAll = getAll;
const updateStatus = (req, res) => {
    const orderId = Number(req.params.id);
    const { status } = req.body;
    const success = order_service_1.OrdersService.updateStatus(orderId, status);
    if (!success)
        return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Status updated' });
};
exports.updateStatus = updateStatus;
