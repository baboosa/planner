// src/components/LoginForm.tsx
import React, { useState } from 'react';
import api from '../services/api';
import './LoginForm.css';

const LoginForm: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await api.post('/auth/login', { email, password });
            onLogin();
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login. Verifique suas credenciais.');
        }
    };

    return (
        <div className="container">
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
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
                    <div className="remember-me">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Lembrar-me</label>
                    </div>
                    <button type="submit">Login</button>
                    <button type="button" className="link-button">Esqueceu sua senha?</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
