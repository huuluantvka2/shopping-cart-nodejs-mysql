import { Express } from 'express'
import AuthenticateRoutes from './authenticate'
import ProductRoutes from './products'
import InvoiceRoutes from './invoices'
function RouterConfig(app: Express) {
    app.use('/v1/authenticate', AuthenticateRoutes)
    app.use('/v1/products', ProductRoutes)
    app.use('/v1/invoices', InvoiceRoutes)
}
export default RouterConfig