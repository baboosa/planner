import express from 'express';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes';
import cors from 'cors'
import dotenv from 'dotenv'

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI || '').then(() => {
    console.log('Conectado ao MongoDB');
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
});

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/', taskRoutes);

export default app;
