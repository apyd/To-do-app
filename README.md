# Todo application 

Todo application prepared as 4th project in Coderscamp bootcamp.

![alt text](https://images.tinypic.pl/i/00994/c3cm705771jf.png "Register panel")

![alt text](https://images.tinypic.pl/i/00994/qhhesa1qz4ng.png "Login panel")

![alt text](https://images.tinypic.pl/i/00994/szzcfif5nzou.png "Dashboard")

## Project aim

Project aim was to prepare backend and frontend for todo application that allows to add tasks, mark them as done/undone or to remove tasks from list. Dashboard is accessible only for logged users - beside dashboard application has also register and login view which allow user to create new account and then log in.



## Technologies

Project backend was written using Node.JS.
Project frontend was written using PUG/HTML5, CSS3, Javascript - hovewer views are server side rendered. Each view was prepared in pug template and webpack translates it to HTML as a final output.
Project is adapted to work only with mongoDB.

## Config

Application use environment variables as following:

DB_CONNECT = 
PORT = 
SECRET_KEY = 
TOKEN = 
USER_ID = 

Only DB_CONNECT, PORT and SECRET_KEY are needed to be defined for application running.
TOKEN and USER_ID will be overwritten during usage by server so there is no need to define them.

## How to run project

To run application on development environment use npm run dev

To run application on production environment use npm run build

## Endpoints

To use do API calls using API clients you have to provide TOKEN as 'x-auth-token' in header.
TOKEN is generated when do API call POST on /auth/login with username and password fields provided in request body.

Available endpoints:
GET /api/tasks - to get list of all tasks
GET /api/tasks/:id - to get particular task with ID

POST /api/tasks - To add new task. In request body please provide at least 'title' - it is also allowed to send 'done' status so new task can be automatically marked as done.

PUT /api/tasks/:id - to update particular task. In request body please provide at least 'title' - it is also allowed to send 'done' status so updated task can be marked as done/undone after update.

DELETE /api/tasks:id - to remove task
