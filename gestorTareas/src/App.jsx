import './index.css';  // Estilos globales
import './App.css';    // Estilos específicos de App

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all'); // Nuevo filtro de prioridad

  // Cargar tareas desde localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks && Array.isArray(storedTasks)) {
      setTasks(storedTasks);
    }
  }, []);

  // Guardar tareas en localStorage cada vez que cambian
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = {
        text: newTask,
        completed: false,
        priority: priority,
        dueDate: dueDate,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
      setPriority('low');
      setDueDate('');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const editTaskText = (index) => {
    setEditTask(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = () => {
    const updatedTasks = tasks.map((task, index) =>
      index === editTask ? { ...task, text: editText } : task
    );
    setTasks(updatedTasks);
    setEditTask(null);
    setEditText('');
  };

  // Filtrar tareas según el estado y la prioridad
  const filteredTasks = tasks.filter((task) => {
    // Filtrar por estado (completado o pendiente)
    if (filter === 'completed' && !task.completed) return false;
    if (filter === 'pending' && task.completed) return false;

    // Filtrar por prioridad
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

    return true;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'yellow';
      case 'low':
        return 'green';
      default:
        return 'green';
    }
  };

  return (
    <div className="App">
      <h1>Gestor de Tareas</h1>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Añadir nueva tarea"
      />
      <select onChange={(e) => setPriority(e.target.value)} value={priority}>
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={addTask}>Añadir</button>

      <p>Total de tareas: {tasks.length}</p>
      <p>Tareas completadas: {tasks.filter(task => task.completed).length}</p>

      {/* Filtros de estado */}
      <div>
        <button onClick={() => setFilter('all')}>Todas</button>
        <button onClick={() => setFilter('completed')}>Completadas</button>
        <button onClick={() => setFilter('pending')}>Pendientes</button>
      </div>

      {/* Filtro por prioridad */}
      <div>
        <select onChange={(e) => setPriorityFilter(e.target.value)} value={priorityFilter}>
          <option value="all">Todas</option>
          <option value="high">Alta</option>
          <option value="medium">Media</option>
          <option value="low">Baja</option>
        </select>
      </div>

      {tasks.length === 0 ? (
        <p>No hay tareas pendientes</p>
      ) : (
        <ul>
          {filteredTasks.map((task, index) => (
            <li
              key={index}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                borderLeft: `5px solid ${getPriorityColor(task.priority)}`,
                padding: '10px',
                margin: '5px 0',
              }}
            >
              {editTask === index ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={saveEdit}>Guardar</button>
                </>
              ) : (
                <>
                  {task.text}
                  {task.dueDate && <span> - Fecha límite: {task.dueDate}</span>}
                  <button onClick={() => toggleTaskCompletion(index)}>
                    {task.completed ? 'Desmarcar' : 'Completar'}
                  </button>
                  <button onClick={() => deleteTask(index)}>Eliminar</button>
                  <button onClick={() => editTaskText(index)}>Editar</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {tasks.length > 0 && <button onClick={() => setTasks([])}>Vaciar Lista</button>}
    </div>
  );
}

export default App;
