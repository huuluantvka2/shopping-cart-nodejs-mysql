import { NextFunction, Response, Request, query } from 'express';
import PoolConnection from 'mysql2/typings/mysql/lib/PoolConnection';
import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
import { clearUndefined, renderPage } from '../config/be_library';
import connection from '../config/db'
import { InvoicesInterface } from '../config/interface';

const getInvoiceByIdCustomer = (req: Request, res: Response, next: NextFunction) => {
    if (req.params.id_customer) {
        connection.getConnection((err: NodeJS.ErrnoException, conn: PoolConnection) => {
            let page = renderPage(req.query)
            const queryStr: string = `SELECT *,COUNT(*) OVER() AS total FROM invoices WHERE id_customer=${+req.params.id_customer} LIMIT ${page.limit} OFFSET ${page.offset}`
            console.log(queryStr)
            conn.query(queryStr, (error: Query.QueryError | null, result: Array<any>) => {
                console.log(result)
                conn.release()
                if (error) next({ status: 401, error })
                else {
                    page = renderPage(req.query, result[0]?.total)
                    const data: Array<any> = result.map(item => {
                        delete item.total
                        return item
                    })
                    res.json({ status: 200, error: false, data, page })
                }
            })
        })
    } else next({ status: 401, message: 'Thiếu trường id_customer' })
}
const getInvoiceDetailByIdInvoice = (req: Request, res: Response, next: NextFunction) => {
    if (req.params.id_invoices) {
        connection.getConnection((err: NodeJS.ErrnoException, conn: PoolConnection) => {
            const queryStr: string = `SELECT invoice_details.*,products.type,products.name,products.description,products.image,products.selling FROM invoice_details,products WHERE invoice_details.id_invoice = ${req.params.id_invoices} and invoice_details.id_product = products._id;`
            conn.query(queryStr, (error: Query.QueryError | null, result: Array<any>) => {
                conn.release()
                if (error) next({ status: 401, error })
                else res.json({ status: 200, error: false, data: result })
            })
        })
    } else next({ status: 401, message: 'Thiếu trường id_invoices' })
}
const createInvoiceAndInvoiceDetail = (req: Request, res: Response, next: NextFunction) => {
    const invoices: InvoicesInterface = req.body
    let queryStr: string = `INSERT INTO invoices(invoice_code,invoice_status,create_date,total,id_customer) VALUES('${invoices.invoice_code}',1,'${invoices.create_date}',${invoices.total},${invoices.id_customer})`
    queryStr = clearUndefined(queryStr, "'undefined'")
    queryStr = clearUndefined(queryStr, "undefined")
    connection.getConnection((err: NodeJS.ErrnoException, conn: PoolConnection) => {
        if (err) next({ status: 401, err })
        else {
            conn.query(queryStr, (error: Query.QueryError | null, result: any) => {
                if (error) {
                    conn.release()
                    next({ status: 401, error })
                } else {
                    let queryInvoiceDetails: string = "INSERT INTO invoice_details(price,price_origin,id_invoice,id_product,quantity) VALUES"
                    invoices.invoice_details.forEach(item => {
                        queryInvoiceDetails += `(${item.price},${item.price_origin},${result.insertId},${item.id_product},${item.quantity}),`
                    })
                    queryInvoiceDetails = queryInvoiceDetails.substring(0, queryInvoiceDetails.length - 1)
                    conn.query(queryInvoiceDetails, (error2: Query.QueryError | null, result2: any) => {
                        conn.release()
                        if (error2) next({ status: 401, error2 })
                        else res.status(200).json({ error: false, message: 'Tạo hóa đơn thành công', invoice_code: invoices.invoice_code })
                    })
                }

            })
        }
    })

}
// insertId
const deleteInvoiceAndInvoiceDetail = (req: Request, res: Response, next: NextFunction) => {


}
export { getInvoiceByIdCustomer, getInvoiceDetailByIdInvoice, createInvoiceAndInvoiceDetail, deleteInvoiceAndInvoiceDetail }