export interface CustomerInterface {
    _id?: number,
    name: string,
    email: string,
    password: string,
    gender: 0 | 1,//1: nam, 0: nữ
    address: string,
    selling: number

}
export interface InvoicesInterface {
    _id?: number,
    invoice_code: string,
    invoice_status: string,
    create_date: string,
    total: number,
    id_customer: string,
    invoice_details: Array<InvoiceDetaislInterface>
}
export interface InvoiceDetaislInterface {
    _id?: number,
    price: number,
    price_origin: number,
    id_invoice: number
    id_product: number,
    quantity: number
}