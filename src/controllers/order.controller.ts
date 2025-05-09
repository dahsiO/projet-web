import { Request, Response } from 'express';
import { OrdersService } from '../services/order.service';

export const create = (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const order = OrdersService.create(userId);
  res.status(201).json(order);
};

export const addItem = (req: Request, res: Response) => {
  const orderId = Number(req.params.id);
  const { product_fk, quantity, unit_price } = req.body;

  const item = OrdersService.addItem(orderId, product_fk, quantity, unit_price);
  res.status(201).json(item);
};

export const removeItem = (req: Request, res: Response) => {
  const orderId = Number(req.params.id);
  const productId = Number(req.params.productId);

  const success = OrdersService.removeItem(orderId, productId);
  if (!success) return res.status(404).json({ error: 'Item not found' });

  res.json({ message: 'Item removed from order' });
};

export const finalize = (req: Request, res: Response) => {
  const orderId = Number(req.params.id);

  const success = OrdersService.finalize(orderId);
  if (!success) return res.status(400).json({ error: 'Cannot finalize order' });

  res.json({ message: 'Order finalized' });
};

export const getByUser = (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const { status } = req.query;

  const orders = OrdersService.getByUser(userId, status as any);
  res.json(orders);
};

export const getDetails = (req: Request, res: Response) => {
  const orderId = Number(req.params.id);
  const order = OrdersService.getDetails(orderId);

  if (!order) return res.status(404).json({ error: 'Order not found' });

  res.json(order);
};

export const getAll = (req: Request, res: Response) => {
  const allOrders = OrdersService.getAll();
  res.json(allOrders);
};

export const updateStatus = (req: Request, res: Response) => {
  const orderId = Number(req.params.id);
  const { status } = req.body;

  const success = OrdersService.updateStatus(orderId, status);
  if (!success) return res.status(404).json({ error: 'Order not found' });

  res.json({ message: 'Status updated' });
};
