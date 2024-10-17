import { Request, Response } from 'express'
import { UserModel } from '../models/userModel'
import 'express-session'

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
            req.session.userId = user.id
            return res.status(201).json({ message: 'User registered successfully', userId: user.id })
        } catch (error: any) {
            if (error.message === 'Email already registered') {
                return res.status(400).json({ message: "Email already registered" })
            }
    
            if (error.code === 11000) {
                return res.status(400).json({ message: "Email already registered" })
            }
    
            console.error(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    // Método para login do usuário
    public login = async (req: Request, res: Response): Promise<any> => {
        const { email, password } = req.body

        try {
            const user = await this.userModel.loginUser(email, password)
            req.session.userId = user.id

            return res.status(200).json({ message: 'Login successful', id: user.id })
        } catch (error) {
            console.error(error)
            return res.status(400).json({ message: "Incorrect username or password" })
        }
    }

    // Método para logout do usuário
    public logout = (req: Request, res: Response): Promise<void> => {
        return new Promise((resolve) => {
            req.session.destroy((err) => {
                if (err) {
                    res.status(500).json({ message: 'Error logging out' })
                    return resolve()
                }
                res.clearCookie('connect.sid')
                res.status(200).json({ message: 'Successful logout' })
                resolve()
            })
        })
    }
}
