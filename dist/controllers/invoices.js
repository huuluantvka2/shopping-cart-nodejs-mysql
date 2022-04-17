"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInvoiceAndInvoiceDetail = exports.createInvoiceAndInvoiceDetail = exports.getInvoiceDetailByIdInvoice = exports.getInvoiceByIdCustomer = void 0;
const be_library_1 = require("../config/be_library");
const db_1 = __importDefault(require("../config/db"));
const getInvoiceByIdCustomer = (req, res, next) => {
    if (req.params.id_customer) {
        db_1.default.getConnection((err, conn) => {
            let page = (0, be_library_1.renderPage)(req.query);
            const queryStr = `SELECT *,COUNT(*) OVER() AS total FROM invoices WHERE id_customer=${+req.params.id_customer} LIMIT ${page.limit} OFFSET ${page.offset}`;
            console.log(queryStr);
            conn.query(queryStr, (error, result) => {
                var _a;
                console.log(result);
                conn.release();
                if (error)
                    next({ status: 401, error });
                else {
                    page = (0, be_library_1.renderPage)(req.query, (_a = result[0]) === null || _a === void 0 ? void 0 : _a.total);
                    const data = result.map(item => {
                        delete item.total;
                        return item;
                    });
                    res.json({ status: 200, error: false, data, page });
                }
            });
        });
    }
    else
        next({ status: 401, message: 'Thiếu trường id_customer' });
};
exports.getInvoiceByIdCustomer = getInvoiceByIdCustomer;
const getInvoiceDetailByIdInvoice = (req, res, next) => {
    if (req.params.id_invoices) {
        db_1.default.getConnection((err, conn) => {
            const queryStr = `SELECT invoice_details.*,products.type,products.name,products.description,products.image,products.selling FROM invoice_details,products WHERE invoice_details.id_invoice = ${req.params.id_invoices} and invoice_details.id_product = products._id;`;
            conn.query(queryStr, (error, result) => {
                conn.release();
                if (error)
                    next({ status: 401, error });
                else
                    res.json({ status: 200, error: false, data: result });
            });
        });
    }
    else
        next({ status: 401, message: 'Thiếu trường id_invoices' });
};
exports.getInvoiceDetailByIdInvoice = getInvoiceDetailByIdInvoice;
const createInvoiceAndInvoiceDetail = (req, res, next) => {
    const invoices = req.body;
    let queryStr = `INSERT INTO invoices(invoice_code,invoice_status,create_date,total,id_customer) VALUES('${invoices.invoice_code}',1,'${invoices.create_date}',${invoices.total},${invoices.id_customer})`;
    queryStr = (0, be_library_1.clearUndefined)(queryStr, "'undefined'");
    queryStr = (0, be_library_1.clearUndefined)(queryStr, "undefined");
    db_1.default.getConnection((err, conn) => {
        if (err)
            next({ status: 401, err });
        else {
            conn.query(queryStr, (error, result) => {
                if (error) {
                    conn.release();
                    next({ status: 401, error });
                }
                else {
                    let queryInvoiceDetails = "INSERT INTO invoice_details(price,price_origin,id_invoice,id_product,quantity) VALUES";
                    invoices.invoice_details.forEach(item => {
                        queryInvoiceDetails += `(${item.price},${item.price_origin},${result.insertId},${item.id_product},${item.quantity}),`;
                    });
                    queryInvoiceDetails = queryInvoiceDetails.substring(0, queryInvoiceDetails.length - 1);
                    conn.query(queryInvoiceDetails, (error2, result2) => {
                        conn.release();
                        if (error2)
                            next({ status: 401, error2 });
                        else
                            res.status(200).json({ error: false, message: 'Tạo hóa đơn thành công', invoice_code: invoices.invoice_code });
                    });
                }
            });
        }
    });
};
exports.createInvoiceAndInvoiceDetail = createInvoiceAndInvoiceDetail;
// insertId
const deleteInvoiceAndInvoiceDetail = (req, res, next) => {
};
exports.deleteInvoiceAndInvoiceDetail = deleteInvoiceAndInvoiceDetail;
//# sourceMappingURL=invoices.js.map