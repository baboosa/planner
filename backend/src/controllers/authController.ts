import { Request, Response } from 'express'
import { UserModel } from '../models/userModel'

export class AuthController {
    private userModel: UserModel

    constructor() {
        this.userModel = new UserModel()
    }

    // Método para registrar o usuário
    public register = async (req: Request, res: Response): Promise<any> => {
        const { email, password } = req.body
        try {
            const user = await this.userModel.registerUser(email, password)
            req.session.id = user.id
            return res.status(201).json({ message: 'Usuário registrado com sucesso', userId: user.id })
        } catch (error) {
            return res.status(400).json({ message: '' })
        }
    }

    // Método para login do usuário
    public login = async (req: Request, res: Response): Promise<any> => {
        const { email, password } = req.body
        try {
            const user = await this.userModel.loginUser(email, password)
            req.session.id = user.id
            return res.status(200).json({ message: 'Login bem-sucedido', id: user.id })
        } catch (error) {
            return res.status(400).json({ message: '' })
        }
    }

    // Método para logout do usuário
    public logout = (req: Request, res: Response): any => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao fazer logout' })
            }
            res.clearCookie('connect.sid')
            return res.status(200).json({ message: 'Logout bem-sucedido' })
        })
    }
}
