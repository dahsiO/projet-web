"use strict";
// src/models/user.model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["CLIENT"] = "client";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["DISABLED"] = "disabled";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
