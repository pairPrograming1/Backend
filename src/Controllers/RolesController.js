const { Rols, Users } = require('../DbIndex')

const getRolesController = async(Id) => {
    try {
        const result = await Rols.findAll();
        return result
    } catch (error) {
        throw new Error(`Error al obtener informacion ${error.message}`);        
    }
}

const changeRolesController = async (id, roleId) => {
    if (!id || !roleId) {
        throw new Error("El ID del usuario y el roleId son obligatorios");
    }

    try {
        const [updatedRows] = await Users.update(
            { roleId },
            { where: { id } }
        );

        if (updatedRows === 0) {
            throw new Error("No se encontró el usuario o el rol no cambió");
        }
        return "Rol actualizado correctamente";
    } catch (error) {
        throw new Error(`Error al actualizar el rol del usuario: ${error.message}`);
    }
};
module.exports = {
    getRolesController,
    changeRolesController
}