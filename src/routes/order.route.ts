import { Router } from 'express';
import {
  create,
  addItem,
  removeItem,
  finalize,
  getByUser,
  getDetails,
  getAll,
  updateStatus
} from '../controllers/order.controller';

const router = Router();

router.post('/', create);                                // POST /orders
router.post('/:id/items', addItem);                      // POST /orders/:id/items
router.delete('/:id/items/:productId', removeItem);      // DELETE /orders/:id/items/:productId
router.patch('/:id/finalize', finalize);                 // PATCH /orders/:id/finalize
router.get('/user/:userId', getByUser);                  // GET /orders/user/:userId
router.get('/:id', getDetails);                          // GET /orders/:id
router.get('/admin/all', getAll);                        // GET /orders/admin/all
router.patch('/:id/status', updateStatus);               // PATCH /orders/:id/status

export default router;
