import { Router } from 'express';
import { findProducts } from '../services/product.services';
import {
  getProductById,
  getProductDetails,
  updateProductGlobal
} from '../controllers/product.controller';
import { validateProduct, validateProductIdParam } from '../middleware/auth.middleware';
import { resolveIdParam } from '../middleware/validateCategoryIdParam';

const router = Router();

router.get('/', async (req, res) => {
  const include = req.query.includeUnavailable === 'true';
  const products = await findProducts(include);
  res.json(products);
});

router.get('/:id', resolveIdParam, validateProductIdParam, getProductById);
router.get('/:id/full', resolveIdParam, validateProductIdParam, getProductDetails);
router.put('/', validateProduct, updateProductGlobal);

export default router;





