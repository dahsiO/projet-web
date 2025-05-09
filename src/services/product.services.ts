import { initDb } from '../db';

export async function findAvailableProducts() {
  const db = await initDb();
  return db.all(`SELECT * FROM products WHERE status = 'AVAILABLE'`);
}

export async function findProductById(id: number) {
  const db = await initDb();
  return db.get(`SELECT * FROM products WHERE product_id = ?`, [id]);
}

export async function findProducts(includeUnavailable: boolean = false) {
  const db = await initDb();
  const query = includeUnavailable
    ? `SELECT * FROM products`
    : `SELECT * FROM products WHERE status = 'AVAILABLE'`;
  return db.all(query);
}