import { Request, Response } from 'express';
import { initDb } from '../db';

export async function getAllProductsAdmin(req: Request, res: Response) {
  try {
    const db = await initDb();
    const products = await db.all('SELECT * FROM products');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve products', error: err });
  }
}

export const getProductBaseAdmin = async (req: Request, res: Response) => {
  const db = await initDb();
  const product = await db.get(
    `SELECT product_id, name, price FROM products WHERE product_id = ?`,
    [req.params.id]
  );

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
};

export const getProductDetailsAdmin = async (req: Request, res: Response) => {
  const db = await initDb();
  const product = await db.get(
    `SELECT p.product_id, p.name, p.description, p.price, p.status, c.name as category_name
     FROM products p JOIN categories c ON p.category = c.category_id
     WHERE p.product_id = ?`,
    [req.params.id]
  );

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, category } = req.body;
  const db = await initDb();

  await db.run(
    `INSERT INTO products (name, description, price, category, status)
     VALUES (?, ?, ?, ?, 'AVAILABLE')`,
    [name, description, price, category]
  );

  res.status(201).json({ message: 'Product created successfully' });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { name, description, price, category } = req.body;
  const db = await initDb();

  const result = await db.run(
    `UPDATE products SET name = ?, description = ?, price = ?, category = ? WHERE product_id = ?`,
    [name, description, price, category, req.params.id]
  );

  console.log('Query result:', result);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json({ message: 'Product updated successfully' });
};

export const disableProduct = async (req: Request, res: Response) => {
  const db = await initDb();

  const result = await db.run(
    `UPDATE products SET status = 'UNAVAILABLE' WHERE product_id = ?`,
    [req.params.id]
  );

  console.log('Query result:', result);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json({ message: 'Product disabled successfully' });
};
