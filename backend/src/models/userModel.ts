import mongoose, { Model } from 'mongoose'
import { IUser } from '../interfaces/IUser'
import { UserSchema } from '../schemas/userSchema'

export class UserModel {
    private userModel: Model<IUser>

    constructor() {
        this.userModel = mongoose.model<IUser>('User', UserSchema)
    }

    // Método para registrar um novo usuário
    async registerUser(email: string, password: string): Promise<IUser> {
        const existingUser = await this.userModel.findOne({ email })
        if (existingUser) {
            throw new Error('Email already registered')
        }

        const newUser = new this.userModel({ email, password })
        return await newUser.save()
    }

    // Método para autenticar um usuário
    async loginUser(email: string, password: string): Promise<IUser> {
        const user = await this.userModel.findOne({ email })
        if (!user) {
            throw new Error('Invalid credentials')
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            throw new Error('Invalid credentials')
        }

        return user
    }

    // Método para encontrar um usuário por ID
    async findUserById(userId: string): Promise<IUser | null> {
        return await this.userModel.findById(userId)
    }
}
