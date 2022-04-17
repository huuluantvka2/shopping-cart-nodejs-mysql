import { Router } from 'express';
import { createInvoiceAndInvoiceDetail, deleteInvoiceAndInvoiceDetail, getInvoiceByIdCustomer, getInvoiceDetailByIdInvoice } from '../controllers/invoices';
const router = Router()
router.route('/invoice_details/:id_invoices').get(getInvoiceDetailByIdInvoice)
router.route('/:id_customer').get(getInvoiceByIdCustomer)
router.route('/').post(createInvoiceAndInvoiceDetail).put(deleteInvoiceAndInvoiceDetail)
export default router