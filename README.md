# client for MESI project

## Rewrited With React & Redux
Mesi project is sort of project management tool (kind of my implementation of kanban board)
[Here](https://github.com/shootermv/mesi) is link to old version of mesi project

## link to server project
[link](https://github.com/shootermv/node-mongo-registration-login-api) to Server part of the project

## Based On
React + Redux - User Registration and Login Tutorial & Example

[demo](http://mesi-tasks.herokuapp.com/)

## Authentication
Mesi contains user authentication implementation with "Admin" and "User" roles.
Admin - for a team leader and User - for  programmer.

Team leader can create tasks and drag them to programmer earea - to assign the task to the programmer.
Programmers can notify their progress by changing the status of the task (by clicking on status label):

* `new`
* `active` - the task programmer is currently working on (will appear blue at Admin's dashboard)
* `completed`

## Stack

* Persistence store: [MongoDB](http://www.mongodb.org/)
* Backend: [Node.js](http://nodejs.org/)
* Awesome [AngularJS](http://www.angularjs.org/) on the client
* Responsive CSS based on [Twitter's bootstrap](http://twitter.github.com/bootstrap/)
* Real Time syncronization based on [socket.io](https://socket.io/)


### Setup Develop Environment
* (You should have node and Mongodb nistalled and running)
* clone project `git clone https://github.com/shootermv/mesi-react.git`
* run `npm i` to install dependencies
* run  `npm start`

### Run Tests
* run  `npm test`