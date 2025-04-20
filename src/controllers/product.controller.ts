import { Request, Response } from 'express';
import { initDb } from '../../src/db';

export const getAvailableProducts = async (req: Request, res: Response) => {
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
};

// 2 create function getProductById

export const getProductById = async (req: Request, res: Response) => {
  const db = await initDb();
  const { id } = req.params;

  const product = await db.get(
    `SELECT * FROM products WHERE product_id = ? AND status = 'AVAILABLE'`,
    [id]
  );

  if (!product) {
    return res.status(404).json({ error: 'Produit non trouvé ou non disponible' });
  }

  res.json(product);
};





