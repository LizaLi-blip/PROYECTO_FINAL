const API_URL = 'https://<TU-URL-JSON-SERVER>/tasks'; // Cambia esta URL por tu servidor

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Leer las tareas al cargar la página
document.addEventListener('DOMContentLoaded', fetchTasks);

// Obtener tareas desde el servidor
async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    taskList.innerHTML = '';
    tasks.forEach(task => addTaskToDOM(task));
}

// Agregar tarea al servidor
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newTask = { name: taskInput.value };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
    });

    const task = await response.json();
    addTaskToDOM(task);
    taskInput.value = '';
});

// Añadir tarea al DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        ${task.name}
        <button onclick="deleteTask(${task.id})">Eliminar</button>
    `;
    taskList.appendChild(li);
}

// Eliminar tarea del servidor
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
}
