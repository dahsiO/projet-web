// src/controllers/product.controller.ts
import { Router, Request, Response } from 'express';
import { DB } from '../db'; // Assurez-vous que le chemin est correct

export const productController = Router();

/**
 * Récupère tous les produits disponibles
 */
productController.get('/', async (req: Request, res: Response) => {
  try {
    const db = await initDb();
    const products = await db.all(`
      SELECT * FROM products WHERE status = 'AVAILABLE'
    `);
    res.status(200).json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * Récupère un produit par son ID
 */
productController.get('/:id', async (req: Request, res: Response) => {
  try {
    const db = await initDb();
    const { id } = req.params;

    const product = await db.get(
      `SELECT * FROM products WHERE product_id = ? AND status = 'AVAILABLE'`,
      [id]
    );

    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé ou non disponible' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Erreur lors de la récupération du produit', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Vous pouvez ajouter d'autres méthodes comme POST, PUT, DELETE selon vos besoins

export default productController;