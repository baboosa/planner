import { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import { IUser } from '../interfaces/IUser'

// Schema para o usuário
export const UserSchema: Schema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

// Aplicar hash na senha antes de salvar o usuário
UserSchema.pre<IUser>('save', async function (next) {
    const user = this
    if (!user.isModified('password')) return next()

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    next()
})

// Método para comparar a senha
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password)
}
