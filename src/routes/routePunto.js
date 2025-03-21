const { Router } = require("express");
const {
    createPuntoDeVentaHandler,
    putPuntoDeVentaHandler,
    getPuntoDeVentaByIdHandler
} = require('../Handlers/PuntodeVentaHandler')
const routePunto = Router();

routePunto.post("/", createPuntoDeVentaHandler);
routePunto.put("/:id", putPuntoDeVentaHandler);
routePunto.get("/:id", getPuntoDeVentaByIdHandler);

module.exports = routePunto;