const { Router } = require("express");
const {
    getRolesHandler, changeRoleHandler
} = require('../Handlers/RolesHandler')
const routeRoles = Router();

routeRoles.get("/", getRolesHandler);
routeRoles.put("/", changeRoleHandler);

module.exports = routeRoles;