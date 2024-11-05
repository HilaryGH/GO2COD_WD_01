const InputEL = document.getElementById('input-el');
const BtnEl = document.getElementById('btn-el');
const TaskItem = document.getElementById('task-item');
let editingTask = null;

// Display current date in 'currentDate' element without saving it as a task
const today = new Date();
const formattedDate = today.toISOString().split('T')[0];
document.getElementById('currentDate').textContent = formattedDate;

// Display tasks on page load
displayItems();

BtnEl.addEventListener('click', () => {
    if (InputEL.value === '') return alert('Please add a task');
    
    if (editingTask) {
        editingTask.querySelector('span').textContent = InputEL.value;
        editingTask = null;
        BtnEl.textContent = '+'; 
        BtnEl.classList.remove('update-mode');
    } else {
        const taskList = document.createElement("li");
        taskList.innerHTML = `
            <span>${InputEL.value}</span>
            <button onclick="deleteTask(this)"><i class="material-icons">delete</i></button>
            <button onclick="editTodo(this)"><i class="material-icons">edit</i></button>
            <input onclick="toggleComplete(this)" type="checkbox"/>
        `;
        TaskItem.appendChild(taskList);
    }

    InputEL.value = '';
    saveTasks();  // Save all tasks to local storage after adding
});

function deleteTask(button) {
    const taskList = button.parentNode;
    TaskItem.removeChild(taskList);
    saveTasks();  // Update local storage after deletion
}

function editTodo(button) {
    editingTask = button.parentNode;
    const taskText = editingTask.querySelector('span').textContent;
    InputEL.value = taskText; 
    BtnEl.textContent = '+'; 
    BtnEl.classList.add('update-mode');
}

function toggleComplete(checkbox) {
    const taskItem = checkbox.parentNode;
    taskItem.querySelector('span').style.textDecoration = checkbox.checked ? 'line-through' : 'none';
}

function saveTasks() {
    let tasks = [];
    
    // Collect only the task text from each 'li' element in the list
    TaskItem.querySelectorAll('li').forEach((item) => {
        const taskText = item.querySelector('span').textContent.trim();
        if (taskText) tasks.push(taskText); // Only add if taskText is non-empty
    });

    // Save tasks array to local storage
    localStorage.setItem('todos', JSON.stringify(tasks));
}

function displayItems() {
    const items = JSON.parse(localStorage.getItem('todos')) || [];
    if (!Array.isArray(items)) return;

    // Clear the existing list in the display
    TaskItem.innerHTML = '';

    // Display each task item in the proper format
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${item}</span>
            <button onclick="deleteTask(this)"><i class="material-icons">delete</i></button>
            <button onclick="editTodo(this)"><i class="material-icons">edit</i></button>
            <input onclick="toggleComplete(this)" type="checkbox"/>
        `;
        TaskItem.appendChild(listItem);
    });
}






