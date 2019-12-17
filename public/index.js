const addTaskInput = document.querySelector('.task__input--add');
const addTaskButton = document.querySelector('.task__button--add');
const tasksList = document.querySelector('.tasks-list');
const tasksCheckbox = document.getElementsByClassName('task-checkbox');
const removeTaskButtons = document.getElementsByClassName('task__button--remove');
const tasks = document.getElementsByClassName('task');
const form = document.querySelector('.input__wrapper');
const registerButton = document.querySelector('#register__button');
const registerUsername = document.querySelector('#register__input--username');
const registerEmail = document.querySelector('#register__input--email');
const registerPassword = document.querySelector('#register__input--password');
const loginForm = document.querySelector('#login__form');
const loginButton = document.querySelector('#login__button');
const loginUsername = document.querySelector('#login__input--username');
const loginPassword = document.querySelector('#login__input--password');

window.addEventListener('DOMContentLoaded', getTasks());

addTaskInput.addEventListener('keyup', verifyKeyPressed);
addTaskButton.addEventListener('click', addTask);
loginButton.addEventListener('submit', login);
registerButton.addEventListener('submit', register);
Array.from(tasksCheckbox).forEach(checkbox => checkbox.addEventListener('change', updateTask));
Array.from(removeTaskButtons).forEach(removeTaskButton => removeTaskButton.addEventListener('click', deleteTask));

function verifyKeyPressed(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        addTask();
    }
    return;
};

function addTask() {
    if (!addTaskInput.value || addTaskInput.value.length < 3) return;
    const newTask = {
        title: addTaskInput.value,
        done: false
    }
    saveTask(newTask);
    clearListOfTasks();
    getTasks();
}

function clearListOfTasks() {
    Array.from(tasks).forEach(task => task.remove());
    console.log('all removed');
}

function saveTask(newTask) {
    const url = 'http://localhost:3000/api/tasks';
    const authKey = window.localStorage.getItem('x-auth-token');
    let data = {
        title: newTask.title,
        done: newTask.done
    }
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': authKey,
        }
    }
    fetch(url, fetchData)
        .then(dataWrappedByPromise => dataWrappedByPromise.text())
        .then(token => {
            window.localStorage.getItem('x-auth-token', token);
        })
        .catch(err => console.log(err.message));
}

function removeTask() {
    this.parentElement.remove();
    console.log('task removed');
}

function register() {
    const url = 'http://localhost:3000/auth/register';
    let data = {
        username: registerUsername.value,
        email: registerEmail.value,
        password: registerPassword.value
    }
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(url, fetchData)
        .then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => console.log(err))
}

function login() {
    const url = 'http://localhost:3000/auth/login';
    let data = {
        username: loginUsername.value,
        password: loginPassword.value
    }
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(url, fetchData)
        .then(dataWrappedByPromise => dataWrappedByPromise.text())
        .then(token => {
            window.localStorage.setItem('x-auth-token', token);
        })
        .catch(err => console.log(err.message));
}

function getTasks() {
    const url = 'http://localhost:3000/api/tasks';
    const authKey = window.localStorage.getItem('x-auth-token');
    let fetchData = {
        method: 'GET',
        headers: {
            'x-auth-token': authKey,
            'Content-Type': 'application/json'
        }
    }
    fetch(url, fetchData)
        .then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then(tasks => {
            tasks.map(taskToGenerate =>generateTask(taskToGenerate))
        })
        .catch(err => console.log(err.message));
}

function generateTask(taskToGenerate) {
    let checkbox = document.createElement('input');
    let span = document.createElement('span');
    let button = document.createElement('button');
    let task = document.createElement('li');
    task.className = 'task';
    task.dataset.key = taskToGenerate._id;
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = taskToGenerate.done;
    checkbox.addEventListener('change', updateTask);
    task.appendChild(checkbox);
    span.className = 'task-title';
    span.innerHTML = taskToGenerate.title;
    task.appendChild(span);
    button.className = 'task__button--remove';
    button.innerHTML = 'Delete';
    button.addEventListener('click', deleteTask);
    task.appendChild(button);
    tasksList.appendChild(task);
}

function updateTask(e) {
    // if (this.checked) {
    //     this.parentElement.style.backgroundColor = 'grey';
    //     console.log('done');
    // } else {
    //     e.target.parentElement.style.backgroundColor = 'rgb(0, 150, 136)';
    //     console.log('undone');
    // }
    const taskToUpdate = e.srcElement;
    const url = `http://localhost:3000/api/tasks/${taskToUpdate.parentElement.dataset.key}`;
    const authKey = window.localStorage.getItem('x-auth-token');
    console.log(e.target.checked);
    let data = {
        done: e.target.checked
    }
    let fetchData = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'x-auth-token': authKey,
            'Content-Type': 'application/json'
        }
    }
    fetch(url, fetchData)
        .then(dataWrappedByPromise => dataWrappedByPromise.text())
        .then(tasks => {
            console.log('Task updated succesfully');
            clearListOfTasks();
            getTasks();
        })
        .catch(err => console.log(err.message));

}

function deleteTask(e) {
    const taskToDelete = e.srcElement;
    const url = `http://localhost:3000/api/tasks/${taskToDelete.parentElement.dataset.key}`;
    const authKey = window.localStorage.getItem('x-auth-token');
    let fetchData = {
        method: 'DELETE',
        headers: {
            'x-auth-token': authKey,
            'Content-Type': 'application/json'
        }
    }
    fetch(url, fetchData)
        .then(dataWrappedByPromise => dataWrappedByPromise.text())
        .then(tasks => {
            console.log('Task deleted succesfully');
            clearListOfTasks();
            getTasks();
        })
        .catch(err => console.log(err.message));

}
