import { Router } from 'express'
import { addTask, getTaskById } from '../controllers/taskController'
import { validateTask } from '../middleware/validationMiddleware'

const router = Router()

// routes
router.post('/tasks', validateTask, addTask)
router.get('/tasks/:id', getTaskById)

export default router