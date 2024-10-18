import React, { useState } from 'react'
import api from '../services/api'
import { ITask } from '../../task'
import './TaskForm.css'

const TaskForm: React.FC<{ onTaskAdded: (task: ITask) => void }> = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newTask: ITask = { title, description, status: false }
        try {
            const response = await api.post('/tasks/tasks', newTask)
            onTaskAdded(response.data)
            setTitle('')
            setDescription('')
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error)
            alert('Erro ao adicionar tarefa. Tente novamente.')
        }
    }

    return (
        <div className="form-container"> { }
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título"
                    required
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrição"
                    required
                />
                <button type="submit">Adicionar Tarefa</button>
            </form>
        </div>
    )
}

export default TaskForm
