import React, { useState } from 'react'
import api from '../services/api'

const RegisterForm: React.FC<{ onRegister: () => void }> = ({ onRegister }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await api.post('/auth/register', { email, password })
            onRegister()
        } catch (error) {
            console.error('Erro ao registrar:', error);
            alert('Erro ao registrar. Tente novamente.');
        }
    }

    return (
        <form onSubmit={handleRegister}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
            />
            <button type="submit">Registrar</button>
        </form>
    )
}

export default RegisterForm
