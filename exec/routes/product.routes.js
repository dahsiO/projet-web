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
const express_1 = require("express");
const product_services_1 = require("../services/product.services");
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validateCategoryIdParam_1 = require("../middlewares/validateCategoryIdParam");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const include = req.query.includeUnavailable === 'true';
    const products = yield (0, product_services_1.findProducts)(include);
    res.json(products);
}));
router.get('/:id', validateCategoryIdParam_1.resolveIdParam, auth_middleware_1.validateProductIdParam, product_controller_1.getProductById);
router.get('/:id/full', validateCategoryIdParam_1.resolveIdParam, auth_middleware_1.validateProductIdParam, product_controller_1.getProductDetails);
router.put('/', auth_middleware_1.validateProduct, product_controller_1.updateProductGlobal);
exports.default = router;
