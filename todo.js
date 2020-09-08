// UI variables
const form = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const filter = document.getElementById('filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');



// call to load all event listeners
loadEventListeners();

// loadEventListeners funtion
function loadEventListeners() {
    // Add task event
    form.addEventListener('submit', addTask);
    // delete task event
    taskList.addEventListener('click', deleteTask);
    
}

// addTask function
function addTask(e) {
    if(taskInput.value === '') {
        alert('No task added!');
    } else {
        // create li element
        const li = document.createElement('li');
        // add a class
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // create link element
        const link = document.createElement('a');
        // add class, secondary-content: shifts elements to the right in materialise
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append link to li
        li.appendChild(link);

        // append li to ul
        taskList.appendChild(li);
        // clear input
        taskInput.value = '';
    }

    e.preventDefault();
}

// delete task function
function deleteTask(task) {
    if (task.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            task.target.parentElement.parentElement.remove();
        }
        

    }
}