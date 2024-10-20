// Mendapatkan elemen DOM
const todoForm = document.getElementById('todoForm');
const taskList = document.getElementById('taskList');
const completedTasks = document.getElementById('completedTasks');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Fungsi untuk menambahkan tugas baru 
function addTask(description, category, priority) {
    const task = { description, category, priority, completed: false };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Fungsi untuk menampilkan tugas
function renderTasks() {
    taskList.innerHTML = '';
    completedTasks.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <span class="${getPriorityClass(task.priority)}">${task.description} (${task.category})</span>
            <div>
                <button onclick="completeTask(${index})">Selesai</button>
                <button onclick="deleteTask(${index})">Hapus</button>
            </div>
        `;
        if (task.completed) {
            completedTasks.appendChild(taskElement);
        } else {
            taskList.appendChild(taskElement);
        }
    });
}

// Fungsi untuk mendapatkan kelas prioritas
function getPriorityClass(priority) {
    if (priority === 'Tinggi') return 'priority-high';
    if (priority === 'Sedang') return 'priority-medium';
    return 'priority-low';
}

// Fungsi untuk menandai tugas sebagai selesai
function completeTask(index) {
    tasks[index].completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Fungsi untuk menghapus tugas
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Fungsi utama untuk menangani form submit
todoForm.onsubmit = function (e) {
    e.preventDefault();
    const description = document.getElementById('taskDescription').value;
    const category = document.getElementById('taskCategory').value;
    const priority = document.getElementById('taskPriority').value;
    addTask(description, category, priority);
    todoForm.reset();
};

// Memuat tugas saat halaman pertama kali dimuat
renderTasks();
