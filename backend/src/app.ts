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
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.error('Error connecting to MongoDB: ', error)
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
