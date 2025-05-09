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
const category_controller_1 = require("../controllers/category.controller");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.initDb)();
    const include = req.query.includeUnavailable === 'true';
    const query = include ? `SELECT * FROM categories` : `SELECT * FROM categories WHERE status = 'AVAILABLE'`;
    const result = yield db.all(query);
    res.json(result);
}));
router.get('/:id', category_controller_1.getCategoryBaseInfo);
router.post('/', category_controller_1.createNewCategory);
router.put('/', category_controller_1.updateCategoryGlobal);
router.delete('/:id', category_controller_1.disableExistingCategory);
exports.default = router;
