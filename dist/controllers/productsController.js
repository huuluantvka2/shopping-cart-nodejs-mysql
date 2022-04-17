"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProduct = void 0;
const be_library_1 = require("../config/be_library");
const db_1 = __importDefault(require("../config/db"));
const getAllProduct = (req, res, next) => {
    const page = (0, be_library_1.renderPage)(req.query);
    db_1.default.getConnection((err, conn) => {
        if (err)
            next({ status: 401, err });
        else {
            const queryStr = `SELECT *,count(*) OVER() as total FROM products LIMIT ${page.limit} OFFSET ${page.offset}`;
            conn.query(queryStr, (err, result) => {
                conn.release();
                if (err)
                    next({ status: 401, err });
                else if (!result.length) {
                    res.json({ page, result });
                }
                else {
                    page.total = result[0].total;
                    const data = result.map(item => {
                        delete item.total;
                        return item;
                    });
                    res.status(200).json({ status: 200, error: false, data, page });
                }
            });
        }
    });
};
exports.getAllProduct = getAllProduct;
//# sourceMappingURL=productsController.js.map