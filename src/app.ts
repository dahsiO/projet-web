import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { usersController } from './controllers/users.controller';
import { ticketsController } from './controllers/tickets.controller';
import { authMiddleware } from './middlewares/auth.middleware';
import orderRoute from './routes/order.route';  
import productRoutes from './routes/product.routes'
import adminRoutes from './routes/admin.routes'
import categoryRoutes from './routes/category.routes';
//import { initDb } from './db';  // Chemin corrigé

export const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenue sur l\'API Cozy Corner');
});

app.use(authMiddleware);
app.use('/users', usersController);
app.use('/tickets', ticketsController);
app.use('/orders', orderRoute);
app.use('/admin', adminRoutes);   // Routes pour /admin
app.use('/products', productRoutes); // Routes pour /products
app.use('/categories', categoryRoutes); // ➔ ajout ici
