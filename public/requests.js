import generateTask from './generateTasks.js';

export function saveTask(newTask) {
    const url = 'http://localhost:3000/api/tasks';
    let data = {
        title: newTask.title,
        done: newTask.done
    }
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    fetch(url, fetchData)
        .then(dataWrappedByPromise => dataWrappedByPromise.text())
        .then(token => { console.log('saveTask')
        })
        .catch(err => console.log(err.message));
}

export function getTasks() {
    const url = 'http://localhost:3000/api/tasks';
    let fetchData = {
        method: 'GET',
        headers: {
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

export function updateTask(e) {
    const taskToUpdate = e.srcElement;
    const url = `http://localhost:3000/api/tasks/${taskToUpdate.parentElement.dataset.key}`;
    console.log(e.target.checked);
    let data = {
        done: e.target.checked
    }
    let fetchData = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(url, fetchData)
        .then(dataWrappedByPromise => dataWrappedByPromise.text())
        .then(tasks => {
            clearListOfTasks();
            getTasks();
        })
        .catch(err => console.log(err.message));

}

export function deleteTask(e) {
    const taskToDelete = e.srcElement;
    const url = `http://localhost:3000/api/tasks/${taskToDelete.parentElement.dataset.key}`;
    let fetchData = {
        method: 'DELETE',
        headers: {
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