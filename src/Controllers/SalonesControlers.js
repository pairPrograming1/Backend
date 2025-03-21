const { Salones, Users, Rols } = require('../DbIndex')

const getGridSalonesController = async () => {
    try {
        const result = await Salones.findAll(
        {attributes: ['salon', 'cuit', 'nombre', 'email', 'whatsapp']}
        );
        return result
    } catch (error) {
        throw new Error(`Error al obtener informacion ${error.message}`);        
    }
}

const getSalonController = async (id, data) => {
    try {
        const result = await Salones.findByPk(id);
        return result
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
            throw new Error('El salon ya existe');
        }
        return 'salon creado exitosamente'
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
            throw new Error('Usuario o salón no encontrado');
        }
        if(rol.rol === 'Vendedor'){
            await salon.addUser(user);
        }else{
            throw new Error('Solo puedes agregar usuarios Vendedoores');
        }
        return { success: true, message: 'Usuario agregado exitosamente' };
    } catch (error) {
        throw error; // Let the caller handle the error
    }
}
module.exports = {
    getGridSalonesController,
    getSalonController,
    postSalonController,
    postUserSalonController
}