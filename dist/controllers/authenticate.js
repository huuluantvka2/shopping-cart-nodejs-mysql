"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.registerController = void 0;
const db_1 = __importDefault(require("../config/db"));
const existAccount = (conn, email) => {
    return new Promise(resolve => {
        conn.query(`select _id from customers where email='${email}'`, (err, result) => {
            if (err)
                resolve(false);
            else
                resolve(result.length ? true : false);
        });
    });
};
const registerController = (req, res, next) => {
    const cusData = req.body;
    db_1.default.getConnection((err, conn) => {
        if (err)
            next({ status: 401, err });
        else {
            existAccount(conn, cusData.email).then(exist => {
                if (!exist) {
                    const queryStr = `INSERT INTO customers(email,password,name,gender,address) VALUES('${cusData.email || null}','${cusData.password || null}','${cusData.name || null}','${cusData.gender || null}','${cusData.address || null}')`;
                    conn.query(queryStr, (err, result) => {
                        conn.release();
                        if (err)
                            next({ status: 401, message: err.message });
                        else
                            res.status(200).json({ status: 200, message: 'Tạo tài khoản thành công', error: false });
                    });
                }
                else
                    next({ status: 409, message: 'Tài khoản đã tồn tại!', error: true });
            });
        }
    });
};
exports.registerController = registerController;
const loginController = (req, res, next) => {
    db_1.default.getConnection((err, conn) => {
        const queryStr = `SELECT customers.email FROM customers WHERE customers.email='${req.body.email}'&& customers.password='${req.body.password}'`;
        conn.query(queryStr, (err, result) => {
            conn.release();
            if (err)
                next({ status: 401, message: err.message });
            else if (!result.length)
                next({ error: true, status: 401, message: 'Tài khoản hoặc mật khẩu không đúng' });
            else
                res.status(200).json({ error: false, status: 200, message: 'Đăng nhập thành công' });
        });
    });
};
exports.loginController = loginController;
//# sourceMappingURL=authenticate.js.map