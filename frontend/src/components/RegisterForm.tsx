import React, { useState } from 'react'
import api from '../services/api'
import './RegisterForm.css'

const RegisterForm: React.FC<{ onRegister: () => void }> = ({ onRegister }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert('As senhas não coincidem.')
            return
        }

        try {
            await api.post('/auth/register', { email, password })
            onRegister()
        } catch (error) {
            console.error('Erro ao registrar:', error)
            alert('Erro ao registrar. Tente novamente.')
        }
    }

    return (
        <div className="container">
            <div className="register-form">
                <h1>Registrar</h1>
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
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirme sua senha"
                        required
                    />
                    <button type="submit">Registrar</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm
