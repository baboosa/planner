import React, { useEffect, useState } from 'react';
import api from './services/api';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { ITask } from '../task'

const App: React.FC = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        fetchTasks();
    };

    const handleRegister = () => {
        setShowRegister(false);
    };

    const handleTaskAdded = (task: ITask) => {
        setTasks((prev) => [...prev, task]);
    };

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error('Erro ao remover tarefa:', error);
        }
    };

    const handleToggleStatus = async (id: string) => {
        try {
            const taskToUpdate = tasks.find((task) => task._id === id);
            if (taskToUpdate) {
                const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.status };
                await api.put(`/tasks/${id}`, updatedTask);
                setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
            }
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
        }
    };

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <h1>Tarefas</h1>
                    <TaskForm onTaskAdded={handleTaskAdded} />
                    <TaskList tasks={tasks} onDelete={handleDelete} onToggleStatus={handleToggleStatus} />
                </>
            ) : (
                <div>
                    {showRegister ? (
                        <RegisterForm onRegister={handleRegister} />
                    ) : (
                        <LoginForm onLogin={handleLogin} />
                    )}
                    <button onClick={() => setShowRegister((prev) => !prev)}>
                        {showRegister ? 'Já tem uma conta? Faça login' : 'Não tem uma conta? Registre-se'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default App;
