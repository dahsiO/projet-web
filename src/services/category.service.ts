import { initDb } from '../db';

export async function findAvailableCategories() {
  const db = await initDb();
  return db.all(`SELECT * FROM categories WHERE status = 'AVAILABLE'`);
}

export async function findAllCategories() {
  const db = await initDb();
  return db.all(`SELECT * FROM categories`);
}

export async function findCategoryById(id: number) {
  const db = await initDb();
  return db.get(`SELECT * FROM categories WHERE category_id = ?`, [id]);
}

export async function createCategory(name: string, description: string) {
  const db = await initDb();
  await db.run(`INSERT INTO categories (name, description, status) VALUES (?, ?, 'AVAILABLE')`, [name, description]);
}

export async function updateCategory(id: number, name: string, description: string) {
  const db = await initDb();
  const result = await db.run(
    `UPDATE categories SET name = ?, description = ? WHERE category_id = ?`,
    [name, description, id]
  );
  return result;
}

export async function disableCategory(id: number) {
  const db = await initDb();
  await db.run(`UPDATE categories SET status = 'UNAVAILABLE' WHERE category_id = ?`, [id]);
  await db.run(`UPDATE products SET status = 'UNAVAILABLE' WHERE category = ?`, [id]);
}
