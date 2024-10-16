import express from 'express'
import { AuthController } from '../controllers/authController'

const router = express.Router()
const authController = new AuthController()

// Rota para registrar um novo usuário
router.post('/register', authController.register)

// Rota para login
router.post('/login', authController.login)

// Rota para logout
router.post('/logout', authController.logout)

export default router
