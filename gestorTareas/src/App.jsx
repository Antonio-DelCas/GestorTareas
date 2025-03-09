import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState(null); // Para editar una tarea
  const [editText, setEditText] = useState(''); // El texto que se va a editar
  const [filter, setFilter] = useState('all'); // Filtro de tareas

  // Añadir una nueva tarea
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

  // Vaciar la lista completa de tareas
  const clearTasks = () => {
    setTasks([]);
  };

  // Editar una tarea
  const editTaskText = (index) => {
    setEditTask(index);
    setEditText(tasks[index].text);
  };

  // Guardar la tarea editada
  const saveEdit = () => {
    const updatedTasks = tasks.map((task, index) => 
      index === editTask ? { ...task, text: editText } : task
    );
    setTasks(updatedTasks);
    setEditTask(null);
    setEditText('');
  };

  // Filtrar las tareas
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // Mostrar todas
  });

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

      {/* Contadores */}
      <p>Total de tareas: {tasks.length}</p>
      <p>Tareas completadas: {tasks.filter(task => task.completed).length}</p>

      {/* Filtro de tareas */}
      <div>
        <button onClick={() => setFilter('all')}>Todas</button>
        <button onClick={() => setFilter('completed')}>Completadas</button>
        <button onClick={() => setFilter('pending')}>Pendientes</button>
      </div>

      {/* Lista de tareas */}
      {tasks.length === 0 ? (
        <p>No hay tareas pendientes</p>
      ) : (
        <ul>
          {filteredTasks.map((task, index) => (
            <li key={index} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
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

      {/* Vaciar lista */}
      {tasks.length > 0 && <button onClick={clearTasks}>Vaciar Lista</button>}
    </div>
  );
}

export default App;
