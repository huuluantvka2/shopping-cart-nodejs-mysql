"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
exports.default = mysql2_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'shoppingcart_react',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});
//# sourceMappingURL=db.js.map