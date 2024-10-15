import { Router } from 'express'
import { addTask, getTaskById, updateTaskStatus } from '../controllers/taskController'
import { validateTask } from '../middleware/validationMiddleware'

const router = Router()

// routes
router.post('/tasks', validateTask, addTask)
router.get('/tasks/:id', getTaskById)
router.patch('/tasks/:taskId', validateTask, updateTaskStatus)

export default router