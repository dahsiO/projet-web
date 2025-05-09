import { Router } from 'express';
import {
  getAvailableCategories,
  getCategoryBaseInfo,
  updateCategoryGlobal,
  createNewCategory,
  disableExistingCategory
} from '../controllers/category.controller';

import { initDb } from '../db';

const router = Router();

router.get('/', async (req, res) => {
  const db = await initDb();
  const include = req.query.includeUnavailable === 'true';
  const query = include ? `SELECT * FROM categories` : `SELECT * FROM categories WHERE status = 'AVAILABLE'`;
  const result = await db.all(query);
  res.json(result);
});

router.get('/:id', getCategoryBaseInfo);
router.post('/', createNewCategory);
router.put('/', updateCategoryGlobal);
router.delete('/:id', disableExistingCategory);

export default router;

