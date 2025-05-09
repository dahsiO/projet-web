import { Order, OrderItem, OrderStatus } from '../models/order.model';

const orders: Order[] = [];
const orderItems: OrderItem[] = [];

let nextOrderId = 1;
let nextItemId = 1;

export class OrdersService {
  static create(user_fk: number): Order {
    const newOrder: Order = {
      order_id: nextOrderId++,
      user_fk,
      status: 'NEW',
      order_date: null
    };
    orders.push(newOrder);
    return newOrder;
  }

  static addItem(order_fk: number, product_fk: number, quantity: number, unit_price: number): OrderItem {
    const item: OrderItem = {
      order_item_id: nextItemId++,
      order_fk,
      product_fk,
      quantity,
      unit_price
    };
    orderItems.push(item);
    return item;
  }

  static removeItem(order_fk: number, product_fk: number): boolean {
    const index = orderItems.findIndex(i => i.order_fk === order_fk && i.product_fk === product_fk);
    if (index === -1) return false;
    orderItems.splice(index, 1);
    return true;
  }

  static finalize(order_id: number): boolean {
    const order = orders.find(o => o.order_id === order_id && o.status === 'NEW');
    if (!order) return false;
    order.status = 'PROCESSING';
    order.order_date = new Date().toISOString();
    return true;
  }

  static getByUser(user_fk: number, status?: OrderStatus): Order[] {
    return orders.filter(o => o.user_fk === user_fk && (!status || o.status === status));
  }

  static getDetails(order_id: number): Order & { items: OrderItem[] } | undefined {
    const order = orders.find(o => o.order_id === order_id);
    if (!order) return undefined;
    const items = orderItems.filter(i => i.order_fk === order_id);
    return { ...order, items };
  }

  static getAll(): Order[] {
    return orders;
  }

  static updateStatus(order_id: number, status: OrderStatus): boolean {
    const order = orders.find(o => o.order_id === order_id);
    if (!order) return false;
    order.status = status;
    return true;
  }
}
