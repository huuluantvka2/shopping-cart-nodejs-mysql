import { Router } from 'express';
import { getAllProduct } from '../controllers/productsController';
const router = Router()
router.route('/').get(getAllProduct)

export default router