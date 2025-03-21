const { Router } = require("express");
const {
    loginHandler
} = require('../Handlers/LoginHandler')
const routeLogin = Router();

routeLogin.post("/", loginHandler);

module.exports = routeLogin;