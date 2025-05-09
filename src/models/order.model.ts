export type OrderStatus = 'NEW' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELED';

export interface Order {
  order_id?: number;
  user_fk: number;
  status: OrderStatus;
  order_date: string | null;
}

export interface OrderItem {
  order_item_id?: number;
  order_fk: number;
  product_fk: number;
  quantity: number;
  unit_price: number;
}