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
exports.disableProduct = exports.updateProduct = exports.createProduct = exports.getProductDetailsAdmin = exports.getProductBaseAdmin = void 0;
exports.getAllProductsAdmin = getAllProductsAdmin;
const database_1 = require("../db/database"); // Chemin mis à jour
function getAllProductsAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield (0, database_1.initDb)();
            const products = yield db.all('SELECT * FROM products');
            res.json(products);
        }
        catch (err) {
            res.status(500).json({ message: 'Failed to retrieve products', error: err });
        }
    });
}
const getProductBaseAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.initDb)();
    const product = yield db.get(`SELECT product_id, name, price FROM products WHERE product_id = ?`, [req.params.id]);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});
exports.getProductBaseAdmin = getProductBaseAdmin;
const getProductDetailsAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.initDb)();
    const product = yield db.get(`SELECT p.product_id, p.name, p.description, p.price, p.status, c.name as category_name
     FROM products p JOIN categories c ON p.category = c.category_id
     WHERE p.product_id = ?`, [req.params.id]);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});
exports.getProductDetailsAdmin = getProductDetailsAdmin;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, category } = req.body;
    const db = yield (0, database_1.initDb)();
    yield db.run(`INSERT INTO products (name, description, price, category, status)
     VALUES (?, ?, ?, ?, 'AVAILABLE')`, [name, description, price, category]);
    res.status(201).json({ message: 'Product created successfully' });
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, category } = req.body;
    const db = yield (0, database_1.initDb)();
    const result = yield db.run(`UPDATE products SET name = ?, description = ?, price = ?, category = ? WHERE product_id = ?`, [name, description, price, category, req.params.id]);
    console.log('Query result:', result);
    if (result.changes === 0) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully' });
});
exports.updateProduct = updateProduct;
const disableProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.initDb)();
    const result = yield db.run(`UPDATE products SET status = 'UNAVAILABLE' WHERE product_id = ?`, [req.params.id]);
    console.log('Query result:', result);
    if (result.changes === 0) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product disabled successfully' });
});
exports.disableProduct = disableProduct;
