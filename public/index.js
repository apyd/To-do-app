import { saveTask, getTasks, updateTask, deleteTask } from './requests.js';
import generateTasks from './generateTasks.js';

const addTaskInput = document.querySelector('.task__input--add');
const addTaskButton = document.querySelector('.task__button--add');
const tasksList = document.querySelector('.tasks-list');
const tasksCheckbox = document.getElementsByClassName('task-checkbox');
const removeTaskButtons = document.getElementsByClassName('task__button--remove');
const tasks = document.getElementsByClassName('task');

window.addEventListener('DOMContentLoaded', getTasks());
addTaskInput.addEventListener('keyup', verifyKeyPressed);
addTaskButton.addEventListener('click', addTask);
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
        done: false,
    }
    saveTask(newTask);
    clearListOfTasks();
    getTasks();
}

function clearListOfTasks() {
    Array.from(tasks).forEach(task => task.remove());
}





