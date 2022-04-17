import { Router } from 'express'
import { loginController, registerController } from '../controllers/authenticate'
const router = Router()
router.route('/signup').post(registerController)
router.route('/signin').post(loginController)
export default router