const { Punto_de_venta, Users, Rols } = require('../DbIndex');

const createPuntoDeVentaController = async (data) => {
    try {
        const [existingSalond, created] = await Punto_de_venta.findOrCreate({
            where: {nombre:data.nombre},
            defaults: data,
        })
        if (!created) {
            return { success: false, message: 'El punto de venta ya existe' };
          }
          return { success: true, message: 'Punto de venta creado exitosamente' };
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}
const putPuntoDeVentaController = async(id, data) => {
    try {
        const [updatedRows] = await Punto_de_venta.update(data, { where: {id} });
        if (updatedRows === 0) {
            return { success: false, message: 'No se encontró el punto de venta o no hubo cambios' };
        }

        return { success: true, message: 'Actualización exitosa' };
    } catch (error) {
        throw new Error(` ${error.message}`);
    }
}
const getPuntoDeVentaByIdController = async (id) => {
    try {
        const puntoDeVenta = await Punto_de_venta.findByPk(id, {
            attributes: ['razon', 'cuit', 'direccion','nombre','email', 'telefono' ]
        });
        if (!puntoDeVenta) {
            return { success: false, message: "Punto de venta no encontrado" };
        }

        return { success: true, data: puntoDeVenta };
    } catch (error) {
        throw new Error(`Error al obtener el punto de venta: ${error.message}`);
    }
}
module.exports = {
    createPuntoDeVentaController,
    putPuntoDeVentaController,
    getPuntoDeVentaByIdController,

}