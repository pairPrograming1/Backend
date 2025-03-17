const { Router } = require('express');
const { createUsserHandler, obtenerUserHandler, 
    obtenerUserGridHandler, updateUserHandler} = require('../Handlers/UserHandler');


const routeUsers = Router();
routeUsers.post('/register', createUsserHandler);
module.exports = routeUsers;