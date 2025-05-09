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
exports.findAvailableProducts = findAvailableProducts;
exports.findProductById = findProductById;
exports.findProducts = findProducts;
const db_1 = require("../db");
function findAvailableProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, db_1.initDb)();
        return db.all(`SELECT * FROM products WHERE status = 'AVAILABLE'`);
    });
}
function findProductById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, db_1.initDb)();
        return db.get(`SELECT * FROM products WHERE product_id = ?`, [id]);
    });
}
function findProducts() {
    return __awaiter(this, arguments, void 0, function* (includeUnavailable = false) {
        const db = yield (0, db_1.initDb)();
        const query = includeUnavailable
            ? `SELECT * FROM products`
            : `SELECT * FROM products WHERE status = 'AVAILABLE'`;
        return db.all(query);
    });
}
