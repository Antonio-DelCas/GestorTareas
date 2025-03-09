import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Añadir una nueva tarea (inicialmente no completada)
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // Eliminar una tarea por índice
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
  };

  // Marcar/desmarcar una tarea como completada
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, taskIndex) => 
      taskIndex === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Gestor de Tareas</h1>

      {/* Añadir nuevas tareas */}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Añadir nueva tarea"
      />
      <button onClick={addTask}>Añadir</button>

      {/* Lista de tareas */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
            <button onClick={() => toggleTaskCompletion(index)}>
              {task.completed ? 'Desmarcar' : 'Completar'}
            </button>
            <button onClick={() => deleteTask(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
