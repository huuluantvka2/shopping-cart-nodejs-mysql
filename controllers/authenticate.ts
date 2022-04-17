import { Request, Response, NextFunction } from 'express'
import connection from '../config/db'
import PoolConnection from 'mysql2/typings/mysql/lib/PoolConnection'
import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query'
import { CustomerInterface } from '../config/interface'
const existAccount = (conn: PoolConnection, email: string) => {
    return new Promise<boolean>(resolve => {

        conn.query(`select _id from customers where email='${email}'`, (err: Query.QueryError | null, result: Array<{ _id: string }>) => {
            if (err) resolve(false)
            else resolve(result.length ? true : false)
        })
    })
}
const registerController: any = (req: Request, res: Response, next: NextFunction) => {
    const cusData: CustomerInterface = req.body
    connection.getConnection((err: NodeJS.ErrnoException, conn: PoolConnection) => {
        if (err) next({ status: 401, err })
        else {
            existAccount(conn, cusData.email).then(exist => {
                if (!exist) {
                    const queryStr: string = `INSERT INTO customers(email,password,name,gender,address) VALUES('${cusData.email || null}','${cusData.password || null}','${cusData.name || null}','${cusData.gender || null}','${cusData.address || null}')`
                    conn.query(queryStr, (err: Query.QueryError | null, result: any) => {
                        conn.release()
                        if (err) next({ status: 401, message: err.message })
                        else res.status(200).json({ status: 200, message: 'Tạo tài khoản thành công', error: false })

                    })
                } else next({ status: 409, message: 'Tài khoản đã tồn tại!', error: true })
            })

        }
    })
}
const loginController: any = (req: Request, res: Response, next: NextFunction) => {
    connection.getConnection((err: NodeJS.ErrnoException, conn: PoolConnection) => {
        const queryStr: string = `SELECT customers.email FROM customers WHERE customers.email='${req.body.email}'&& customers.password='${req.body.password}'`
        conn.query(queryStr, (err: Query.QueryError | null, result: Array<{ email: string }>) => {
            conn.release()
            if (err) next({ status: 401, message: err.message })
            else if (!result.length) next({ error: true, status: 401, message: 'Tài khoản hoặc mật khẩu không đúng' })
            else res.status(200).json({ error: false, status: 200, message: 'Đăng nhập thành công' })
        })
    })
}
export { registerController, loginController }