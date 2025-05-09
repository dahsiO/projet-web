import { Request, Response } from 'express';
import { findAvailableProducts, findProductById } from '../services/product.services';
import { initDb } from '../db';

export const getAvailableProducts = async (req: Request, res: Response) => {
  try {
    const products = await findAvailableProducts();
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await findProductById(id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
};

export const getProductDetails = async (req: Request, res: Response) => {
  try {
    const db = await initDb();
    const { id } = req.params;

    const product = await db.get(
      `SELECT p.product_id, p.name, p.description, p.price, c.name AS category_name
       FROM products p
       JOIN categories c ON p.category = c.category_id
       WHERE p.product_id = ? AND p.status = 'AVAILABLE'`,
      [id]
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not available' });
    }

    res.json(product);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProductGlobal = async (req: Request, res: Response) => {
  const { id, name, description, price, categoryId, status } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Missing product id' });
  }

  try {
    const db = await initDb();
    const result = await db.run(
      `UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, status = ? WHERE product_id = ?`,
      [name, description, price, categoryId, status, id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};
