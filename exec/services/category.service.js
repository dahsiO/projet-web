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
exports.findAvailableCategories = findAvailableCategories;
exports.findAllCategories = findAllCategories;
exports.findCategoryById = findCategoryById;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
exports.disableCategory = disableCategory;
const db_1 = require("../db");
function findAvailableCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, db_1.initDb)();
        return db.all(`SELECT * FROM categories WHERE status = 'AVAILABLE'`);
    });
}
function findAllCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, db_1.initDb)();
        return db.all(`SELECT * FROM categories`);
    });
}
function findCategoryById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, db_1.initDb)();
        return db.get(`SELECT * FROM categories WHERE category_id = ?`, [id]);
    });
}
function createCategory(name, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, db_1.initDb)();
        yield db.run(`INSERT INTO categories (name, description, status) VALUES (?, ?, 'AVAILABLE')`, [name, description]);
    });
}
function updateCategory(id, name, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, db_1.initDb)();
        const result = yield db.run(`UPDATE categories SET name = ?, description = ? WHERE category_id = ?`, [name, description, id]);
        return result;
    });
}
function disableCategory(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, db_1.initDb)();
        yield db.run(`UPDATE categories SET status = 'UNAVAILABLE' WHERE category_id = ?`, [id]);
        yield db.run(`UPDATE products SET status = 'UNAVAILABLE' WHERE category = ?`, [id]);
    });
}
