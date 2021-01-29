// UI variables
const form = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const filterInput = document.getElementById('filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');



// call to load all event listeners
loadEventListeners();

// loadEventListeners funtion
function loadEventListeners() {
    // Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // delete task event
    taskList.addEventListener('click', deleteTask);
    // clear task list event
    clearBtn.addEventListener('click', clearTaskList);
    // filter task event
    filterInput.addEventListener('keyup', filterTask);

}

//  Get task from localstorage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else { // retrieve the item from localstorage and parse it as JSON because localstorage stores items as Strings
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // loop through each task
    tasks.forEach(function(task) {
        // create li element   <!-- <li class="collection-item"><a><i></i></a></li> -->
        const li = document.createElement('li');
        // add a class
        li.className = 'collection-item';
        // create text node and append to li. Text inside the 'li'
        const liTextNode = document.createTextNode(task);
        li.appendChild(liTextNode);
        // create new link element
        const link = document.createElement('a');
        // add class, secondary-content: shifts elements to the right in materialise
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append link to li
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);
    });
}

// addTask function
function addTask(e) {
    if (taskInput.value === '') {
        alert('No task added!');
    } else {
        // create li element   <!-- <li class="collection-item"><a><i></i></a></li> -->
        const li = document.createElement('li');
        // add a class
        li.className = 'collection-item';
        // create text node and append to li. Text inside the 'li'
        const liTextNode = document.createTextNode(taskInput.value);
        li.appendChild(liTextNode);
        // create new link element
        const link = document.createElement('a');
        // add class, secondary-content: shifts elements to the right in materialise
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append link to li
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);

        // just before the input is cleared, store the input in local storage
        storeTaskInLocalStorage(taskInput.value);

        // clear input
        taskInput.value = '';
    }

    e.preventDefault();
}

// retrieve from and save to localstorage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else { // retrieve the item from localstorage and parse it as JSON because localstorage stores items as Strings
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // add the new task to the array(tasks)
    tasks.push(task);

    // convert the new task to a string because localstorage stores items as strings
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// delete task function
function deleteTask(task) {
    // console.log(task.target.parentElement.classList.contains('delete-item'));
    // console.log(task.target.parentElement.parentElement);

    if (task.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            task.target.parentElement.parentElement.remove();

            // delete item from localStorage
            deleteTaskFromLocalStorage(task.target.parentElement.parentElement);

        }
    }
}

// delete from localStorage
function deleteTaskFromLocalStorage(taskItem) {
    // console.log(taskItem, taskItem.textContent);

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else { // retrieve the item from localstorage and parse it as JSON because localstorage stores items as Strings
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        // textContent: gets the text within the html tag
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    // set localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear task list function
function clearTaskList() {
    // taskList.innerHTML = ''; 1st method

    // 2nd method: using while loop to remove each element. This is faster
    while (taskList.firstChild) { // while there's an element (li) in the list
        taskList.removeChild(taskList.firstChild); // remove that element (li)
    }

    // clear task from localStorage
    clearTaskFromLocalStorage();
}

// clear task from localStorage
function clearTaskFromLocalStorage() {
    localStorage.clear();
}

// filter task function
function filterTask(e) {
    const text = e.target.value.toLowerCase(); // get values from the input and convert to lower case
    // console.log(text);

    // get all items with 'collection-item' class; foreach is used because querySelectorAll returns a nodelist
    // but if getElementsByClassName returns a html collection which should be converted to an array so as to use forEach()
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) { // if there's no match, it returns -1
            task.style.display = 'block'; // show if there's a match

        } else {
            task.style.display = 'none'; // hide
        }
    });
}