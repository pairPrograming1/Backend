const { Router } = require("express");
const {
    createPuntoDeVentaHandler,
    putPuntoDeVentaHandler,
    getPuntoDeVentaByIdHandler,
    addVendedorPuntoHandler
} = require('../Handlers/PuntodeVentaHandler')
const routePunto = Router();

routePunto.post("/", createPuntoDeVentaHandler);
routePunto.put("/:id", putPuntoDeVentaHandler);
routePunto.get("/:id", getPuntoDeVentaByIdHandler);
routePunto.post("/addvendedor", addVendedorPuntoHandler);

module.exports = routePunto;