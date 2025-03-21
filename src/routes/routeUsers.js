const { Router } = require('express');
const { createUsserHandler, obtenerUserHandler, 
    obtenerUserGridHandler, updateUserHandler} = require('../Handlers/UserHandler');


const routeUsers = Router();
routeUsers.post('/register', createUsserHandler);
routeUsers.get('/perfil/:id', obtenerUserHandler);
routeUsers.get('/grid', obtenerUserGridHandler);
routeUsers.put('/perfil/:id', updateUserHandler);
module.exports = routeUsers;