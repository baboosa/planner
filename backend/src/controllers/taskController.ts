import { NextFunction, Request, Response } from 'express'
import { ITask, Task } from '../models/taskModel'
import { createClient } from 'redis'
import { promisify } from 'util'

// Inicializando o redis
//const redisClient = createClient({ url: process.env.REDIS_URL })
//const getCache = promisify(redisClient.get).bind(redisClient)

export const addTask = async (req: Request, res: Response) => {
    const { title, description } = req.body
    try {
        const task = new Task({ title, description })
        await task.save()

        //redisClient.del('tasks')

        res.status(201).json(task)
    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
}

export const getTaskById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const taskId = req.params.id
        const task: ITask | null = await Task.findById(taskId)

        if (!task) {
            return res.status(404).json({ error: 'Task not found' })
        }
        res.status(200).json(task)

    } catch (error: unknown) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching task' })
    }
}

export const updateTaskStatus = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { taskId } = req.params
    const { title, description, status } = req.body

    try {
        const task = await Task.findByIdAndUpdate(taskId, { title: title, description: description }, { new: true })

        if (!task) {
            return res.status(404).json({ error: 'Task not found' })
        }

        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({ error: 'Error fetching task' })
    }
}

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    try {
        const task = await Task.findByIdAndDelete(id)

        if (!task) {
            return res.status(404).json({ error: 'Task not found' })
        }

        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: 'Error fetching task' })
    }
}
