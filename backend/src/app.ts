import express from 'express'
import mongoose from 'mongoose'
import taskRoutes from './routes/taskRoutes'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
import { sessionMiddleware } from './config/session'

// Carregar variáveis de ambiente
dotenv.config()

const app = express()

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI || '').then(() => {
    console.log('Conectado ao MongoDB')
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error)
})

// Middlewares
app.use(cors())
app.use(express.json())
app.use(sessionMiddleware) // Usar sessões


// Rotas
app.use('/tasks', taskRoutes)
app.use('/auth', authRoutes)

app.use(express.json())

export default app
