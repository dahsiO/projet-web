export type ProductStatus = 'AVAILABLE' | 'UNAVAILABLE';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  status: ProductStatus;
}

  