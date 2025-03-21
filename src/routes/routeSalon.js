const { Router } = require("express");
const {
    getGridSalonesHandler,
    getSalonHandler,
    postSalonHandler,
    postUserSalonHandler
} = require('../Handlers/SalonesHandler')
const routeSalon = Router();

routeSalon.get("/", getGridSalonesHandler);
routeSalon.get("/:id", getSalonHandler);
routeSalon.post("/", postSalonHandler);
routeSalon.post("/adduser", postUserSalonHandler);


module.exports = routeSalon;