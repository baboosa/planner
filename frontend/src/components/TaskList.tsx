import React from 'react'
import { ITask } from '../../task'

const TaskList: React.FC<{ tasks: ITask[]; onDelete: (id: string) => void; onToggleStatus: (id: string) => void }> = ({ tasks, onDelete, onToggleStatus }) => {
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task._id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <button onClick={() => onToggleStatus(task._id)}>
                        {task.status ? 'Marcar como Pendente' : 'Marcar como Completo'}
                    </button>
                    <button onClick={() => onDelete(task._id)}>Remover</button>
                </li>
            ))}
        </ul>
    )
}

export default TaskList
