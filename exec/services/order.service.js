"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const orders = [];
const orderItems = [];
let nextOrderId = 1;
let nextItemId = 1;
class OrdersService {
    static create(user_fk) {
        const newOrder = {
            order_id: nextOrderId++,
            user_fk,
            status: 'NEW',
            order_date: null
        };
        orders.push(newOrder);
        return newOrder;
    }
    static addItem(order_fk, product_fk, quantity, unit_price) {
        const item = {
            order_item_id: nextItemId++,
            order_fk,
            product_fk,
            quantity,
            unit_price
        };
        orderItems.push(item);
        return item;
    }
    static removeItem(order_fk, product_fk) {
        const index = orderItems.findIndex(i => i.order_fk === order_fk && i.product_fk === product_fk);
        if (index === -1)
            return false;
        orderItems.splice(index, 1);
        return true;
    }
    static finalize(order_id) {
        const order = orders.find(o => o.order_id === order_id && o.status === 'NEW');
        if (!order)
            return false;
        order.status = 'PROCESSING';
        order.order_date = new Date().toISOString();
        return true;
    }
    static getByUser(user_fk, status) {
        return orders.filter(o => o.user_fk === user_fk && (!status || o.status === status));
    }
    static getDetails(order_id) {
        const order = orders.find(o => o.order_id === order_id);
        if (!order)
            return undefined;
        const items = orderItems.filter(i => i.order_fk === order_id);
        return Object.assign(Object.assign({}, order), { items });
    }
    static getAll() {
        return orders;
    }
    static updateStatus(order_id, status) {
        const order = orders.find(o => o.order_id === order_id);
        if (!order)
            return false;
        order.status = status;
        return true;
    }
}
exports.OrdersService = OrdersService;
