import { Router } from 'express';
import {
  getAvailableProducts,
  getProductById
} from '../src/controllers/product.controller';

const router = Router();

router.get('/', getAvailableProducts);         // GET /products
router.get('/:id', getProductById);            // GET /products/:id

export default router;