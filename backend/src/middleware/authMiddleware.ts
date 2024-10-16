import { Request, Response, NextFunction } from 'express'

// Middleware para verificar se o usuário está logado
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.id) {
        return res.status(401).json({ message: 'Unauthorized access' })
    }
    next()
}
