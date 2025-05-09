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
exports.updateCategoryGlobal = exports.disableExistingCategory = exports.updateExistingCategory = exports.createNewCategory = exports.getCategoryBaseInfo = exports.getAllCategoriesAdmin = exports.getAvailableCategories = void 0;
const category_service_1 = require("../services/category.service");
const db_1 = require("../db");
const getAvailableCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, category_service_1.findAvailableCategories)();
    res.json(categories);
});
exports.getAvailableCategories = getAvailableCategories;
const getAllCategoriesAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, category_service_1.findAllCategories)();
    res.json(categories);
});
exports.getAllCategoriesAdmin = getAllCategoriesAdmin;
const getCategoryBaseInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (isNaN(id))
        return res.status(400).json({ error: 'Invalid category ID' });
    const category = yield (0, category_service_1.findCategoryById)(id);
    if (!category)
        return res.status(404).json({ error: 'Category not found' });
    res.json({ category_id: category.category_id, name: category.name, description: category.description });
});
exports.getCategoryBaseInfo = getCategoryBaseInfo;
const createNewCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    if (!name || !description)
        return res.status(400).json({ error: 'Missing name or description' });
    yield (0, category_service_1.createCategory)(name, description);
    res.status(201).json({ message: 'Category created' });
});
exports.createNewCategory = createNewCategory;
const updateExistingCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { name, description } = req.body;
    if (!name || !description)
        return res.status(400).json({ error: 'Missing name or description' });
    const result = yield (0, category_service_1.updateCategory)(id, name, description);
    if (result.changes === 0)
        return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category updated' });
});
exports.updateExistingCategory = updateExistingCategory;
const disableExistingCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    yield (0, category_service_1.disableCategory)(id);
    res.status(200).json({ message: 'Category and its products have been disabled' });
});
exports.disableExistingCategory = disableExistingCategory;
const updateCategoryGlobal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId, name, description, status } = req.body;
    if (!categoryId)
        return res.status(400).json({ error: 'Missing categoryId' });
    const db = yield (0, db_1.initDb)();
    const result = yield db.run(`UPDATE categories SET name = ?, description = ?, status = ? WHERE category_id = ?`, [name, description, status, categoryId]);
    if (result.changes === 0)
        return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category updated' });
});
exports.updateCategoryGlobal = updateCategoryGlobal;
