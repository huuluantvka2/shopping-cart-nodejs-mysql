import { NextFunction, Response, Request } from 'express';
import PoolConnection from 'mysql2/typings/mysql/lib/PoolConnection';
import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
import { renderPage } from '../config/be_library';
import connection from '../config/db'

const getAllProduct = (req: Request, res: Response, next: NextFunction) => {
    const page = renderPage(req.query)
    connection.getConnection((err: NodeJS.ErrnoException, conn: PoolConnection) => {
        if (err) next({ status: 401, err })
        else {
            const queryStr = `SELECT *,count(*) OVER() as total FROM products LIMIT ${page.limit} OFFSET ${page.offset}`
            conn.query(queryStr, (err: Query.QueryError | null, result: Array<any>) => {
                conn.release()
                if (err) next({ status: 401, err })
                else if (!result.length) {
                    res.json({ page, result })
                } else {
                    page.total = result[0].total
                    const data: Array<any> = result.map(item => {
                        delete item.total
                        return item
                    })
                    res.status(200).json({ status: 200, error: false, data, page })
                }
            })
        }
    })
}
export { getAllProduct }