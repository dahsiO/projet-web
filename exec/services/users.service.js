"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const users = [];
let nextUserId = 1;
class UsersService {
    static create(user) {
        const newUser = Object.assign(Object.assign({}, user), { user_id: nextUserId++, status: 'ENABLED' });
        users.push(newUser);
        return newUser;
    }
    static getById(id) {
        return users.find(u => u.user_id === id);
    }
    static getAll() {
        return users;
    }
    static update(user) {
        const index = users.findIndex(u => u.user_id === user.user_id);
        if (index === -1)
            return undefined;
        users[index] = user;
        return user;
    }
    static disable(id) {
        const user = users.find(u => u.user_id === id);
        if (!user)
            return false;
        user.status = 'DISABLED';
        return true;
    }
}
exports.UsersService = UsersService;
