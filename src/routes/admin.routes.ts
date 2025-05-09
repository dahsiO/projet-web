import { Router } from 'express';
import {
  getAllProductsAdmin,
  getProductBaseAdmin,
  getProductDetailsAdmin,
  createProduct,
  updateProduct,
  disableProduct
} from '../controllers/admin.controllers';

import {
  
  validateProduct,
  validateProductIdParam,
  logProductRequest
} from '../middleware/auth.Middleware';


const router = Router();

// Admin routes for product management

router.use(logProductRequest); // Log chaque requête produit admin

router.get('/products', getAllProductsAdmin);

router.get('/products/:id', validateProductIdParam, getProductBaseAdmin);

router.get('/products/:id/details', validateProductIdParam, getProductDetailsAdmin);

router.post('/products', validateProduct, createProduct);

router.put('/products/:id', validateProductIdParam, validateProduct, updateProduct);

router.delete('/products/:id', validateProductIdParam, disableProduct);

export default router;
