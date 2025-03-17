const { Rols } = require('../DbIndex')

const getRolesController = async(Id) => {
    try {
        const result = await Rols.findAll();
        return result
    } catch (error) {
        throw new Error(`Error al obtener informacion ${error.message}`);        
    }
}

module.exports = {
    getRolesController
}