import { Request, Response } from 'express'
import { Task } from '../models/taskModel'
import { createClient } from 'redis'
import { promisify } from 'util'

// Inicializando o redis
const redisClient = createClient({ url: process.env.REDIS_URL })
const getCache = promisify(redisClient.get).bind(redisClient)

export const addTask = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    try {
        const task = new Task({ title, description });
        await task.save();
        
        // Invalida o cache quando uma nova tarefa é adicionada
        redisClient.del('tasks');

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}