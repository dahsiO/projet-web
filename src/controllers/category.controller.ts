import { Request, Response } from 'express';
import {
  findAvailableCategories,
  findAllCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  disableCategory
} from '../services/category.service';
import { initDb } from '../db';

export const getAvailableCategories = async (req: Request, res: Response) => {
  const categories = await findAvailableCategories();
  res.json(categories);
};

export const getAllCategoriesAdmin = async (req: Request, res: Response) => {
  const categories = await findAllCategories();
  res.json(categories);
};

export const getCategoryBaseInfo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid category ID' });

  const category = await findCategoryById(id);
  if (!category) return res.status(404).json({ error: 'Category not found' });

  res.json({ category_id: category.category_id, name: category.name, description: category.description });
};

export const createNewCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  if (!name || !description) return res.status(400).json({ error: 'Missing name or description' });

  await createCategory(name, description);
  res.status(201).json({ message: 'Category created' });
};

export const updateExistingCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, description } = req.body;
  if (!name || !description) return res.status(400).json({ error: 'Missing name or description' });

  const result = await updateCategory(id, name, description);
  if (result.changes === 0) return res.status(404).json({ error: 'Category not found' });

  res.json({ message: 'Category updated' });
};

export const disableExistingCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await disableCategory(id);
  res.status(200).json({ message: 'Category and its products have been disabled' });
};

export const updateCategoryGlobal = async (req: Request, res: Response) => {
  const { categoryId, name, description, status } = req.body;
  if (!categoryId) return res.status(400).json({ error: 'Missing categoryId' });

  const db = await initDb();
  const result = await db.run(
    `UPDATE categories SET name = ?, description = ?, status = ? WHERE category_id = ?`,
    [name, description, status, categoryId]
  );

  if (result.changes === 0) return res.status(404).json({ error: 'Category not found' });

  res.json({ message: 'Category updated' });
};

