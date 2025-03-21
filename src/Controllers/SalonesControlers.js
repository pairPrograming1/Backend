const { Salones, Users, Rols } = require('../DbIndex')

const getGridSalonesController = async () => {
    try {
        const result = await Salones.findAll({
            attributes: ['salon', 'cuit', 'nombre', 'email', 'whatsapp']
        });
        return { success: true, data: result };
    } catch (error) {
        throw new Error(`Error al obtener la información de los salones: ${error.message}`);
    }
}

const getSalonController = async (id, data) => {
    try {
        const result = await Salones.findByPk(id);
        if (!result) {
            throw new Error("Salón no encontrado");
        }
        return { success: true, data: result };
    } catch (error) {
        throw new Error(`Error al obtener informacion ${error.message}`);
    }
}

const postSalonController = async (data) => {
    try {
        const [existingSalond, created] = await Salones.findOrCreate({
            where: { salon: data.salon },
            defaults: data,
        })
        if(!created) {
            return { success: false, message: 'El salón ya existe' };
        }
        return { success: true, message: 'Salón creado exitosamente' };
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}

const postUserSalonController = async (userId, salonId) => {
    try {
        const user = await Users.findByPk(userId);
        const salon = await Salones.findByPk(salonId);
        const rol = await Rols.findByPk(user.roleId);
        if (!user || !salon) {
            return { success: false, message: 'Usuario o salón no encontrado' };
        }
        if(rol.rol === 'Vendedor'){
            await salon.addUser(user);
            return { success: true, message: 'Usuario agregado exitosamente al salón' };
        }else{
            return { success: false, message: 'Solo puedes agregar usuarios con el rol de Vendedor' };
        }
    } catch (error) {
        throw new Error(`Error al agregar el usuario al salón: ${error.message}`);
    }
}
module.exports = {
    getGridSalonesController,
    getSalonController,
    postSalonController,
    postUserSalonController
}