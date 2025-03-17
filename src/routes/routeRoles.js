const { Router } = require("express");
const {
    getRolesHandler
} = require('../Handlers/RolesHandler')
const routeRoles = Router();

routeRoles.get("/", getRolesHandler);

module.exports = routeRoles;