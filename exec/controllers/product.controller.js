"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getAvailableProducts = void 0;
const db_1 = require("../../src/db");
const getAvailableProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, db_1.initDb)();
        const products = yield db.all(`
      SELECT * FROM products WHERE status = 'AVAILABLE'
    `);
        res.status(200).json(products);
    }
    catch (error) {
        console.error('Erreur lors de la récupération des produits', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});
exports.getAvailableProducts = getAvailableProducts;
// 2 create function getProductById
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.initDb)();
    const { id } = req.params;
    const product = yield db.get(`SELECT * FROM products WHERE product_id = ? AND status = 'AVAILABLE'`, [id]);
    if (!product) {
        return res.status(404).json({ error: 'Produit non trouvé ou non disponible' });
    }
    res.json(product);
});
exports.getProductById = getProductById;
