export default function generateTask(taskToGenerate) {
    let checkbox = document.createElement('input');
    let span = document.createElement('span');
    let button = document.createElement('button');
    let task = document.createElement('li');
    (taskToGenerate.done === true) ? task.className = 'task task--done' : task.className = 'task';
    task.dataset.key = taskToGenerate._id;
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = taskToGenerate.done;
    checkbox.addEventListener('change', updateTask);
    task.appendChild(checkbox);
    span.className = 'task-title';
    span.innerHTML = taskToGenerate.title;
    task.appendChild(span);
    button.className = 'button task__button--remove';
    button.innerHTML = 'Delete';
    button.addEventListener('click', deleteTask);
    task.appendChild(button);
    tasksList.appendChild(task);
}
