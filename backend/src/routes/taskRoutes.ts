import { Router } from 'express'
import { addTask } from '../controllers/taskController'
import { validateTask } from '../middleware/validationMiddleware'

const router = Router()

// routes
router.post('/tasks', validateTask, addTask)

export default router