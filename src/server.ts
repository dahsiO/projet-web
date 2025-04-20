// tous les lienss 

import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});