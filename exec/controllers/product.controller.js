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
exports.updateProductGlobal = exports.getProductDetails = exports.getProductById = exports.getAvailableProducts = void 0;
const product_services_1 = require("../services/product.services");
const db_1 = require("../db");
const getAvailableProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, product_services_1.findAvailableProducts)();
        res.json(products);
    }
    catch (e) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getAvailableProducts = getAvailableProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const product = yield (0, product_services_1.findProductById)(id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});
exports.getProductById = getProductById;
const getProductDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, db_1.initDb)();
        const { id } = req.params;
        const product = yield db.get(`SELECT p.product_id, p.name, p.description, p.price, c.name AS category_name
       FROM products p
       JOIN categories c ON p.category = c.category_id
       WHERE p.product_id = ? AND p.status = 'AVAILABLE'`, [id]);
        if (!product) {
            return res.status(404).json({ error: 'Product not available' });
        }
        res.json(product);
    }
    catch (e) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getProductDetails = getProductDetails;
const updateProductGlobal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, description, price, categoryId, status } = req.body;
    if (!id) {
        return res.status(400).json({ error: 'Missing product id' });
    }
    try {
        const db = yield (0, db_1.initDb)();
        const result = yield db.run(`UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, status = ? WHERE product_id = ?`, [name, description, price, categoryId, status, id]);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});
exports.updateProductGlobal = updateProductGlobal;
