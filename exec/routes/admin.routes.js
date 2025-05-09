"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controllers_1 = require("../controllers/admin.controllers");
const auth_Middleware_1 = require("../middleware/auth.Middleware");
const router = (0, express_1.Router)();
// Admin routes for product management
router.use(auth_Middleware_1.logProductRequest); // Log chaque requête produit admin
router.get('/products', admin_controllers_1.getAllProductsAdmin);
router.get('/products/:id', auth_Middleware_1.validateProductIdParam, admin_controllers_1.getProductBaseAdmin);
router.get('/products/:id/details', auth_Middleware_1.validateProductIdParam, admin_controllers_1.getProductDetailsAdmin);
router.post('/products', auth_Middleware_1.validateProduct, admin_controllers_1.createProduct);
router.put('/products/:id', auth_Middleware_1.validateProductIdParam, auth_Middleware_1.validateProduct, admin_controllers_1.updateProduct);
router.delete('/products/:id', auth_Middleware_1.validateProductIdParam, admin_controllers_1.disableProduct);
exports.default = router;
