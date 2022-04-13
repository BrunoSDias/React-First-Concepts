import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function uniqueId(): number {
    const random = Math.random();
    return tasks.find(task => task.id === random) ? uniqueId() : random;
  }

  function handleCreateNewTask() {
    const newTask: Task = {
      id: uniqueId(),
      title: newTaskTitle,
      isComplete: false
    }
    setTasks(prevState => [...prevState, newTask])
  }

  function handleToggleTaskCompletion(id: number) {
    const handledTasks = tasks.map(task => task.id === id ? {...task, isComplete: !task.isComplete } : task )
    setTasks(handledTasks)
  }

  function handleRemoveTask(id: number) {
    const handledTasks = tasks.filter(task => task.id !== id)
    setTasks(handledTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={() => newTaskTitle && handleCreateNewTask()}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}