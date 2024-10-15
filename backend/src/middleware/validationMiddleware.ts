import { Request, Response, NextFunction } from 'express'

export const validateTask = (req: any, res: any, next: NextFunction) => {
    const { title } = req.body

    if (!title || title.trim().length === 0) {
        return res.status(400).json({ error: 'O título da tarefa é obrigatório.' })
    }

    next()
}
