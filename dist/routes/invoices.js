"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const invoices_1 = require("../controllers/invoices");
const router = (0, express_1.Router)();
router.route('/invoice_details/:id_invoices').get(invoices_1.getInvoiceDetailByIdInvoice);
router.route('/:id_customer').get(invoices_1.getInvoiceByIdCustomer);
router.route('/').post(invoices_1.createInvoiceAndInvoiceDetail).put(invoices_1.deleteInvoiceAndInvoiceDetail);
exports.default = router;
//# sourceMappingURL=invoices.js.map